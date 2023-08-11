import haho from "../../img/haho.png"
import styles from "./MyBadge.module.css"

function MyBadge(key, id, user_id, badge_id, time){
  return(
    <div className={styles.badgegrid}>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    <img src={haho} alt='haho'/>
    </div>
  )
}

export default MyBadge