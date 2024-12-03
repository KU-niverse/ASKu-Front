import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { track } from '@amplitude/analytics-browser'
import styles from './LatestDebate.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LatestDebateList from '../components/Debate/LatestDebateList'
import DebateAllSearch from '../components/Debate/DebateAllSearch'
import DebateRecent from '../components/Debate/DebateRecent'
import SpinnerMypage from '../components/SpinnerMypage'
import Paging from '../components/Paging'

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

interface DebateData {
  id: number
  doc_id: number
  user_id: number
  subject: string
  created_at: Date
  recent_edited_at: Date
  done_or_not: boolean
  done_at: Date | null
  is_bad: boolean
  title: string
}

interface DebateResponse {
  data: DebateData[]
}

const fetchDebateList = async (): Promise<DebateData[]> => {
  const res = await axios.get<DebateResponse>(`${process.env.REACT_APP_HOST}/debate/all/recent`, {
    withCredentials: true,
  })
  return res.data.data
}

function LatestDebate() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const { data: debateListData, error, isLoading } = useQuery<DebateData[], Error>('recentDebates', fetchDebateList)
  const perPage = 7
  const [page, setPage] = useState<number>(1)
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  // Amplitude
  React.useEffect(() => {
    track('view_recent_debate')
  }, [])

  if (isLoading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        {'Error: '}
        {error.message}
      </div>
    )
  }
  const totalPages = Math.ceil(debateListData.length / perPage) // 총 페이지 수 계산
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const visibleDebates = debateListData.slice(startIndex, endIndex)

  return (
    <div className={styles.container}>
      <div>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>

      <div className={styles.debatecontent}>
        <div className={styles.maincontent}>
          <div className={styles.maincontent_box}>
            <p className={styles.title}>{'최근 토론'}</p>
            <div className={styles.menu}>
              <span className={styles.menu1}>{'항목'}</span>
              <span className={styles.menu2}>{'수정 시간'}</span>
            </div>
            {debateListData && debateListData.length === 0 ? (
              <p className={styles.nodebate}>{'아직 생성된 토론방이 없습니다.'}</p>
            ) : (
              debateListData &&
              visibleDebates.map((data) => (
                <LatestDebateList
                  key={data.id}
                  id={data.id}
                  doc_id={data.doc_id}
                  user_id={data.user_id}
                  subject={data.subject}
                  created_at={data.created_at}
                  recent_edited_at={data.recent_edited_at}
                  done_or_not={data.done_or_not}
                  done_at={data.done_at}
                  is_bad={data.is_bad}
                  title={data.title}
                />
              ))
            )}
          </div>
          <Paging total={debateListData.length} perPage={perPage} activePage={page} onChange={handlePageChange} />
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateAllSearch />
          </div>
          <div className={styles.debateRecent}>
            <DebateRecent title={''} />
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default LatestDebate
