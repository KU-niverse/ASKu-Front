import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import styles from './QnA.module.css'
import Header from '../components/Header'
import QuestionQnA from '../components/QuestionQnA'
import Footer from '../components/Footer'
import CommentQna from '../components/CommentQna'
import link_icon from '../img/link_icon_new.svg'
import emptyAnswer from '../img/emptyAnswer.svg'
import comment_icon from '../img/comment_icon.png'
import Question from '../components/Question'
import question from '../img/wiki_qustion.svg'

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

// 서버에서 반환하는 데이터의 구조 반영
interface AnswerResponse {
  success: boolean
  message: string
  data: AnswerData[] // 실제 답변 목록을 포함하는 배열
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
  const res = await axios.get<AnswerResponse>(`${process.env.REACT_APP_HOST}/question/answer/${question_id}`, {
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

const QnA: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false)
  const location = useLocation()
  const { title } = useParams<{ title: string }>()
  const { question_id } = useParams<{ question_id: string }>()
  const nav = useNavigate()

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const { data: userInfoData } = useQuery('userInfo', fetchUserInfo, {
    onSuccess: (data) => setUserInfo(data.data[0]),
  })
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
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.frontheader}>
            <div className={styles.q_pagename}>{title}</div>
            <div className={styles.q_headline}>{'문서의 질문'}</div>
          </div>
          <div className={styles.backheader}>
            <button type={'button'} onClick={linktoWiki} className={styles.q_editbtn}>
              <img src={link_icon} alt={'link_icon'} />
              <span className={styles.q_linkbtn}>{'문서 바로가기'}</span>
            </button>
          </div>
        </div>
        {questionData && questionData.data && (
          <Question
            current_user_id={currentUserId ? currentUserId.id : null}
            key={parseInt(question_id!, 10)}
            id={parseInt(question_id!, 10)}
            doc_id={0}
            user_id={questionData.data[0].user_id}
            index_title={questionData.data[0].index_title}
            content={questionData.data[0].content}
            created_at={questionData.data[0].created_at}
            answer_or_not={false}
            is_bad={false}
            nick={questionData.data[0].nickname}
            like_count={questionData.data[0].like_count}
            title={title!}
            answer_count={questionData.data[0].answer_count}
            badge_image={questionData.data[0].badge_image}
            index={0}
          />
        )}
        <div className={styles.c_div}>
          <div className={styles.c_header}>
            <img src={comment_icon} alt={'comment'} />
            {questionData && questionData.data && (
              <span className={styles.c_headline}>
                {'답변 '}
                {questionData.data[0].answer_count}
                {'개'}
              </span>
            )}
          </div>
          {answerData && Array.isArray(answerData.data) && answerData.data.length === 0 ? (
            <>
              <img src={emptyAnswer} alt={'empty_Answer'} className={styles.no_answer_img} />
              <p className={styles.no_answer}>
                {'아직 답변이'}
                <br />
                {'없습니다'}
              </p>
            </>
          ) : (
            Array.isArray(answerData?.data) &&
            answerData.data.map((data) => (
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
        <Link to={`/wiki/morequestion/${encodeURIComponent(title)}`} className={styles.addQuesLink}>
          <button type={'button'} className={styles.addQues}>
            {'나도 질문하기'} <img src={question} alt="질문할래요 아이콘" className={styles.askIcon} />
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default QnA
