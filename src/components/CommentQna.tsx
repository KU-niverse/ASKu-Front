import styles from './CommentQna.module.css'
import FormatDate from './FormatDate'
import ThreedotsReport from './ThreedotsReport'

interface CommentQnaProps {
  index_title: string
  id: string
  wiki_history_id: string
  question_id: string
  created_at: string
  user_id: string
  nickname: string
  rep_badge: string
  badge_image: string
  title: string
  content: string
}

function CommentQna({
  index_title,
  id,
  wiki_history_id,
  question_id,
  created_at,
  user_id,
  nickname,
  rep_badge,
  badge_image,
  title,
  content,
}: CommentQnaProps) {
  const formattedDate = FormatDate(created_at)
  const type = 1
  return (
    <div className={styles.q_list}>
      <div className={`${styles.q_header}`}>
        <div className={styles.q_fronthead}>
          <div className={styles.q_box}>
            <img className={styles.q_badge} src={badge_image} alt={'badge'} />
          </div>
          <span className={styles.q_mynick}>{nickname}</span>
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
        <div className={styles.q_backhead}>
          <ThreedotsReport type={type} target={wiki_history_id} />
        </div>
      </div>
      <div className={styles.q_middle}>
        <span className={styles.q_content}>{content}</span>
      </div>
      <div className={styles.q_footer}>
        <div className={styles.q_frontfooter}>
          <span className={styles.q_index}>
            {'['}
            {index_title}
            {']'}
          </span>
        </div>
        <div className={styles.q_backfooter}>
          {/* <button className={styles.q_editbtn}>
                <img src={link_icon} alt="link_icon"/>
                <span className={styles.q_linkbtn}>문서 바로가기</span>
              </button> */}
          <span className={styles.q_message}>{'위 질문을 기반으로 수정된 문서 내용입니다.'}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentQna
