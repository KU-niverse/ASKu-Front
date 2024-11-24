import React from 'react'
import { useNavigate } from 'react-router-dom'
import comment_icon from '../img/comment_icon.png'
import styles from './QuestionFor.module.css'
import minilike from '../img/minilike.png'
import FormatDate from './FormatDate'
import LikeorNot from './LikeorNot'

interface QuestionForProps {
  created_at: Date
  nick: string
  like_count: number
  content: string
  badge_image: string
  id: number
  user_id: number
  answer_count: number
  title: string
  index_title: string
}

const QuestionFor: React.FC<QuestionForProps> = ({
  created_at,
  nick,
  like_count,
  content,
  badge_image,
  id,
  user_id,
  answer_count,
  title,
  index_title,
}) => {
  const timestamp = FormatDate(created_at)
  const navigate = useNavigate()

  const linktoAnswer = () => {
    const encodedTitle = encodeURIComponent(title)
    navigate(`/wiki/morequestion/${encodedTitle}/${id}`, {
      state: {
        question_id: id,
        user_id,
        content,
        created_at,
        like_count,
        nick,
        index_title,
        answer_count,
        title,
        badge_image,
      },
    })
  }

  return (
    <div className={styles.q_list}>
      <div className={styles.q_header}>
        <div className={styles.q_fronthead}>
          <div className={styles.q_box}>
            <img className={styles.q_badge} src={badge_image} alt={'badge'} />
          </div>
          <span className={styles.q_mynick}>{nick}</span>
          <span className={styles.q_date}>{timestamp}</span>
        </div>
      </div>
      <div className={styles.q_middle}>
        <div>
          <span className={styles.q_icon}>{'Q. '}</span>
          <span role={'presentation'} onClick={linktoAnswer} className={styles.q_content}>
            {content}
          </span>
        </div>
      </div>
      <div className={styles.q_footer}>
        <div className={styles.q_frontfooter}>
          <div className={styles.q_like}>
            <LikeorNot questionId={id} like_count={like_count} user_id={user_id} />
          </div>
          <div role={'presentation'} onClick={linktoAnswer} className={styles.q_comment}>
            <img src={comment_icon} alt={'comment'} />
            <span className={styles.commentCount}>{answer_count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionFor
