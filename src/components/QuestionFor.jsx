import threedots from "../img/threedots.png"
import like from "../img/like.png"
import comment_icon from "../img/comment_icon.png"
import edit from "../img/edit.png"
import styles from "../components/Question.module.css"

function QuestionFor({id, doc_id, user_id, index_title, content, created_at, answer_or_not, is_bad}){
  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{user_id}</span>
              <span className={styles.q_date}>{created_at}</span>
            </div>
            <div className={styles.q_backhead}>
              <img src={threedots} alt='threedots'/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_icon}>Q. </span>
            <span className={styles.q_content}>{content}</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <div className={styles.q_like}>
                <img src={like} alt="like"/>
                <span className={styles.likeCount}>150</span>
              </div>
              <div className={styles.q_comment}>
                <img src={comment_icon} alt="comment"/>
                <span className={styles.commentCount}>{answer_or_not}</span>
              </div>
            </div>
          </div>
        </div>
    );
  };

  export default QuestionFor;