import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import styles from './MyQuestion.module.css'
import Header from '../components/Header'
import MyQuestionList from '../components/MyQuestionList'
import Footer from '../components/Footer'

import Switch from '../components/Switch'

import SpinnerMypage from '../components/SpinnerMypage'

interface Question {
  id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  created_at: Date
  answer_or_not: number
  is_bad: boolean
  nickname: string
  rep_badge: number
  badge_image: string
  like_count: number
  doc_title: string
  answer_count: number
}

interface MyQuestionResponse {
  success: boolean
  message: string
  data: Question[]
}

interface UserData {
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

interface MypageDataResponse {
  success: boolean
  message: string
  data: UserData[]
}

function MyQuestion() {
  const [isToggled, setIsToggled] = useState(false)
  const [myQuestion, setMyQuestion] = useState<MyQuestionResponse>()
  const [mypageData, setMypageData] = useState<MypageDataResponse>()
  const [loadingMyQuestion, setLoadingMyQuestion] = useState(true)
  const [loadingMypage, setLoadingMypage] = useState(true)
  const arrange = isToggled ? 'popularity' : 'latest'

  useEffect(() => {
    const takeMyQuestion = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/questionhistory/${arrange}`, {
          withCredentials: true,
        })
        if (res.status === 201) {
          setMyQuestion(res.data)
          setLoadingMyQuestion(false)
        }
      } catch (error) {
        console.error(error)
        setLoadingMyQuestion(false)
      }
    }
    takeMyQuestion()
  }, [arrange])

  useEffect(() => {
    const takeMypage = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })
        if (res.status === 201) {
          setMypageData(res.data)
          setLoadingMypage(false)
        }
      } catch (error) {
        console.error(error)
        setLoadingMypage(false)
      }
    }
    takeMypage()
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      {loadingMyQuestion || loadingMypage ? (
        <div>
          <SpinnerMypage />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.question}>{'내가 쓴 질문'}</p>
            <div className={styles.switch}>
              <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
            </div>
          </div>
          {mypageData.data && myQuestion && myQuestion.success && myQuestion.data.length === 0 ? (
            <p>{'아직 작성한 질문이 없습니다.'}</p>
          ) : (
            mypageData &&
            myQuestion &&
            myQuestion.success &&
            myQuestion.data.map((question: Question) => (
              <MyQuestionList
                key={question.id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
                id={question.id}
                doc_id={question.doc_id}
                user_id={question.user_id}
                index_title={question.index_title}
                content={question.content}
                created_at={question.created_at}
                answer_or_not={question.answer_or_not}
                is_bad={question.is_bad}
                docsname={question.doc_title}
                nick={mypageData.data[0].nickname}
                like_count={question.like_count}
                answer_count={question.answer_count}
                badge_image={question.badge_image}
              />
            ))
          )}
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MyQuestion
