import styles from "./DebateList.module.css"

function DebateList(){
  return(
    <div className={styles.container}>
      <span className={styles.title}>
        입실렌티 예산 관련해서 질문드립니다.
      </span>
      <span className={styles.date}>
        2023.05.26 01:34:32
      </span>
    </div>
  )
}

export default DebateList;