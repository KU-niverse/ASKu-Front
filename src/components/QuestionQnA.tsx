import { useNavigate, useLocation } from 'react-router-dom'
import comment_icon from '../img/comment_icon.png'
import edit from '../img/edit.png'
import styles from './QuestionQnA.module.css'
import FormatDate from './FormatDate'
import ThreedotsMenu from './ThreedotsMenu'
import ThreedotsReport from './ThreedotsReport'
import LikeorNot from './LikeorNot'

interface QuestionQnAProps {
  badge_image: string
  current_user_id: number
  answer_count: number
  title: string
  question_id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  created_at: Date
  answer_or_not: boolean
  is_bad: boolean
  nick: string
  like_count: number
}

function QuestionQnA({
  badge_image,
  current_user_id,
  answer_count,
  title,
  question_id,
  doc_id,
  user_id,
  index_title,
  content,
  created_at,
  answer_or_not,
  is_bad,
  nick,
  like_count,
}: QuestionQnAProps) {
  const formattedDate = FormatDate(created_at)

  const type = 2
  const nav = useNavigate()
  const location = useLocation()
  const encodedTitle = encodeURIComponent(title)
  const linktoQuestionEdit = () => {
    nav(`/question/edit/${encodedTitle}`, {
      state: {
        from: location.pathname,
        qid: question_id,
        user_id,
        content,
        created_at,
        like_count,
        nick,
        index_title,
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
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
        <div className={styles.q_backhead}>
          {user_id === current_user_id ? (
            <ThreedotsMenu encodedTitle={encodedTitle} questionId={question_id} type={type} />
          ) : (
            <ThreedotsReport target={question_id} type={type} />
          )}
        </div>
      </div>
      <div className={styles.q_middle}>
        <span className={styles.q_icon}>{'Q. '}</span>
        <span className={styles.q_content}>
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
            <LikeorNot questionId={question_id} like_count={like_count} user_id={user_id} />
          </div>
          <div className={styles.q_comment}>
            <img src={comment_icon} alt={'comment'} />
            <span className={styles.commentCount}>{answer_count}</span>
          </div>
        </div>
        <div className={styles.q_backfooter}>
          <button type={'button'} onClick={linktoQuestionEdit} className={styles.q_editbtn}>
            <img src={edit} alt={'edit'} />
            <span>{'질문을 기반으로 문서 수정하기'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionQnA
