import styles from "./MyProfile.module.css"
import haho from "../../img/haho.png"


function MyProfile({nick, point, badge, percent, badgeimg}){
  return(
    <div>
      <div className={styles.profileimg}>
        <img className={styles.profileimg_content} src={badgeimg} alt='haho'/>
      </div>
      <div className={styles.profilerow}>
        <div className={styles.rownick}>
            <span className={styles.rowtitle}>닉네임</span>
            <span className={styles.text}>{nick}</span>
        </div>
        <div className={styles.rowbadge}>
          <span className={styles.rowtitle}>대표 뱃지</span>
          <span className={styles.text}>{badge}</span>
        </div>
        <div className={styles.rowpoint}>
          <span className={styles.rowtitle}>포인트</span>
          <div className={styles.text}>
            <span className={styles.point}>{point}p</span> 
            <span className={styles.rank}> &nbsp;&nbsp;&nbsp;상위 {percent}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile