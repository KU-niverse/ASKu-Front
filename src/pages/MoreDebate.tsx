/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { track } from '@amplitude/analytics-browser'
import styles from './MoreDebate.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebateList from '../components/Debate/DebateList'
import DebateSearch from '../components/Debate/DebateSearch'
import DebateAdd from '../components/Debate/DebateAdd'
import DebateRecent from '../components/Debate/DebateRecent'
import CautionIcon from '../img/DebateCautionIcon.svg'
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

interface Debate {
  id: number
  doc_id: number
  user_id: number
  subject: string
  created_at: Date
  recent_edited_at: Date
  done_or_not: boolean
  done_at: Date | null
  is_bad: boolean
}

interface DebateListData {
  data: Debate[]
}

// useQuery 훅을 사용하여 토론 목록 데이터 가져오기
function useDebateList(title: string) {
  return useQuery<DebateListData, AxiosError>(
    ['debateList', title],
    async () => {
      const res = await axios.get<DebateListData>(
        `${process.env.REACT_APP_HOST}/debate/list/${encodeURIComponent(title)}`,
        { withCredentials: true },
      )
      return res.data
    },
    {
      enabled: !!title, // title이 존재하는 경우에만 쿼리 실행
      retry: false,
      onError: (error: AxiosError) => {
        console.error('토론 목록 가져오기 에러:', error)
      },
    },
  )
}

const MoreDebate: React.FC = () => {
  const { title } = useParams<{ title: string }>()
  const { isLoading, isError, error, data: debateListData } = useDebateList(title)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [page, setPage] = useState<number>(1)
  const perPage = 7
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }
  const navigate = useNavigate()

  React.useEffect(() => {
    track('view_wiki_debate_list')
  }, [])

  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const visibleDebates = debateListData?.data.slice(startIndex, endIndex)

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />

      <div className={styles.debatecontent}>
        <div className={styles.maincontent}>
          <p className={styles.title}>
            <span
              className={styles.pink}
              onClick={() => {
                const encodedTitle = encodeURIComponent(title)
                navigate(`/wiki/${encodedTitle}`)
              }}
            >
              {title}
            </span>{' '}
            문서의 토론 목록
          </p>
          <div className={styles.menu}>
            <span className={styles.menu1}>{'항목'}</span>
            <span className={styles.menu2}>{'수정 시간'}</span>
          </div>

          {isLoading ? (
            <p className={styles.none}>{'데이터를 불러오는 중입니다.'}</p>
          ) : isError ? (
            <p className={styles.none}>
              {'에러: '}
              {error?.message}
            </p>
          ) : debateListData?.data.length === 0 ? (
            <div className={styles.caution}>
              <img src={CautionIcon} alt={'삭제'} className={styles.cautionIcon} />
              <p className={styles.none}>{'아직 생성된'}</p>
              <p className={styles.none}>{'토론방이 없습니다.'}</p>
            </div>
          ) : (
            debateListData &&
            visibleDebates.map((data) => (
              <DebateList
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
                title={title}
              />
            ))
          )}
          {debateListData?.data.length === 0 ? null : (
            <div className={styles.pagingContainer}>
              <Paging
                total={debateListData?.data.length}
                perPage={perPage}
                activePage={page}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateSearch title={title} />
          </div>
          <div className={styles.debateAdd}>
            <DebateAdd title={title} />
          </div>
          <div className={styles.debateRecent}>
            <DebateRecent title={title} />
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default MoreDebate
