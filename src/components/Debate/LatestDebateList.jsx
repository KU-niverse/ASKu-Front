import styles from "./LatestDebateList.module.css"

function LatestDebateList(){
  return(
    <div className={styles.container}>
      <span className={styles.title}>
        학관학식과 애기능학식 비교에 대해 질문드립니다.
      </span>
      <span className={styles.date}>
        2023.05.26 01:34:32
      </span>
    </div>
  )
}

export default LatestDebateList;