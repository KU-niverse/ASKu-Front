/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { track } from '@amplitude/analytics-browser'
import styles from './Debate.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebateTitle from '../components/Debate/DebateTitle'
import DebateContent from '../components/Debate/DebateContent'
import DebateInput from '../components/Debate/DebateInput'
import DebateSearch from '../components/Debate/DebateSearch'
import DebateRecent from '../components/Debate/DebateRecent'
import CautionIcon from '../img/DebateCautionIcon.svg'

interface UserInfo {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
  nickname: string
  created_at: Date
  point: number
  is_admin: boolean
  is_authorized: boolean
  restrict_period: number | null
  restrict_count: number
  rep_badge_name: string
  rep_badge_image: string
}

interface DebateState {
  id: number
  title: string
  subject: string
}

interface DebateMessage {
  id: number
  user_id: number
  content: string
  created_at: Date
  is_bad: boolean
  nickname: string
  badge_image: string
}

interface DebateContentData {
  success: boolean
  message: string
  data: object[]
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
      onError: (err: AxiosError) => {
        console.error('로그인 상태 확인 에러:', err)
      },
    },
  )
}

function useDebateMessages(title: string, debateId: number) {
  return useQuery<DebateContentData, AxiosError>(
    ['debateMessages', title, debateId],
    async () => {
      const res = await axios.get<DebateContentData>(
        `${process.env.REACT_APP_HOST}/debate/view/${encodeURIComponent(title)}/${debateId}`,
        { withCredentials: true },
      )
      return res.data
    },
    {
      enabled: !!title && !!debateId,
      retry: false,
      onError: (err: AxiosError) => {
        console.error('토론 메시지 가져오기 에러:', err)
      },
    },
  )
}

function useSubmitDebate(title: string, debateId: number) {
  const queryClient = useQueryClient()
  return useMutation<DebateContentData, AxiosError, SubmitData>(
    async (submitData) => {
      const postResponse = await axios.post(
        `${process.env.REACT_APP_HOST}/debate/${encodeURIComponent(title)}/new/${debateId}`,
        submitData,
        { withCredentials: true },
      )

      if (postResponse.status === 200) {
        const getResponse = await axios.get<DebateContentData>(
          `${process.env.REACT_APP_HOST}/debate/view/${encodeURIComponent(title)}/${debateId}`,
          { withCredentials: true },
        )

        if (getResponse.status === 200) {
          return getResponse.data
        }
      }
      throw new Error('의견 등록 실패')
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['debateMessages', title, debateId], data)
      },
      onError: (err: AxiosError) => {
        console.error('의견 등록 에러:', err)
        if (err.response && err.response.status === 500) {
          alert(err.message)
        }
      },
    },
  )
}

const Debate: React.FC = () => {
  const location = useLocation()
  const stateData = location.state as DebateState
  const { id: debateId, title, subject } = stateData
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const { isError, error, data: debateContentData } = useDebateMessages(title, debateId)
  const { mutateAsync: handleDebateSubmit } = useSubmitDebate(title, debateId)

  const submitHandler = async (submitData: SubmitData) => {
    try {
      await handleDebateSubmit(submitData)
    } catch (submitError) {
      // Renamed variable to avoid shadowing
      console.error('의견 제출 에러:', submitError)
    }
  }

  React.useEffect(() => {
    track('view_debate_detail', {
      type: title,
    })
  }, [title])

  React.useEffect(() => {
    track('debate_wiki', {
      type: title,
    })
  }, [title])

  const isDebateContentData = (data: any): data is DebateContentData => {
    return data && data.success
  }

  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>

      <div className={styles.debatecontent}>
        <div className={styles.maincontent}>
          <div className={styles.header}>
            <p
              className={styles.debate2}
              onClick={() => {
                const encodedTitle = encodeURIComponent(title)
                nav(`/wiki/${encodedTitle}`)
              }}
            >
              {title}
            </p>
            <p className={styles.debate}>&nbsp;문서 기반 토론</p>
          </div>
          <DebateTitle title={title} subject={subject} />
          {isError ? (
            <div>
              {'에러: '}
              {(error as AxiosError).message}
            </div> // Type assertion to access AxiosError properties
          ) : (
            isDebateContentData(debateContentData) &&
            (debateContentData.data.length === 0 ? (
              <div className={styles.caution}>
                <img src={CautionIcon} alt={'caution'} className={styles.cautionIcon} />
                <p className={styles.nonecomment}>{'작성된 토론이'}</p>
                <p className={styles.nonecomment}>{'없습니다.'}</p>
              </div>
            ) : (
              (debateContentData.data as DebateMessage[]).map((debate, index) => (
                <DebateContent
                  key={debate.id}
                  r_id={debate.id}
                  id={index + 1}
                  user_id={debate.user_id}
                  content={debate.content}
                  created_at={debate.created_at}
                  is_bad={debate.is_bad}
                  nick={debate.nickname}
                  badge_image={debate.badge_image}
                  debate_id={0}
                />
              ))
            ))
          )}
          <div className={styles.input}>
            <DebateInput onDebateSubmit={submitHandler} title={title} debateId={debateId} />
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateSearch title={title} />
          </div>

          <div className={styles.debateRecent}>
            <DebateRecent title={title} />
          </div>
        </div>
      </div>

      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default Debate
