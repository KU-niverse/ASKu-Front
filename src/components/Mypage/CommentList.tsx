import { useNavigate, useParams } from 'react-router-dom'
import styles from './CommentList.module.css'
// import comment_icon from '../../img/comment_icon.png'
// import nocomment_icon from '../../img/nocomment_icon.png'
import campaign from '../../img/campaign.svg'

interface CommentListProps {
  id: number
  subject: string
  content: string
  time: Date
  doc_title: string
}

function CommentList({ id, subject, content, time, doc_title }: CommentListProps) {
  const maxLength = 30

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
        <img className={styles.comment_png} src={campaign} alt={'comment_icon'} />
      </div>
      <span role={'presentation'} onClick={linktoComment} className={styles.comment_content}>
        {content}
      </span>
      {/* <div role={'presentation'} onClick={linktoComment} className={styles.comment_icon}>
        {answer_count === 0 ? ( // answer_count가 0일 때
          <>
            <span className={styles.comment_num}>{answer_count}</span>
            <img
              className={styles.comment_png}
              src={nocomment_icon} // nocomment_icon을 보여줌
              alt={'nocomment_icon'}
            />
          </>
        ) : (
          // answer_count가 0이 아닐 때
          <>
            <img className={styles.comment_png} src={comment_icon} alt={'comment_icon'} />
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        )}{' '}
      </div> */}
    </div>
  )
}

export default CommentList
