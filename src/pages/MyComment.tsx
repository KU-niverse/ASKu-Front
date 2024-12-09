import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import styles from './MyComment.module.css'
import Header from '../components/Header'
import Comment from '../components/Comment'
import Footer from '../components/Footer'
import SpinnerMypage from '../components/SpinnerMypage'
import emptyDebate from '../img/emptyQuestion.svg'
import Paging from '../components/Paging'

interface UserInfo {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
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
  const [page, setPage] = useState<number>(1)
  const perPage = 10
  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage

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
      {loadingMyDebate || loadingMypage ? null : <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.comment}>{'내가 쓴 토론'}</p>
          <p className={styles.debate_num}>
            {'('}
            {myDebate.message.length}
            {')'}
          </p>
          <div className={styles.switch}>
            {/* <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/> */}
          </div>
        </div>
        {mypageData && myDebate && myDebate.message && myDebate.message.length === 0 ? (
          <>
            <img src={emptyDebate} alt={'empty_Debate'} className={styles.emptyDebate} />
            <p className={styles.emptyDebateText}>
              {'아직 작성된'}
              <br />
              {'토론이 없습니다'}
            </p>
          </>
        ) : (
          <>
            {mypageData &&
              myDebate &&
              myDebate.message &&
              myDebate.message.slice(startIndex, endIndex).map((debate: MyDebateMessage, index) => (
                <Comment
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${debate.debate_id}-${index}`}
                  id={debate.debate_id}
                  subject={debate.debate_subject}
                  content={debate.debate_content}
                  created_at={new Date(debate.debate_content_time)}
                  is_bad={debate.is_bad}
                  docsname={debate.doc_title}
                />
              ))}
            <div className={styles.pagingContainer}>
              <Paging total={myDebate.message.length} perPage={perPage} activePage={page} onChange={setPage} />
            </div>
          </>
        )}
      </div>
      {loadingMyDebate || loadingMypage ? null : <Footer />}
    </div>
  )
}

export default MyComment
