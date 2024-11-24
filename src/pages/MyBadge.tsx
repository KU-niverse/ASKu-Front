import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './MyBadge.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import SpinnerMypage from '../components/SpinnerMypage'
import Paging from '../components/Paging' // Paging 컴포넌트 임포트

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

interface BadgeIcon {
  id: number
  name: string
  image: string
  description: string
  event: boolean
  cont: boolean
}
interface BadgeData {
  badge: BadgeIcon
  badge_id: number
  created_at: Date
  id: number
  is_bad: boolean
  user_id: number
  hisory_count: number
}

interface BadgeResponse {
  success: boolean
  data: BadgeData[]
  message: string
}

interface AllBadgeResponse {
  data: AllBadgeData[]
  success: boolean
}

interface AllBadgeData {
  description: string
  event: number
  history_count: string
  id: number
  image: string
  name: string
}

interface User {
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

function MyBadge() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [myBadge, setMyBadge] = useState<BadgeData[]>([])
  const [allBadge, setAllBadge] = useState<AllBadgeData[]>([])
  const [repBadgeId, setRepBadgeId] = useState<number | null>(null)
  const [page, setPage] = useState(1) // 현재 페이지 상태
  const badgesPerPage = 8 // 페이지당 뱃지 수

  useEffect(() => {
    const takeMyBadge = async () => {
      try {
        const res = await axios.get<BadgeResponse>(`${process.env.REACT_APP_HOST}/badge/me/history`, {
          withCredentials: true,
        })
        if (res.status === 201) {
          setMyBadge(res.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    takeMyBadge()
  }, [])

  useEffect(() => {
    const takeAllBadge = async () => {
      try {
        const response = await axios.get<AllBadgeResponse>(`${process.env.REACT_APP_HOST}/badge/all`, {
          withCredentials: true,
        })
        if (response.status === 201) {
          setAllBadge(response.data.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    takeAllBadge()
  }, [])

  useEffect(() => {
    setRepBadgeId(userInfo?.rep_badge_id || null)
  }, [userInfo])

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber) // 페이지 번호 업데이트
  }

  if (loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  const myBadgeIds = new Set(myBadge.map((badge) => badge.badge_id))
  const sortedBadges = [...allBadge].sort((a, b) => {
    const aIsMyBadge = myBadgeIds.has(a.id)
    const bIsMyBadge = myBadgeIds.has(b.id)

    // 현재 대표 뱃지를 가장 위에 정렬
    if (a.id === repBadgeId) return -1
    if (b.id === repBadgeId) return 1

    // 내 뱃지인 경우를 우선 정렬하고, 그 외에는 id 순서로 정렬
    if (aIsMyBadge && !bIsMyBadge) {
      return -1
    }
    if (!aIsMyBadge && bIsMyBadge) {
      return 1
    }
    return a.id - b.id
  })

  // 현재 페이지에 표시할 뱃지 계산
  const startIndex = (page - 1) * badgesPerPage
  const currentBadges = sortedBadges.slice(startIndex, startIndex + badgesPerPage)

  return (
    <div className={styles.container}>
      <div>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
      <div className={styles.mybadgecontent}>
        <div className={styles.b_header}>
          <p className={styles.b_headline}>
            {'나의 뱃지 목록 '}
            <span className={styles.badgeCount}>
              {'('}
              {myBadge.length}
              {')'}
            </span>
          </p>
        </div>
        <div className={styles.b_list}>
          {allBadge.length === 0 ? (
            <p />
          ) : (
            currentBadges.map((data) => (
              <Badge
                key={data.id}
                id={data.id}
                name={data.name}
                image={data.image}
                description={data.description}
                event={data.event}
                count={data.history_count}
                myBadgeIds={myBadgeIds}
                repBadgeId={repBadgeId}
              />
            ))
          )}
        </div>
        <div className={styles.paginationWrapper}>
          {allBadge.length > badgesPerPage && (
            <Paging total={allBadge.length} perPage={badgesPerPage} activePage={page} onChange={handlePageChange} />
          )}
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default MyBadge
