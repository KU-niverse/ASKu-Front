import { useNavigate } from 'react-router-dom'
import comment_icon from '../img/comment_icon.png'
import edit from '../img/edit.png'
import FormatDate from './FormatDate'
import ThreedotsMenu from './ThreedotsMenu'
import LikeorNot from './LikeorNot'
import styles from './MyQuestionList.module.css'

interface MyQuestionListProps {
  badge_image: string
  answer_count: number
  docsname: string
  id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  created_at: Date
  answer_or_not: number
  is_bad: boolean
  nick: string
  like_count: number
}

function MyQuestionList({
  badge_image,
  answer_count,
  docsname,
  id,
  doc_id,
  user_id,
  index_title,
  content,
  created_at,
  answer_or_not,
  is_bad,
  nick,
  like_count,
}: MyQuestionListProps) {
  const formattedDate = FormatDate(created_at)
  const type = 2
  const nav = useNavigate()
  const title = docsname
  // const linktoQuestionEdit = () => {
  //   ;
  //   nav(`/question/edit/${title}`, {state : {
  //     qid: id,
  //     user_id: user_id,
  //     content: content,
  //     created_at: created_at,
  //     like_count: like_count,
  //     nick: nick,
  //     index_title:index_title}
  //   });
  // }

  const linktoQuestion = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/morequestion/${encodedTitle}`)
  }

  return (
    <div className={styles.q_list}>
      <div className={styles.q_header}>
        <div className={styles.q_fronthead}>
          <div className={styles.q_box}>
            <img className={styles.q_badge} src={badge_image} alt={'badge'} />
          </div>
          <span className={styles.q_mynick}>{nick}</span>
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
        <div className={styles.q_backhead}>
          <ThreedotsMenu questionId={id} type={type} />
        </div>
      </div>
      <div className={styles.q_middle}>
        <span className={styles.q_icon}>{'Q. '}</span>
        <span role={'presentation'} onClick={linktoQuestion} className={styles.q_content}>
          <span className={styles.q_index}>
            {'['}
            {index_title}
            {']'}
          </span>
          {content}
        </span>
      </div>
      <div className={styles.q_footer}>
        <div className={styles.q_frontfooter}>
          <div className={styles.q_like}>
            <LikeorNot questionId={id} like_count={like_count} user_id={user_id} />
          </div>
          <div className={styles.q_comment}>
            <img src={comment_icon} alt={'comment'} />
            <span className={styles.commentCount}>{answer_count}</span>
          </div>
        </div>
        <div className={styles.q_backfooter} />
      </div>
    </div>
  )
}

export default MyQuestionList
