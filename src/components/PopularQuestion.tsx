import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PopularQuestion.module.css'
import FormatTimeAgo from './FormatTimeAgo'

interface PopularQuestionProps {
  id: number
  nickname: string
  title: string
  created_at: Date
  answer_count: number
}

const PopularQuestion = (props: PopularQuestionProps) => {
  const nav = useNavigate()

  const { id, nickname, title, created_at, answer_count } = props // 구조 분해 할당

  return (
    <div className={styles.contents}>
      <div className={styles.contentsOne}>
        <div className={styles.questionInfoContainer}>
          <p className={styles.nickname}>{nickname}</p>
          <p
            className={styles.title}
            role={'presentation'}
            onClick={() => {
              const encodedTitle = encodeURIComponent(title)
              nav(`/wiki/${encodedTitle}`)
            }}
          >
            {title}
          </p>
          <p className={styles.timeAgo}>{FormatTimeAgo(created_at)}</p>
          <p className={styles.answerCount}>답변 갯수: {answer_count}</p>
        </div>
      </div>
    </div>
  )
}

export default PopularQuestion
