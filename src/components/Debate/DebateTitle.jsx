import styles from "./DebateTitle.module.css"
import debate from "../../img/debate.png"

function DebateTitle({title, subject}){
  return(
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.headline}>
          {title}
        </span>
        <span className={styles.headline2}> 
          &nbsp;&nbsp;문서 기반 토론
        </span>
      </div>
      <div className={styles.content}>
        <img src={debate} alt="debate"/>
        <span className={styles.part}>
          &nbsp;&nbsp;{subject}
        </span>
        <span className={styles.part2}>
          &nbsp;에 대해서
        </span>
      </div>
    </div>
   
  )
}

export default DebateTitle;