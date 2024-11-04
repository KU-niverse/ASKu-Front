import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import styles from './MyQuestion.module.css'
import Header from '../components/Header'
import MyQuestionList from '../components/MyQuestionList'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'
import Switch from '../components/Switch'
import SpinnerMypage from '../components/SpinnerMypage'
import emptyQuestion from '../img/emptyQuestion.svg'

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

// useQuery 훅을 사용하여 내가 쓴 질문 데이터 가져오기
function useMyQuestion(arrange: string) {
  return useQuery<MyQuestionResponse, Error>(
    ['myQuestions', arrange],
    async () => {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/questionhistory/${arrange}`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      retry: false,
      onError: (error) => {
        console.error('내가 쓴 질문 가져오기 에러:', error)
      },
    },
  )
}

// useQuery 훅을 사용하여 마이페이지 데이터 가져오기
function useMypageData() {
  return useQuery<MypageDataResponse, Error>(
    'mypageData',
    async () => {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      retry: false,
      onError: (error) => {
        console.error('마이페이지 데이터 가져오기 에러:', error)
      },
    },
  )
}

function MyQuestion() {
  const [isToggled, setIsToggled] = useState(false)
  const arrange = isToggled ? 'popularity' : 'latest'
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [page, setPage] = useState<number>(1)

  const { isLoading: isLoadingMyQuestion, error: myQuestionError, data: myQuestionData } = useMyQuestion(arrange)
  const { isLoading: isLoadingMypage, error: mypageError, data: mypageData } = useMypageData()

  const questions = myQuestionData?.data || []
  const user = mypageData?.data[0] // 사용자 정보는 한 개만 있다고 가정

  return (
    <div className={styles.container}>
      {isLoadingMyQuestion || isLoadingMypage ? ( // 로딩 중 표시
        <SpinnerMypage />
      ) : (
        <>
          <Header userInfo={userInfo} setUserInfo={setUserInfo} />
          <div className={styles.content}>
            <div className={styles.header}>
              <p className={styles.question}>{'내가 쓴 질문'}</p>
              <p className={styles.question_num}>
                {'('}
                {questions.length}
                {')'}
              </p>
              <div className={styles.switch}>
                <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
              </div>
            </div>
            {myQuestionError || mypageError ? (
              <div>에러: {(myQuestionError || mypageError).message}</div>
            ) : questions.length === 0 ? (
              <>
                <img src={emptyQuestion} alt={'empty_Qution'} className={styles.emptyQuestion} />
                <p className={styles.emptyQuestionText}>
                  {'아직 작성된'}
                  <br />
                  {'질문이 없습니다'}
                </p>
              </>
            ) : (
              questions.map((question) => (
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
            {questions?.length > 10 && (
              <div style={{ marginTop: '3.5rem' }}>
                <Pagination total={questions.length} limit={10} page={page} setPage={setPage} />
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default MyQuestion
