import threedots from "../img/threedots.png"
import like from "../img/like.png"
import comment_icon from "../img/comment_icon.png"
import edit from "../img/edit.png"
import styles from "../components/QuestionFor.module.css"
import minilike from "../img/minilike.png"

function QuestionFor({id, doc_id, user_id, index_title, content, created_at, answer_or_not, is_bad, like_count}){
  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{user_id}</span>
              <span className={styles.q_date}>{created_at}</span>
            </div>
            <div className={styles.q_backhead}>
              <span className={styles.quesNum}>{like_count}<img src={minilike}/></span>
            </div>
          </div>
          <div className={styles.q_middle}>
            <div>
              <span className={styles.q_icon}>Q. </span>
              <span className={styles.q_content}>{content}</span>
            </div>
            <div>
              <span>해당 질문을 기반으로 문서 수정하기</span>
            </div>
            
          </div>
        </div>
    );
  };

  export default QuestionFor;