import comment_icon from "../img/comment_icon.png"
import edit from "../img/edit.png"
import FormatDate from "./FormatDate"
import ThreedotsMenu from "./ThreedotsMenu"
import LikeorNot from "./LikeorNot"
import { useNavigate } from "react-router-dom"
import styles from "./MyQuestionList.module.css"


function MyQuestionList({ title, id, doc_id, user_id, index_title, content, created_at, answer_or_not, is_bad, nick, like_count}){
  const formattedDate = FormatDate(created_at);
  const type=2;
  const nav = useNavigate();
  const linktoQuestionEdit = () => {
    ;
    nav(`/question/edit/${title}`, {state : {
      qid: id,
      user_id: user_id,
      content: content,
      created_at: created_at,
      like_count: like_count,
      nick: nick,
      index_title:index_title}
    });
  }


  return(
        <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{nick}</span>
              <span className={styles.q_date}>{formattedDate}</span>
            </div>
            <div className={styles.q_backhead}>
              <ThreedotsMenu  questionId={id} type={type}/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_icon}>Q. </span>
            <span className={styles.q_content}>{content}</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <div className={styles.q_like}>
                <LikeorNot questionId={id} like_count={like_count} user_id={user_id} />
              </div>
              <div className={styles.q_comment}>
                <img src={comment_icon} alt="comment"/>
                <span className={styles.commentCount}>{answer_or_not}</span>
              </div>
            </div>
            <div className={styles.q_backfooter}>
            </div>
          </div>
        </div>
    );
  };

  export default MyQuestionList;