import React from 'react'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './PopularDebate.module.css'
import FormatTimeAgo from './FormatTimeAgo'
import comment_count_img from '../img/answer_count.svg'

interface PopularDebateProps {
  id: number
  doc_id: number
  user_id: number
  subject: string
  title: string
  created_at: Date
  recent_edited_at: Date
  done_or_not: boolean
}

interface DebateContentData {
  success: boolean
  message: string
  data: object[]
}

function useDebateMessages(title: string, debateId: number) {
  return useQuery<DebateContentData, AxiosError>(
    ['debateMessages', title, debateId],
    async () => {
      const res = await axios.get<DebateContentData>(
        `${process.env.REACT_APP_HOST}/debate/view/${encodeURIComponent(title)}/${debateId}`,
        { withCredentials: true },
      )
      return res.data
    },
    {
      enabled: !!title && !!debateId,
      retry: false,
      onError: (err: AxiosError) => {
        console.error('토론 메시지 가져오기 에러:', err)
      },
    },
  )
}

// 컴포넌트 정의
const PopularDebate = (props: PopularDebateProps) => {
  const nav = useNavigate()
  const { id, doc_id, user_id, subject, title, created_at, recent_edited_at, done_or_not } = props
  const { data: debateData, isLoading } = useDebateMessages(title, id)
  const commentCount = debateData?.data.length ?? 0

  // 토론 상세 페이지로 이동하는 함수
  const handleNavigateToDebate = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/debate/${encodedTitle}/${subject}`, {
      state: {
        id,
        doc_id,
        user_id,
        subject,
        title,
        created_at,
        recent_edited_at,
        done_or_not,
      },
    })
  }

  return (
    <div className={styles.PopularDebateContainer}>
      <div className={styles.header}>
        <div
          className={styles.title}
          role={'presentation'}
          onClick={() => {
            const encodedTitle = encodeURIComponent(title)
            nav(`/wiki/${encodedTitle}`)
          }}
        >
          {title}
        </div>
      </div>
      <div className={styles.body}>
        <div
          onClick={handleNavigateToDebate}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault() // 기본 동작 방지
              handleNavigateToDebate() // Enter 또는 Space를 눌렀을 때 네비게이션 호출
            }
          }}
          className={styles.subject}
        >
          &quot;{subject}&quot;
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.timeAgo}>{FormatTimeAgo(created_at)}</div>

        <div className={styles.commentCountContainer}>
          <img src={comment_count_img} alt={'badge'} className={styles.comment_count_img} />
          <div
            role="button" // 역할 추가: 버튼처럼 보이도록 설정
            tabIndex={0} // 키보드 접근성을 위한 포커스 가능하게 설정
            onClick={handleNavigateToDebate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // Enter 또는 스페이스 키가 눌렸을 때 nav 호출
                e.preventDefault() // 기본 동작 방지 (스크롤 등)
                handleNavigateToDebate()
              }
            }}
            className={styles.answerCount}
          >
            {isLoading ? <div>로딩 중...</div> : <div className={styles.commentCount}>{commentCount}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularDebate
