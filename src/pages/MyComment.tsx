import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import styles from './MyComment.module.css'
import Header from '../components/Header'
import Comment from '../components/Comment'
import Footer from '../components/Footer'
import SpinnerMypage from '../components/SpinnerMypage'
import emptyDebate from '../img/emptyQuestion.svg'

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

interface MyDebateProps {
  success: boolean
  message: MyDebateMessage[]
}

interface MyDebateMessage {
  debate_id: number
  debate_subject: string
  debate_content: string
  debate_content_time: string // Changed from Date to string
  is_bad: boolean
  doc_title: string
}

interface MyInfoProps {
  success: boolean
  message: string
  data: MyInfoData[]
}

interface MyInfoData {
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

const MyComment = () => {
  const [isToggled, setIsToggled] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const fetchMyDebate = async (): Promise<MyDebateProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/debatehistory`, {
      withCredentials: true,
    })
    return res.data
  }

  const fetchMypageData = async (): Promise<MyInfoProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })
    return res.data
  }

  const { data: myDebate, isLoading: loadingMyDebate, error: debateError } = useQuery('myDebate', fetchMyDebate)
  const { data: mypageData, isLoading: loadingMypage, error: mypageError } = useQuery('mypageData', fetchMypageData)

  if (loadingMyDebate || loadingMypage) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  if (debateError || mypageError) {
    return <div>{'Error loading data'}</div>
  }

  return (
    <div className={styles.container}>
      <div>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
      <div className={styles.list}>
        <div className={styles.header}>
          <p className={styles.comment}>{'내가 참여한 토론'}</p>
          <p className={styles.debate_num}>
            {'('}
            {myDebate.message.length}
            {')'}
          </p>
          <div className={styles.switch}>
            {/* <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/> */}
          </div>
        </div>
        {mypageData && myDebate && myDebate.message && myDebate.message.length !== 0 ? (
          <>
            <img src={emptyDebate} alt={'empty_Debate'} className={styles.emptyDebate} />
            <p className={styles.emptyDebateText}>
              {'아직 작성된'}
              <br />
              {'토론이 없습니다'}
            </p>
          </>
        ) : (
          mypageData &&
          myDebate &&
          myDebate.message &&
          myDebate.message.map((debate: MyDebateMessage) => (
            <Comment
              key={debate.debate_id}
              id={debate.debate_id}
              subject={debate.debate_subject}
              content={debate.debate_content}
              created_at={new Date(debate.debate_content_time)}
              is_bad={debate.is_bad}
              docsname={debate.doc_title}
              nick={mypageData.data[0].nickname}
            />
          ))
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MyComment
