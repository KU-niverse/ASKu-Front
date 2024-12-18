import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styles from './History.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AllHistoryBox from '../components/AllHistoryBox'
import FormatTimeAgo from '../components/FormatTimeAgo'
import Paging from '../components/Paging'
import SpinnerMypage from '../components/SpinnerMypage'

interface HistoryItem {
  wiki_doc: History
  id: number
  user_id: number
  doc_id: number
  version: number
  summary: string
  created_at: string
  diff: number
  is_rollback: number
  user: UserName
  is_bad: number
}

interface UserName {
  nickname: string
}
interface History {
  title: string
}
interface HistoryResponse {
  data: any
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

interface UserAuthResponse {
  success: boolean
}

function useGetHistory(type: string, page: number, perPage: number) {
  return useQuery<HistoryItem[], AxiosError>(
    ['historys', type, page],
    async () => {
      const result = await axios.get<HistoryResponse>(`${process.env.REACT_APP_HOST}/wiki/historys?type=${type}`)
      return result.data.data.message
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

function useCheckLoginStatus() {
  return useQuery<UserAuthResponse, AxiosError>(
    'loginStatus',
    async () => {
      const res = await axios.get<UserAuthResponse>(`${process.env.REACT_APP_HOST}/auth/issignedin`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        console.error('로그인 상태 확인 에러:', error)
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
    setPage(1)
  }

  const createBtn = () => {
    setType('create')
    setPage(1)
  }

  const rollbackBtn = () => {
    setType('rollback')
    setPage(1)
  }

  const { isLoading, isError, error, data: historys } = useGetHistory(type, page, perPage)
  const filteredHistorys = historys?.filter((item) => item.is_bad !== 1) || []

  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage

  const { data: loginStatusData } = useCheckLoginStatus()
  const nav = useNavigate()

  const handleNewwikiClick = async () => {
    if (!loginStatusData) {
      alert('로그인이 필요한 서비스입니다')
      nav('/signin')
      return
    }
    nav('/newwiki')
  }

  if (isLoading)
    return (
      <div>
        <SpinnerMypage />
      </div>
    )

  return (
    <div>
      <div className={styles.historyContainer}>
        <div className={styles.allHistoryHeaderContainer}>
          <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
        <div className={styles.historyContent}>
          {isError ? (
            <div>
              {'에러: '}
              {error.message}
            </div>
          ) : (
            <div className={styles.historyList}>
              <div className={styles.allhistoryTitle}>
                <p className={styles.listTitles}>
                  {type === 'all' ? (
                    <>
                      <span className={styles.listTitleStart}>{'최근 변경된'}</span> {'모든 문서'}
                    </>
                  ) : type === 'create' ? (
                    <>
                      <span className={styles.listTitleStart}>{'새로 생성된'}</span> {'모든 문서'}
                    </>
                  ) : type === 'rollback' ? (
                    <>
                      <span className={styles.listTitleStart}>{'최근 롤백된'}</span> {'모든 문서'}
                    </>
                  ) : null}
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
                    user={item.user.nickname}
                    timestamp={FormatTimeAgo(item.created_at)}
                    title={item.wiki_doc.title}
                    target={item.id}
                    type={type}
                  />
                </div>
              ))}
              <div className={styles.pagingContainer}>
                <Paging
                  total={filteredHistorys.length}
                  perPage={perPage}
                  activePage={page}
                  onChange={handlePageChange}
                />
              </div>
              <div className={styles.linkToNew}>
                <button type={'button'} className={styles.link} onClick={handleNewwikiClick}>
                  {'원하시는 문서가 없으신가요? 새로운 문서를 생성해보세요\r'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AllHistory
