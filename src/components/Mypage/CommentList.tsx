import { useNavigate, useParams } from 'react-router-dom'
import styles from './CommentList.module.css'
import comment_icon from '../../img/comment_icon.png'

interface CommentListProps {
  id: number
  subject: string
  content: string
  time: Date
  doc_title: string
}

function CommentList({ id, subject, content, time, doc_title }: CommentListProps) {
  const maxLength = 70

  // 글자 수가 maxLength를 넘으면 뒤에 "..."을 붙이고 아니면 그대로 반환
  const truncateContent = (text: string) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
  }

  const debateId: number = id
  const title: string = doc_title
  const nav = useNavigate()
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
    <div className={styles.comment_list}>
      <div className={styles.comment_icon}>
        <img className={styles.comment_png} src={comment_icon} alt={'comment_icon'} />
      </div>
      <span role={'presentation'} onClick={linktoComment} className={styles.comment_content}>
        {truncateContent(content)}
      </span>
    </div>
  )
}

export default CommentList
