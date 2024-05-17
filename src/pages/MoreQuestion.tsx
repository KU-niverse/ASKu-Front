import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import styles from './MoreQuestion.module.css'
import Header from '../components/Header'
import Question from '../components/Question'
import Footer from '../components/Footer'
import Switch from '../components/Switch'
import QuestionInput from '../components/QuestionInput'
import SpinnerMypage from '../components/SpinnerMypage'

interface UserInfo {
  id: string
}

interface QuestionData {
  id: string
  doc_id: string
  user_id: string
  index_title: string
  content: string
  created_at: string
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

const MoreQuestion: React.FC = () => {
  const { title } = useParams<{ title: string }>()
  const [currentUserId, setCurrentUserId] = useState<UserInfo | null>(null)
  const [data, setData] = useState(null)
  const [questionData, setQuestionData] = useState<QuestionData[]>([])
  const [isToggled, setIsToggled] = useState(false)
  const [section, setSection] = useState('')
  const location = useLocation()
  const defaultOpt = location.state?.defaultOpt
  const [titles, setTitles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, {
        withCredentials: true,
      })
      if (res.status === 201 && res.data.success === true) {
        setCurrentUserId(res.data)
      } else {
        setCurrentUserId(null)
      }
    } catch (error) {
      console.error(error)
      setCurrentUserId(null)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/titles`)
        if (res.data.success) {
          setTitles(res.data.titles)
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    const takeQuestion = async () => {
      try {
        const flag = isToggled ? 1 : 0
        const res = await axios.get<QuestionResponse>(
          `${process.env.REACT_APP_HOST}/question/view/${flag}/${encodeURIComponent(title)}`,
          { withCredentials: true },
        )
        if (res.status === 200 && res.data.success) {
          setQuestionData(res.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchTitles()
    if (title) {
      takeQuestion()
    }
  }, [title, isToggled])

  const handleQuestionSubmit = async (submitData: { index_title: string; content: string }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/question/new/${encodeURIComponent(title)}`,
        submitData,
        { withCredentials: true },
      )
      if (res.status === 200) {
        setData(res.data)
        alert(res.data.message)
      }
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 500) {
        alert(error.response.data.message)
      }
    }
  }

  if (loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        {titles.includes(title) ? (
          <div>
            <div className={styles.header}>
              <div className={styles.frontheader}>
                <p className={styles.q_pagename}>{title}</p>
                <p className={styles.q_headline}>{'문서의 질문'}</p>
              </div>
              <div className={styles.switch}>
                <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
              </div>
            </div>
            <QuestionInput
              onQuestionSubmit={handleQuestionSubmit}
              title={title}
              defaultOpt={defaultOpt}
              wikiData={[]}
            />
            <div>
              {questionData.length === 0 ? (
                <p>{'아직 작성한 질문이 없습니다.'}</p>
              ) : (
                questionData.map((question) => (
                  <Question
                    current_user_id={currentUserId?.id ?? null}
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
