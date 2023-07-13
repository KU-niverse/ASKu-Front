import threedots from "../img/threedots.png"
import like from "../img/like.png"
import edit from "../img/edit.png"
import styles from "../components/CommentQna.module.css"

function CommentQna(){
  return(
        <div className={styles.q_list}>
          <div className={`${styles.q_header}`}>
            <div className={styles.q_fronthead}>
              <span className={styles.q_mynick}>하호후리스</span>
              <span className={styles.q_date}>2023.05.26 01:34:32</span>
            </div>
            <div className={styles.q_backhead}>
              <img src={threedots} alt='threedots'/>
            </div>
          </div>
          <div className={styles.q_middle}>
            <span className={styles.q_content}>안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데, 촉촉한 초코칩 나라의 촉촉한 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 눈물을 흘리며 안 촉촉한 초코칩 나라로 돌아갔다.</span>
          </div>
        </div>
    );
  };

  export default CommentQna;