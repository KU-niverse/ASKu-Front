import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { track } from '@amplitude/analytics-browser'
import submit from '../../img/submit.png'
import styles from './DebateInput.module.css'

interface DebateInputProps {
  onDebateSubmit: (submitData: { content: string }) => Promise<void>
  title: string
  debateId: number
}

interface SubmitData {
  content: string
}

interface UserAuthResponse {
  success: boolean
}

function useCheckLoginStatus() {
  return useQuery<UserAuthResponse, AxiosError>(
    'loginStatus',
    async () => {
      const res = await axios.get<UserAuthResponse>(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        console.error('로그인 상태 확인 에러:', error)
      },
    },
  )
}

function useSubmitDebate(title: string, debateId: number) {
  return useMutation<void, AxiosError, SubmitData>(
    async (submitData) => {
      await axios.post(
        `${process.env.REACT_APP_HOST}/debate/${encodeURIComponent(title)}/new/${debateId}`,
        submitData,
        {
          withCredentials: true,
        },
      )
    },
    {
      onSuccess: () => {
        alert('의견이 성공적으로 등록되었습니다.')
        // 성공적으로 의견을 등록한 후에 필요한 동작을 수행합니다.
        // 예: 입력 필드 초기화, 페이지 새로고침 등
      },
      onError: (error: AxiosError) => {
        console.error('의견 등록 에러:', error)
        if (error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.')
        } else if (error.response?.status === 400) {
          alert('잘못된 입력입니다.')
        } else {
          alert('에러가 발생하였습니다. 잠시후 다시 시도해주세요')
        }
      },
    },
  )
}

function DebateInput({ onDebateSubmit, title, debateId }: DebateInputProps) {
  const [debateContent, setDebateContent] = useState<string>('')
  const { data: loginStatusData } = useCheckLoginStatus()
  const { mutate: submitDebate, isLoading: isSubmitting } = useSubmitDebate(title, debateId)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    if (value.length <= 200) {
      setDebateContent(value)
    } else {
      setDebateContent(value.slice(0, 200))
    }
  }

  const handleSubmit = async () => {
    if (!loginStatusData?.success) {
      alert('로그인이 필요한 서비스입니다.')
      navigate('/signin')
      return
    }
    if (debateContent.trim() === '') {
      alert('글을 입력해주세요.')
      return
    }
    try {
      submitDebate({ content: debateContent })
      setDebateContent('')
      // Amplitude
      track('click_button_in_debate', {
        title,
      })
    } catch (error) {
      console.error('의견 등록 에러:', error)
      if (error.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.')
      } else if (error.response?.status === 400) {
        alert('잘못된 입력입니다.')
      } else {
        alert('에러가 발생하였습니다. 잠시후 다시 시도해주세요')
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{'의견 달기'}</span>
        <img
          role={'presentation'}
          src={submit}
          alt={'submit'}
          onClick={handleSubmit}
          style={{ cursor: isSubmitting ? 'wait' : 'pointer' }} // 롤백 중 커서 변경
        />
      </div>
      <div className={styles.textbox}>
        <textarea
          rows={4}
          className={styles.textarea}
          placeholder={'해당 토론에 대한 의견을 입력하세요.'}
          value={debateContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default DebateInput
