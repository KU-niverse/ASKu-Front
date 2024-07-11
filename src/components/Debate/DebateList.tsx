import { useNavigate, useParams, Link } from 'react-router-dom'
import styles from './DebateList.module.css'
import FormatDate from '../FormatDate'

interface DebateListProps {
  title: string
  id: number
  doc_id: number
  user_id: number
  subject: string
  created_at: Date
  recent_edited_at: Date
  done_or_not: boolean
  done_at: Date
  is_bad: boolean
}

function DebateList({
  title,
  id,
  doc_id,
  user_id,
  subject,
  created_at,
  recent_edited_at,
  done_or_not,
  done_at,
  is_bad,
}: DebateListProps) {
  const formattedDate = FormatDate(recent_edited_at)
  const nav = useNavigate()
  const linktoDebateRoom = () => {
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
      </span>

      <span className={styles.date}>{formattedDate}</span>
    </div>
  )
}

export default DebateList