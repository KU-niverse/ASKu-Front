import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import styles from './MyContribution.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Graph from '../components/Mypage/Graph'
import Contribute from '../components/Mypage/Contribute'
import Paging from '../components/Paging'
import warning from '../img/warning.svg'

interface WikiHistoryEntry {
  id: number
  user_id: number
  doc_id: number
  text_pointer: string
  version: number
  summary: string
  created_at: Date
  count: number
  diff: number
  is_bad: boolean
  is_rollback: boolean
  is_q_based: boolean
  title: string
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

interface DocumentContribution {
  doc_title: string
  doc_id: number
  doc_point: string
  percentage: string
}

const MyContribution: React.FC = () => {
  const [page, setPage] = useState(1)
  const contributionPerPage = 13
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  // Fetch user information using useQuery
  const {
    data: userInfo,
    isLoading: loadingUserInfo,
    error: userInfoError,
  } = useQuery<UserInfo, Error>(
    'userInfo',
    async () => {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })
      return res.data.data[0]
    },
    {
      onError: (error) => {
        console.error('Failed to load user info:', error)
      },
    },
  )

  // Fetch wiki contributions
  const {
    data: myWiki,
    isLoading: loadingMyWiki,
    error: myWikiError,
  } = useQuery<{ success: boolean; message: string; data: WikiHistoryEntry[] }, Error>('myWiki', async () => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/wikihistory`, { withCredentials: true })
    return res.data
  })

  // Fetch other contributions
  const {
    data: myContribute,
    isLoading: loadingMyContribute,
    error: myContributeError,
  } = useQuery<
    {
      status: number
      success: boolean
      message: { docs: DocumentContribution[]; point: number }
    },
    Error
  >('myContribute', async () => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contributions`, { withCredentials: true })
    return res.data
  })

  // Loading or Error state
  if (loadingUserInfo || loadingMyWiki || loadingMyContribute) {
    return <div>Loading...</div>
  }

  if (userInfoError || myWikiError || myContributeError) {
    return <div>Error loading data</div>
  }

  return (
    <div className={styles.pagewrap}>
      <Header userInfo={userInfo} setUserInfo={() => {}} />
      <div className={styles.contentSubContainer}>
        <div className={styles.contributeHeader}>
          <div className={styles.contentTitle}>나의 기여 목록</div>
          <span className={styles.contentNum}>
            {'('}
            {myWiki && myWiki.data ? myWiki.data.length : 0}
            {')'}
          </span>
        </div>
        {myWiki && myWiki.data.length === 0 ? (
          <div className={styles.noList}>
            <div className={styles.warningsign}>
              <img alt={'warningsign'} src={warning} />
            </div>
            <div className={styles.warningtext}>
              {'아직 기여 목록이'}
              <br />
              {'없습니다'}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.contributionBox}>
              <div className={styles.graph}>
                {myContribute && myContribute.message.docs.length === 0 ? (
                  <p />
                ) : (
                  myContribute && <Graph total_point={myContribute.message.point} docs={myContribute.message.docs} />
                )}
              </div>
            </div>
            <div className={styles.contributionList}>
              {myWiki &&
                myWiki.data
                  .slice((page - 1) * contributionPerPage, page * contributionPerPage)
                  .map((wiki: WikiHistoryEntry) => (
                    <div className={styles.contributionElement} key={wiki.id}>
                      <Contribute
                        user_id={wiki.user_id}
                        doc_id={wiki.doc_id}
                        text_pointer={wiki.text_pointer}
                        version={wiki.version}
                        summary={wiki.summary}
                        created_at={wiki.created_at}
                        count={wiki.count}
                        diff={wiki.diff}
                        is_bad={wiki.is_bad}
                        is_rollback={wiki.is_rollback}
                        is_q_based={wiki.is_q_based}
                        title={wiki.title}
                      />
                    </div>
                  ))}
            </div>
            <div className={styles.paginationWrapper}>
              {myWiki && myWiki.data.length > contributionPerPage && (
                <Paging
                  total={myWiki.data.length}
                  perPage={contributionPerPage}
                  activePage={page}
                  onChange={handlePageChange}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default MyContribution
