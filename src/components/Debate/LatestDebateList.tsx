import { useNavigate } from 'react-router-dom'
import styles from './LatestDebateList.module.css'
import FormatDate from '../FormatDate'


interface LatestDebateListProps {
  id: string;
  doc_id: string;
  user_id: string;
  subject: string;
  created_at: string;
  recent_edited_at: string;
  done_or_not: string;
  done_at: string;
  is_bad: boolean;
  title: string;
}


function LatestDebateList({
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
      <span onClick={linktoDebateRoom} className={styles.title}>
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
