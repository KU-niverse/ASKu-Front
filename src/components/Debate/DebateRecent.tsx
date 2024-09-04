import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import FormatTimeAgo from '../FormatTimeAgo'
import styles from './DebateRecent.module.css'

interface RecentItem {
  title: string
  subject: string
  id: number
  recent_edited_at: Date
}

interface RecentListData {
  data: RecentItem[]
}

function useRecentDebateList() {
  return useQuery<RecentListData, Error>(
    'recentDebateList',
    async () => {
      const res = await axios.get<RecentListData>(`${process.env.REACT_APP_HOST}/debate/all/recent`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      staleTime: 60000,
      onError: (error) => {
        console.error('최근 토론 목록 가져오기 에러:', error)
      },
    },
  )
}

const DebateRecent = () => {
  const { isLoading, error, data: recentListData } = useRecentDebateList()

  return (
    <div>
      <b className={styles.recentTitle}>{'최근 토론'}</b>
      <div className={styles.recentLists}>
        {isLoading ? (
          <p className={styles.none}>{'데이터를 불러오는 중입니다.'}</p>
        ) : error ? (
          <p className={styles.none}>{'최근 변경된 토론이 없습니다.'}</p>
        ) : (
          recentListData?.data.slice(0, 4).map((item: RecentItem) => (
            <Link
              key={item.id}
              to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
              state={{ title: item.title, subject: item.subject, id: item.id }}
              className={styles.linkTo}
            >
              <ul>
                <span className={styles.listTitle}>{item.subject}</span>
                <span className={styles.listTimestamp}>{FormatTimeAgo(item.recent_edited_at)}</span>
              </ul>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default DebateRecent
