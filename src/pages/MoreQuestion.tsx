/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { track } from '@amplitude/analytics-browser'
import styles from './MoreQuestion.module.css'
import Header from '../components/Header'
import Question from '../components/Question'
import Footer from '../components/Footer'
import Switch from '../components/Switch'
import QuestionInput from '../components/QuestionInput'
import SpinnerMypage from '../components/SpinnerMypage'
import docLink from '../img/doc_link.svg'
import noQuestion from '../img/noQuestion.svg'

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

interface QuestionData {
  id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  created_at: Date
  answer_or_not: boolean
  is_bad: boolean
  nickname: string
  like_count: number
  title: string
  answer_count: number
  badge_image: string
}

interface QuestionResponse {
  data: QuestionData[]
  success: boolean
}

const fetchUserInfo = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, {
    withCredentials: true,
  })
  return res.data
}

const fetchTitles = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/titles`)
  return res.data.data
}

const fetchQuestions = async (title: string, flag: number) => {
  const res = await axios.get<QuestionResponse>(
    `${process.env.REACT_APP_HOST}/question/view/${flag}/${encodeURIComponent(title)}`,
    { withCredentials: true },
  )
  return res.data
}

const submitQuestion = async ({
  title,
  submitData,
}: {
  title: string
  submitData: { index_title: string; content: string; title: string }
}) => {
  const res = await axios.post(`${process.env.REACT_APP_HOST}/question/new/${encodeURIComponent(title)}`, submitData, {
    withCredentials: true,
  })
  return res.data
}

const MoreQuestion: React.FC = () => {
  const { title } = useParams<{ title: string }>()
  const location = useLocation()
  const defaultOpt = location.state
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isToggled, setIsToggled] = useState(false)
  const flag = isToggled ? 1 : 0

  const { data: userInfoData, isLoading: userInfoLoading } = useQuery('userInfo', fetchUserInfo, {
    onSuccess: (data) => setUserInfo(data.data),
  })
  const { data: titles = [], isLoading: titlesLoading } = useQuery('titles', fetchTitles)
  const { data: questionData, isLoading: questionsLoading } = useQuery(
    ['questions', title, flag],
    () => fetchQuestions(title, flag),
    { enabled: !!title },
  )

  const mutation = useMutation(submitQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['questions', title, flag])
    },
  })

  const handleQuestionSubmit = async (submitData: { index_title: string; content: string; title: string }) => {
    mutation.mutate({ title, submitData })
  }

  React.useEffect(() => {
    track('click_more_question_in_wiki', {
      title,
    })
  }, [title])

  const handleDocLinkClick = () => {
    navigate(`/wiki/${encodeURIComponent(title)}`)
  }

  if (userInfoLoading || titlesLoading || questionsLoading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={userInfo} />
      <div className={styles.content}>
        {titles.includes(title) ? (
          <div>
            <div className={styles.header}>
              <div className={styles.frontheader}>
                <div
                  className={styles.q_pagename}
                  onClick={() => {
                    const encodedTitle = encodeURIComponent(title)
                    navigate(`/wiki/${encodedTitle}`)
                  }}
                >
                  {title}
                </div>
                <div className={styles.q_headline}>{'문서의 질문'}</div>
              </div>

              <button type={'button'} className={styles.docLinkBtn} onClick={handleDocLinkClick}>
                <img role={'presentation'} alt={docLink} src={docLink} />
                <span>{'문서 바로가기'}</span>
              </button>
            </div>

            <QuestionInput
              onQuestionSubmit={handleQuestionSubmit}
              title={title}
              defaultOpt={defaultOpt}
              wikiData={undefined}
            />

            <div>
              {/* 헤더 섹션: 제목과 인기순 토글 */}
              <div className={styles.questionHeaderContainer}>
                <div className={styles.questionTitle}>{'해당 질문들'}</div>
                <div className={styles.switch}>
                  <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                </div>
              </div>

              {/* 질문 리스트 */}
              {questionData?.data.length === 0 ? (
                <div className={styles.noQuestionsContainer}>
                  <div className={styles.noQuestionsContent}>
                    {/* 아이콘 */}
                    <img role={'presentation'} src={noQuestion} alt={noQuestion} className={styles.noQuestionsIcon} />

                    {/* 텍스트 */}
                    <p className={styles.noQuestionsText}>
                      {'아직 질문이\r'}
                      <br /> {'없습니다\r'}
                    </p>
                  </div>
                </div>
              ) : (
                questionData?.data.map((question) => (
                  <Question
                    current_user_id={userInfo?.id}
                    key={question.id}
                    id={question.id}
                    doc_id={question.doc_id}
                    user_id={question.user_id}
                    index_title={question.index_title}
                    content={question.content}
                    created_at={question.created_at}
                    answer_or_not={question.answer_or_not}
                    is_bad={question.is_bad}
                    nick={question.nickname}
                    like_count={question.like_count}
                    title={title}
                    answer_count={question.answer_count}
                    badge_image={question.badge_image}
                    index={0}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <p>{'존재하지 않는 문서입니다.'}</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MoreQuestion
