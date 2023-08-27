import threedots from "../img/threedots.png"
import like from "../img/like.png"
import edit from "../img/edit.png"
import styles from "../components/Comment.module.css"
import ThreedotsReport from "./ThreedotsReport"
import FormatDate from "./FormatDate"
import { useNavigate } from "react-router-dom"

function Comment({id, subject, content, created_at, is_bad, docsname, nick}){
  const formattedDate = FormatDate(created_at);
  const nav = useNavigate();
  const debateId = id;
  const title=docsname;
  const linktoComment = ()=>{
    nav(`/debate/${title}/${subject}/${debateId}`)
  }

  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{nick}</span>
              <span className={styles.q_date}>{formattedDate}</span>
            </div>
            <div className={styles.q_backhead}>
            <ThreedotsReport id={id}/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span onClick={linktoComment} className={styles.q_content}>{content}</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <div className={styles.q_like}>
                <span onClick={linktoComment} className={styles.likeCount}>{subject} 토론방</span>
              </div>
            </div>
            <div className={styles.q_backfooter}>
              {/* <button className={styles.q_editbtn}>
                <span>Q 질문 보기</span>
              </button> */}
              <span>{docsname}</span>
            </div>
          </div>
        </div>
    );
  };

  export default Comment;