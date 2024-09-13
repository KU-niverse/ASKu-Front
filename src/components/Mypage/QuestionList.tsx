import { useNavigate, useParams } from 'react-router-dom'
import styles from './QuestionList.module.css'
import comment_icon from '../../img/comment_icon.png'
import nocomment_icon from '../../img/nocomment_icon.png'

interface QuestionListProps {
  id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  time: Date // "2023-09-03T06:11:12.000Z"와 같은 형식의 문자열
  is_bad: boolean // 0 또는 1로 나타내는 숫자
  nickname: string
  like_count: number
  doc_title: string
  answer_count: number
}

function QuestionList({
  id,
  doc_id,
  user_id,
  index_title,
  content,
  time,
  is_bad,
  nickname,
  like_count,
  doc_title,
  answer_count,
}: QuestionListProps) {
  const maxLength = 80
  const title = doc_title
  const truncateContent = (text: string) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
  }
  const nav = useNavigate()
  const linktoQuestion = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/morequestion/${encodedTitle}`)
  }
  const linktoAnswer = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/morequestion/${encodedTitle}/${id}`, {
      state: {
        question_id: id,
        user_id,
        content,
        created_at: time,
        like_count,
        nick: nickname,
        index_title,
        answer_count,
        title: doc_title,
      },
    })
  }

  return (
    <div className={styles.ask_list}>
      <div className={styles.ask_front}>
        <span className={styles.ask_icon}>{'Q.'}</span>
        <span role={'presentation'} onClick={linktoAnswer} className={styles.ask_content}>
          {truncateContent(content)}
        </span>
      </div>
      <div role={'presentation'} onClick={linktoAnswer} className={styles.comment_icon}>
        {answer_count === 0 ? ( // answer_count가 0일 때
          <>
            <img
              className={styles.comment_png}
              src={nocomment_icon} // nocomment_icon을 보여줌
              alt={'nocomment_icon'}
            />
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        ) : (
          // answer_count가 0이 아닐 때
          <>
            <img className={styles.comment_png} src={comment_icon} alt={'comment_icon'} />
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        )}{' '}
      </div>
    </div>
  )
}

export default QuestionList
