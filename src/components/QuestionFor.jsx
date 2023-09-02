import threedots from "../img/threedots.png"
import like from "../img/like.png"
import comment_icon from "../img/comment_icon.png"
import edit from "../img/edit.png"
import styles from "../components/QuestionFor.module.css"
import minilike from "../img/minilike.png"
import { useLocation, useParams } from "react-router-dom"
import FormatDate from "./FormatDate"

function QuestionFor(props){
  const timestamp = FormatDate(props.created_at)

  


  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{props.nick}</span>
              <span className={styles.q_date}>{timestamp}</span>
            </div>
            <div className={styles.q_backhead}>
              <span className={styles.q_num}>{props.like_count}<div className={styles.q_like}><img src={minilike}/></div></span>
            </div>
          </div>
          <div className={styles.q_middle}>
            <div>
              <span className={styles.q_icon}>Q. </span>
              <span className={styles.q_content}>{props.content}</span>
            </div>
            <div>
              <span className={styles.q_letter}>해당 질문을 기반으로 문서 수정하기</span>
            </div>
            
          </div>
        </div>
    );
  };

  export default QuestionFor;