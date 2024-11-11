import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './PopularQuestion.module.css'
import FormatTimeAgo from './FormatTimeAgo'
import answer_count_img from '../img/answer_count.svg'

interface PopularQuestionProps {
  id: number
  nickname: string
  title: string
  created_at: Date
  answer_count: string
  content: string
  question_id: string // question_id 추가
}

interface QuestionDataItem {
  user_id: number
  nickname: string
  content: string
  like_count: string
  created_at: Date
  index_title: string
  answer_count: string
  badge_image: string
}

interface QuestionData {
  data: QuestionDataItem[]
}

const fetchQuestion = async (question_id: string) => {
  const res = await axios.get<QuestionData>(`${process.env.REACT_APP_HOST}/question/lookup/${question_id}`, {
    withCredentials: true,
  })
  return res.data
}

const PopularQuestion = (props: PopularQuestionProps) => {
  const nav = useNavigate()
  const { id, nickname, title, created_at, answer_count, content, question_id } = props
  const answer_count_num: number = Number(answer_count)
  // 질문 데이터를 가져오는 useQuery
  const { data: questionData, isLoading, error } = useQuery(['question', question_id], () => fetchQuestion(question_id))

  if (isLoading) {
    return <div>{'로딩 중...'}</div>
  }

  if (error) {
    return <div>{'질문 데이터를 불러오는 중 오류가 발생했습니다.'}</div>
  }

  // 질문 데이터에서 배지 이미지 가져오기
  const badge_image = questionData?.data[0]?.badge_image

  return (
    <div className={styles.PopularQuestionContainer}>
      <div className={styles.header}>
        <div className={styles.badge}>
          {badge_image && <img src={badge_image} alt={'badge'} className={styles.repBadge} />}
        </div>
        <div className={styles.nickname}>{nickname}</div>
      </div>
      <div className={styles.body}>
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
        <div
          className={styles.content} // 새로 추가된 부분
          role={'presentation'}
          onClick={() => {
            // question_id를 기반으로 해당 질문 상세 페이지로 이동
            nav(`wiki/morequestion/${encodeURIComponent(title)}/${id}`)
          }}
        >
          &quot;{content}&quot;
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.timeAgo}>{FormatTimeAgo(created_at)}</div>

        <div className={styles.answerCountContainer}>
          <img src={answer_count_img} alt={'badge'} className={styles.answer_count_img} />
          <div
            role={'button'} // 역할 추가: 버튼처럼 보이도록 설정
            tabIndex={0} // 키보드 접근성을 위한 포커스 가능하게 설정
            onClick={() => {
              nav(`wiki/morequestion/${encodeURIComponent(title)}/${id}`)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // Enter 또는 스페이스 키가 눌렸을 때 nav 호출
                e.preventDefault() // 기본 동작 방지 (스크롤 등)
                nav(`wiki/morequestion/${encodeURIComponent(title)}/${id}`)
              }
            }}
            className={styles.answerCount}
          >
            {answer_count_num}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularQuestion
