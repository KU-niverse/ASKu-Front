/* eslint-disable react/no-unused-prop-types */
import { useNavigate } from 'react-router-dom'
import styles from './LatestDebateList.module.css'
import FormatDate from '../FormatDate'

interface LatestDebateListProps {
  id: number
  doc_id: number
  user_id: number
  subject: string
  created_at: Date
  recent_edited_at: Date
  done_or_not: boolean
  done_at: Date
  is_bad: boolean
  title: string
}

function LatestDebateList({ id, subject, recent_edited_at, title }: LatestDebateListProps) {
  const formattedDate = FormatDate(recent_edited_at)
  const nav = useNavigate()
  const linktoDebateRoom = () => {
    window.history.replaceState(null, '', `/latestdebate`)
    const encodedTitle = encodeURIComponent(title)
    nav(`/debate/${encodedTitle}/${subject}`, {
      state: {
        title,
        subject,
        id,
      },
    })
  }
  return (
    <div className={styles.container}>
      <span role={'presentation'} onClick={linktoDebateRoom} className={styles.title}>
        {subject}
        {' ('}
        {title}
        {')\r'}
      </span>
      <span className={styles.date}>{formattedDate}</span>
    </div>
  )
}

export default LatestDebateList
