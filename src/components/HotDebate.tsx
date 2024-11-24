import { useNavigate } from 'react-router-dom'
import styles from './HotDebate.module.css'
import FormatDate from './FormatDate'

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

function HotDebate({
  id,
  doc_id,
  user_id,
  subject,
  created_at,
  recent_edited_at,
  done_or_not,
  done_at,
  is_bad,
  title,
}: LatestDebateListProps) {
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
      <div className={styles.subject} role={'presentation'} onClick={linktoDebateRoom}>
        <p className={styles.question}>{subject}</p>
      </div>
      <button type="button" className={styles.joinDebate} onClick={linktoDebateRoom}>
        나도 참여할래!
      </button>
    </div>
  )
}

export default HotDebate
