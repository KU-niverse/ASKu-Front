import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './MyBadge.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import SpinnerMypage from '../components/SpinnerMypage'

interface BadgeData {
  badge_id: number
  id: number
  name: string
  image: string
  description: string
  event: boolean
  history_count: number
}

interface BadgeResponse {
  data: BadgeData[]
}

function MyBadge() {
  const [loading, setLoading] = useState(true)
  // 뱃지 데이터 불러오기
  const [myBadge, setMyBadge] = useState<BadgeData[]>([])
  useEffect(() => {
    const takeMyBadge = async () => {
      try {
        const res = await axios.get<BadgeResponse>(`${process.env.REACT_APP_HOST}/user/mypage/badgehistory`, {
          withCredentials: true,
        })
        if (res.status === 201) {
          setMyBadge(res.data.data)
        }
        if (res.status === 401) {
          /* empty */
        }
      } catch (error) {
        console.error(error)
      }
    }
    takeMyBadge()
  }, [])

  // 모든 뱃지 데이터 가져오기
  const [allBadge, setAllBadge] = useState<BadgeData[]>([])
  useEffect(() => {
    const takeAllBadge = async () => {
      try {
        const response = await axios.get<BadgeResponse>(`${process.env.REACT_APP_HOST}/user/mypage/badges`, {
          withCredentials: true,
        })
        if (response.status === 201) {
          setAllBadge(response.data.data)
        }
        if (response.status === 401) {
          /* empty */
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    takeAllBadge()
  }, [])

  // 로딩 중일 때 표시할 컴포넌트
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

    // 먼저 내 뱃지인 경우를 우선 정렬하고, 그 외에는 id 순서로 정렬
    if (aIsMyBadge && !bIsMyBadge) {
      return -1
    }
    if (!aIsMyBadge && bIsMyBadge) {
      return 1
    }
    return a.id - b.id
  })

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.header}>
        <p className={styles.mypage}>{'MYPAGE'}</p>
      </div>
      <div className={styles.mybadgecontent}>
        <div className={styles.b_header}>
          <p className={styles.b_headline}>{'나의 뱃지 목록'}</p>
        </div>
        <div className={styles.b_list}>
          {allBadge.length === 0 ? (
            <p />
          ) : (
            sortedBadges.map((data) => (
              <Badge
                key={data.id} // key prop 추가 (반복되는 엘리먼트는 고유한 key prop을 가져야 함)
                id={data.id}
                name={data.name}
                image={data.image}
                description={data.description}
                event={data.event}
                count={data.history_count}
                myBadgeIds={myBadgeIds}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MyBadge
