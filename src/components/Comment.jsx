import threedots from "../img/threedots.png"
import like from "../img/like.png"
import edit from "../img/edit.png"
import styles from "../components/Comment.module.css"
import ThreedotsMenu from "./ThreedotsMenu"
import FormatDate from "./FormatDate"

function Comment({id, subject, content, created_at, is_bad, docsname, nick}){
  const formattedDate = FormatDate(created_at);

  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{nick}</span>
              <span className={styles.q_date}>{formattedDate}</span>
            </div>
            <div className={styles.q_backhead}>
            <ThreedotsMenu debateId={id}/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_content}>{content}</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <div className={styles.q_like}>
                <span className={styles.likeCount}>{docsname} 토론방</span>
              </div>
            </div>
            <div className={styles.q_backfooter}>
              {/* <button className={styles.q_editbtn}>
                <span>Q 질문 보기</span>
              </button> */}
              <span>{subject}</span>
            </div>
          </div>
        </div>
    );
  };

  export default Comment;