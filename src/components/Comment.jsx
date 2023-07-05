import threedots from "../img/threedots.png"
import like from "../img/like.png"
import edit from "../img/edit.png"
import styles from "../components/Comment.module.css"

function Comment(){
  return(
          <div className={styles.q_list}>
          <div className={styles.q_header}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>하호후리스</span>
              <span className={styles.q_date}>2023.05.26 01:34:32</span>
            </div>
            <div className={styles.q_backhead}>
              <img src={threedots} alt='threedots'/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
          <div className={styles.q_footer}>
            <div className={styles.q_frontfooter}>
              <div className={styles.q_like}>
                <img src={like} alt="like"/>
                <span className={styles.likeCount}>150</span>
              </div>
            </div>
            <div className={styles.q_backfooter}>
              <button className={styles.q_editbtn}>
                <span>Q 질문 보기</span>
              </button>
            </div>
          </div>
        </div>
    );
  };

  export default Comment;