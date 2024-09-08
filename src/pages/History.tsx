import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'
import Paging from '../components/Paging'
import Footer from '../components/Footer'

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

interface HistoryItem {
  version: number
  summary: string
  nick: string
  created_at: string
  is_bad?: boolean
  id?: number
  doc_title: string
  timestamp: string
}

interface HistoryResponse {
  success: boolean
  historys: HistoryItem[]
}

const History = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const { title } = useParams<{ title: string }>()
  const [page, setPage] = useState<number>(1)
  const perPage = 6

  const {
    isError,
    error,
    data: historyData,
  } = useQuery<HistoryResponse, AxiosError>(
    ['wikiHistory', title],
    async () => {
      const result = await axios.get<HistoryResponse>(`${process.env.REACT_APP_HOST}/wiki/historys/${title}`, {
        withCredentials: true,
      })
      return result.data
    },
    {
      enabled: !!title, // title이 있을 때만 쿼리 실행
      retry: false,
      onError: (err: AxiosError) => {
        console.error('위키 히스토리 가져오기 에러:', err)
        alert(error.response?.data || '에러가 발생했습니다.')
      },
    },
  )

  const historys = historyData?.historys || [] // historyData가 존재하면 historys를 추출, 아니면 빈 배열
  const newest = historys[0]?.version

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  // 페이지네이션 관련 변수 계산
  const totalPages = Math.ceil(historys.length / perPage) // 총 페이지 수 계산
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const visibleHistorys = historys.slice(startIndex, endIndex)

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.header}>
        <span>
          <img alt={'히스토리'} src={his2} />
          {'히스토리\r'}
        </span>
      </div>
      <div className={styles.history}>
        <div className={styles.historyList}>
          <div className={styles.historyTitle}>
            <p className={styles.listTitle}>{title}</p>
            <p className={styles.listTitle2}>{'문서의 변경 내용'}</p>
          </div>
          {isError ? (
            <div>
              {'에러: '}
              {error.message}
            </div>
          ) : historys.length === 0 ? (
            <div>{'아직 히스토리가 없습니다'}</div>
          ) : (
            visibleHistorys.map((item) => (
              <div key={item.id}>
                <HistoryBox
                  version={item.version}
                  summary={item.summary}
                  user={item.nick || ''} // 닉네임이 없을 경우 빈 문자열 처리
                  timestamp={item.timestamp}
                  title={title}
                  target={item.id || 0} // id가 없을 경우 0 처리
                  type={''}
                  newest={newest}
                />
              </div>
            ))
          )}

          <Paging total={historys.length} perPage={perPage} activePage={page} onChange={handlePageChange} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default History
