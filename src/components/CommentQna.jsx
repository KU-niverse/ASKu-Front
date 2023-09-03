import threedots from "../img/threedots.png"
import like from "../img/like.png"
import edit from "../img/edit.png"
import styles from "../components/CommentQna.module.css"
import link_icon from "../img/link_icon.png"
import FormatDate from "./FormatDate"
import ThreedotsReport from "./ThreedotsReport"

function CommentQna({id, wiki_history_id, created_at, user_id, nickname, rep_badge, badge_image, title, content}){
  const formattedDate = FormatDate(created_at);
  const type=5;
  return(
        <div className={styles.q_list}>
          <div className={`${styles.q_header}`}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>{nickname}</span>
              <span className={styles.q_date}>{formattedDate}</span>
            </div>
            <div className={styles.q_backhead}>
            <ThreedotsReport type={type} target={id}/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_content}>{content}</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <span className={styles.q_message}>위 질문을 기반으로 수정된 문서 내용입니다.</span>
            </div>
            <div className={styles.q_backfooter}>
              <button className={styles.q_editbtn}>
                <img src={link_icon} alt="link_icon"/>
                <span className={styles.q_linkbtn}>문서 바로가기</span>
              </button>
            </div>
          </div>
        </div>
    );
  };

  export default CommentQna;