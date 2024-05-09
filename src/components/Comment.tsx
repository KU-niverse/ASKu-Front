import { useNavigate } from 'react-router-dom'
import threedots from '../img/threedots.png'
import like from '../img/like.png'
import edit from '../img/edit.png'
import styles from './Comment.module.css'
import ThreedotsReport from './ThreedotsReport'
import FormatDate from './FormatDate'

interface CommentProps {
  id: number;
  subject: string;
  content: string;
  created_at: string;
  is_bad: boolean;
  docsname: string;
  nick: string;
}

function Comment({ id, subject, content, created_at, is_bad, docsname, nick }: CommentProps) {
  const formattedDate = FormatDate(created_at)
  const nav = useNavigate()
  const debateId: number = id
  const title: string = docsname
  const linktoComment = () => {
    const encodedTitle: string = encodeURIComponent(title)
    nav(`/debate/${encodedTitle}/${subject}`, {
      state: {
        title,
        subject,
        id: debateId,
      },
    })
  }

  return (
    <div className={styles.q_list}>
      <div className={styles.q_header}>
        <div className={styles.q_fronthead}>
          <span className={styles.q_mynick}>{nick}</span>
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
        <div className={styles.q_backhead}>
          <ThreedotsReport id={id} />
        </div>
      </div>
      <div className={styles.q_middle}>
        <span onClick={linktoComment} className={styles.q_content}>
          {content}
        </span>
      </div>
      <div className={styles.q_footer}>
        <div className={styles.q_frontfooter}>
          <div className={styles.q_like}>
            <span onClick={linktoComment} className={styles.likeCount}>
              {subject} {'토론방\r'}
            </span>
          </div>
        </div>
        <div className={styles.q_backfooter}>
          {/* <button className={styles.q_editbtn}>
                <span>Q 질문 보기</span>
              </button> */}
          <span>{docsname}</span>
        </div>
      </div>
    </div>
  )
}

export default Comment
