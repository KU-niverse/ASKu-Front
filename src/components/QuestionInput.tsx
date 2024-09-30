import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import DropDown from './DropDown'
import styles from './QuestionInput.module.css'

interface QuestionInputProps {
  onQuestionSubmit: (submitData: { index_title: string; content: string }) => Promise<void>
  title: string
  wikiData: any
  defaultOpt: string
}

const checkLoginStatus = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return res.data
}

const QuestionInput = ({ onQuestionSubmit, title, wikiData, defaultOpt }: QuestionInputProps) => {
  const [questionContent, setQuestionContent] = useState('')
  const [selectedOption, setSelectedOption] = useState('전체')
  const [loggedIn, setLoggedIn] = useState(false)
  const Navigate = useNavigate()
  const [isFocused, setIsFocused] = useState(false)
  const location = useLocation()
  const from = location.state?.from || '/'
  const queryClient = useQueryClient()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await checkLoginStatus()
        if (res.success === true) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        console.error(error)
        setLoggedIn(false)
        if (error.response?.status === 401) {
          setLoggedIn(false)
        } else {
          alert('에러가 발생하였습니다')
        }
      }
    }
    checkLogin()
  }, [])

  const handleSelectedOption = (optionValue: string) => {
    setSelectedOption(optionValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    if (value.length <= 200) {
      setQuestionContent(value)
    }
  }

  const mutation = useMutation(
    async (newQuestion: { index_title: string; content: string }) => {
      const res = await axios.post(`${process.env.REACT_APP_HOST}/question/new/${title}`, newQuestion, {
        withCredentials: true,
      })
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('questions')
        window.location.reload()
      },
      onError: (error: any) => {
        console.error('Error submitting question:', error)
        alert('질문 제출 중 오류가 발생했습니다.')
      },
    },
  )

  const handleSubmit = async () => {
    track('click_create_question_in_list', {
      title,
    })
    if (!loggedIn) {
      alert('로그인 후에 질문을 작성할 수 있습니다. 로그인 페이지로 이동합니다.')
      Navigate('/signin')
      return
    }
    if (!selectedOption) {
      alert('목차를 선택해 주세요.')
      return
    }
    if (questionContent.trim() === '') {
      alert('질문을 입력해주세요.')
      return
    }
    mutation.mutate({ index_title: selectedOption, content: questionContent })
  }

  const countCharacters = () => {
    return `${questionContent.length}/200`
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <form className={styles.q_c}>
      <div className={styles.q_cheader}>
        <div className={styles.q_cfrontheader}>
          <p className={styles.q_cheadline}>{'질문 생성하기'}</p>
          <div className={styles.q_dropdown}>
            <DropDown onSelectedOption={handleSelectedOption} title={title} defaultOpt={defaultOpt} />
          </div>
        </div>
      </div>

      <div className={`${styles.q_cbox} ${isFocused ? styles.focused : ''}`}>
        <textarea
          rows={4}
          className={styles.q_ctextarea}
          placeholder={'질문을 입력해주세요.'}
          value={questionContent}
          maxLength={200}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={styles.q_clastheader}>
          <span className={styles.textnum}>{countCharacters()}</span>
          <button
            type={'button'}
            className={`${styles.q_csubmit} ${questionContent.trim() === '' ? styles.disabled : ''}`}
            onClick={handleSubmit}
            disabled={questionContent.trim() === ''}
          >
            {'생성\r'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default QuestionInput
