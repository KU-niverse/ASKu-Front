import React from 'react'
import threedots from '../img/threedots.png'
import like from '../img/like.png'
import comment_icon from '../img/comment_icon.png'
import edit from '../img/edit.png'
import styles from './QuestionFor.module.css'
import minilike from '../img/minilike.png'
import FormatDate from './FormatDate'

interface QuestionForProps {
  created_at: Date
  nick: string
  like_count: number
  content: string
  badge_image: string
}

const QuestionFor: React.FC<QuestionForProps> = ({ created_at, nick, like_count, content, badge_image }) => {
  const timestamp = FormatDate(created_at)

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
        <div className={styles.q_backhead}>
          <span className={styles.q_num}>
            {like_count}
            <div className={styles.q_like}>
              <img alt={'minlike 버튼'} src={minilike} />
            </div>
          </span>
        </div>
      </div>
      <div className={styles.q_middle}>
        <div>
          <span className={styles.q_icon}>{'Q. '}</span>
          <span className={styles.q_content}>{content}</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionFor
