import { useNavigate } from 'react-router-dom'
import { track } from '@amplitude/analytics-browser'
import { useMutation, useQueryClient } from 'react-query'
import comment_icon from '../img/resultcomment.svg'
import edit from '../img/resultedit.svg'
import styles from './ResultQues.module.css'
import FormatDate from './FormatDate'
import ThreedotsMenu from './ThreedotsMenu'
import LikeorNot from './LikeorNot'

interface QuestionProps {
  index: number
  title: string
  id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  created_at: Date
  answer_count: number
  is_bad: boolean
  nick: string
  like_count: number
}

function Question({
  index,
  title,
  id,
  doc_id,
  user_id,
  index_title,
  content,
  created_at,
  answer_count,
  is_bad,
  nick,
  like_count,
}: QuestionProps) {
  const formattedDate = FormatDate(created_at)
  const nav = useNavigate()
  const queryClient = useQueryClient()

  const linktoQuestionEdit = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/question/edit/${encodedTitle}`, {
      state: {
        qid: id,
        user_id,
        content,
        created_at,
        like_count,
        nick,
      },
    })
  }

  const trackClick = () => {
    track('click_question_in_search_result', {
      title,
      index,
    })
  }

  const handleClick = () => {
    trackClick()
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/morequestion/${encodedTitle}/${id}`, {
      state: {
        question_id: id,
        user_id,
        content,
        created_at,
        like_count,
        nick,
        index_title,
        answer_count,
        title,
      },
    })
  }

  return (
    <div className={styles.q_list}>
      <div className={styles.q_header}>
        <div className={styles.q_fronthead}>
          <span className={styles.q_mynick}>{nick}</span>
        </div>
        <div className={styles.q_backhead}>
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
      </div>
      <div role={'presentation'} className={styles.q_middle} onClick={handleClick}>
        <span className={styles.q_icon}>{'Q. '}</span>
        <span className={styles.q_content}>{content}</span>
      </div>
      <div className={styles.q_footer}>
        <div className={styles.q_frontfooter}>
          <div className={styles.q_like}>
            <LikeorNot questionId={id} like_count={like_count} user_id={user_id} nick={nick} />
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

export default Question
