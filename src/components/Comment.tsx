import { useNavigate } from 'react-router-dom'
import threedots from '../img/threedots.png'
import like from '../img/like.png'
import edit from '../img/edit.png'
import styles from './Comment.module.css'
import ThreedotsReport from './ThreedotsReport'
import FormatDate from './FormatDate'
import campaign from '../img/campaign.svg'

interface CommentProps {
  id: number
  subject: string
  content: string
  created_at: Date
  is_bad: boolean
  docsname: string
  nick: string
}

function Comment({ id, subject, content, created_at, is_bad, docsname, nick }: CommentProps) {
  const formattedDate = FormatDate(created_at)
  const nav = useNavigate()
  const debateId = id
  const title = docsname
  const linktoComment = () => {
    const encodedTitle = encodeURIComponent(title)
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
          <ThreedotsReport target={id} type={0} />
        </div>
      </div>
      <div className={styles.q_middle}>
        <span role={'presentation'} onClick={linktoComment} className={styles.q_content}>
          {content}
        </span>
      </div>
      <div className={styles.q_footer}>
        <div className={styles.q_frontfooter}>
          <div className={styles.q_like}>
            <img src={campaign} alt={'campaign'} className={styles.campaignIcon} />
            <span role={'presentation'} onClick={linktoComment} className={styles.debate_content}>
              {content}
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
