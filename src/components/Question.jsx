import threedots from "../img/threedots.png"
import like from "../img/like.png"
import comment_icon from "../img/comment_icon.png"
import edit from "../img/edit.png"
import styles from "../components/Question.module.css"

function Question(){
  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>하호후리스</span>
              <span className={styles.q_date}>2일전</span>
            </div>
            <div className={styles.q_backhead}>
              <img src={threedots} alt='threedots'/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_icon}>Q. </span>
            <span className={styles.q_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <div className={styles.q_like}>
                <img src={like} alt="like"/>
                <span className={styles.likeCount}>150</span>
              </div>
              <div className={styles.q_comment}>
                <img src={comment_icon} alt="comment"/>
                <span className={styles.commentCount}>3</span>
              </div>
            </div>
            <div className={styles.q_backfooter}>
              <button className={styles.q_editbtn}>
                <img src={edit} alt="edit"/>
                <span>질문을 기반으로 문서 수정하기</span>
              </button>
            </div>
          </div>
        </div>
    );
  };

  export default Question;