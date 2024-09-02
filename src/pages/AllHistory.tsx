import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import styles from './History.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AllHistoryBox from '../components/AllHistoryBox'
import FormatTimeAgo from '../components/FormatTimeAgo'
import Paging from '../components/Paging'

interface HistoryItem {
  id: number
  user_id: number
  doc_id: number
  version: number
  summary: string
  created_at: string
  diff: number
  is_rollback: number
  doc_title: string
  nick: string
  is_bad: number
}

interface HistoryResponse {
  success: boolean
  message: HistoryItem[]
}

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

function useGetHistory(type: string, page: number, perPage: number) {
  return useQuery<HistoryItem[], AxiosError>(
    ['historys', type, page],
    async () => {
      const result = await axios.get<HistoryResponse>(
        `${process.env.REACT_APP_HOST}/wiki/historys?type=${type}&page=${page}&perPage=${perPage}`,
      )
      return result.data.message
    },
    {
      keepPreviousData: true,
      enabled: !!type, // type이 null 또는 undefined가 아닐 때만 쿼리 활성화
      onError: (error: AxiosError) => {
        console.error('API 요청 중 에러 발생:', error)
      },
    },
  )
}

const AllHistory: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [type, setType] = useState<string>('all')
  const [page, setPage] = useState<number>(1)

  const perPage = 10
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const allBtn = () => {
    setType('all')
  }

  const createBtn = () => {
    setType('create')
  }

  const rollbackBtn = () => {
    setType('rollback')
  }

  const { isError, error, data: historys } = useGetHistory(type, page, perPage)
  const filteredHistorys = historys?.filter((item) => item.is_bad !== 1) || []

  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.history}>
        {isError ? (
          <div>
            {'에러: '}
            {error.message}
          </div>
        ) : (
          <div className={styles.historyList}>
            <div className={styles.historyTitle}>
              <p className={styles.listTitle2}>
                {type === 'all'
                  ? '최근 변경된 모든 문서'
                  : type === 'create'
                    ? '새로 생성된 모든 문서'
                    : type === 'rollback'
                      ? '최근 롤백된 모든 문서'
                      : null}
              </p>

              <div className={styles.historyTypes}>
                <p
                  role={'presentation'}
                  onClick={allBtn}
                  className={type === 'all' ? styles.clickType : styles.default}
                >
                  {'all'}
                </p>
                <p
                  role={'presentation'}
                  onClick={createBtn}
                  className={type === 'create' ? styles.clickType : styles.default}
                >
                  {'create'}
                </p>
                <p
                  role={'presentation'}
                  onClick={rollbackBtn}
                  className={type === 'rollback' ? styles.clickType : styles.default}
                >
                  {'rollback'}
                </p>
              </div>
            </div>
            {filteredHistorys.slice(startIndex, endIndex).map((item) => (
              <div key={item.id}>
                <AllHistoryBox
                  version={item.version}
                  summary={item.summary}
                  user={item.nick}
                  timestamp={FormatTimeAgo(item.created_at)}
                  title={item.doc_title}
                  target={item.id}
                  type={type}
                />
              </div>
            ))}
            <div className={styles.pagingContainer}>
              <Paging total={filteredHistorys.length} perPage={perPage} activePage={page} onChange={handlePageChange} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default AllHistory
