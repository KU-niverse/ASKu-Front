import React from 'react'
import styles from './DebateContent.module.css'
import FormatDate from '../FormatDate'
import ThreedotsReport from '../ThreedotsReport'

interface DebateContentProps {
  badge_image: string;
  key:string;
  r_id: string;
  id: number;
  debate_id?: string;
  user_id: string;
  content: string;
  created_at: string;
  is_bad: boolean;
  nick: string;
}



function DebateContent({ badge_image, key, r_id, id, debate_id, user_id, content, created_at, is_bad, nick }: DebateContentProps) {
  const formattedDate = FormatDate(created_at)
  const type = 4
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.frontheader}>
          <span className={styles.num}>
            {'#'}
            {id}
          </span>
          <div className={styles.q_box}>
            <img className={styles.q_badge} src={badge_image} alt={'badge'} />
          </div>
          <span className={styles.user}>{nick}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.backheader}>
          <ThreedotsReport type={type} target={r_id} />
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.debate_content}>{content}</span>
      </div>
    </div>
  )
}

export default DebateContent
