import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import styles from './QnA.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import comment_icon from '../img/comment_icon.png'
import CommentQna from '../components/CommentQna'
import QuestionQnA from '../components/QuestionQnA'
import link_icon from '../img/link_icon.png'

interface UserInfo {
  id: number
  [key: number]: number
}

interface AnswerData {
  id: number
  wiki_history_id: number
  question_id: number
  created_at: Date
  user_id: number
  nickname: string
  rep_badge: string
  badge_image: string
  title: string
  content: string
  index_title: string
}

interface QuestionDataItem {
  user_id: number
  nickname: string
  content: string
  like_count: number
  created_at: Date
  index_title: string
  answer_count: number
  badge_image: string
}

interface QuestionData {
  data: QuestionDataItem[]
}

interface UserInfoResponse {
  success: boolean
  data: UserInfo[]
}

const fetchUserInfo = async () => {
  const res = await axios.get<UserInfoResponse>(`${process.env.REACT_APP_HOST}/user/mypage/info`, {
    withCredentials: true,
  })
  return res.data
}

const fetchAnswers = async (question_id: string) => {
  const res = await axios.get<AnswerData[]>(`${process.env.REACT_APP_HOST}/question/answer/${question_id}`, {
    withCredentials: true,
  })
  return res.data
}

const fetchQuestion = async (question_id: string) => {
  const res = await axios.get<QuestionData>(`${process.env.REACT_APP_HOST}/question/lookup/${question_id}`, {
    withCredentials: true,
  })
  return res.data
}

const QnA = () => {
  const [isToggled, setIsToggled] = useState(false)
  const location = useLocation()
  const { title } = useParams<{ title: string }>()
  const { question_id } = useParams<{ question_id: string }>()
  const nav = useNavigate()
  const queryClient = useQueryClient()

  const { data: userInfoData } = useQuery('userInfo', fetchUserInfo)
  const { data: answerData, error: answerError } = useQuery(['answers', question_id], () => fetchAnswers(question_id!))
  const { data: questionData, error: questionError } = useQuery(['question', question_id], () =>
    fetchQuestion(question_id!),
  )

  const currentUserId = userInfoData?.data[0]

  const linktoWiki = () => {
    const encodedTitle = encodeURIComponent(title!)
    nav(`/wiki/${encodedTitle}`)
  }

  if (questionError || answerError) {
    console.error('Error fetching data:', questionError || answerError)
  }

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.frontheader}>
            <p className={styles.q_pagename}>{title}</p>
            <p className={styles.q_headline}>{'문서의 질문'}</p>
          </div>
          <div className={styles.backheader}>
            <button type="button" onClick={linktoWiki} className={styles.q_editbtn}>
              <img src={link_icon} alt="link_icon" />
              <span className={styles.q_linkbtn}>&nbsp;{'문서 바로가기'}</span>
            </button>
          </div>
        </div>
        {questionData && questionData.data && (
          <QuestionQnA
            question_id={parseInt(question_id!, 10)}
            user_id={questionData.data[0].user_id}
            nick={questionData.data[0].nickname}
            content={questionData.data[0].content}
            like_count={questionData.data[0].like_count}
            created_at={questionData.data[0].created_at}
            index_title={questionData.data[0].index_title}
            answer_count={questionData.data[0].answer_count}
            title={title!}
            badge_image={questionData.data[0].badge_image}
            current_user_id={currentUserId ? currentUserId.id : null}
            doc_id={0}
            answer_or_not={false}
            is_bad={false}
          />
        )}
        <div className={styles.c_header}>
          <img src={comment_icon} alt="comment" />
          <span className={styles.c_headline}>{'답변'}</span>
          {questionData && questionData.data && (
            <span className={styles.c_num}>{questionData.data[0].answer_count}</span>
          )}
          {Array.isArray(answerData) && answerData.length === 0 ? (
            <p className={styles.no_answer}>{'아직 작성된 답변이 없습니다.'}</p>
          ) : (
            Array.isArray(answerData) &&
            answerData.map((data) => (
              <CommentQna
                key={data.id}
                id={data.id}
                wiki_history_id={data.wiki_history_id}
                question_id={data.question_id}
                created_at={data.created_at}
                user_id={data.user_id}
                nickname={data.nickname}
                rep_badge={data.rep_badge}
                badge_image={data.badge_image}
                title={data.title}
                content={data.content}
                index_title={data.index_title}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default QnA
