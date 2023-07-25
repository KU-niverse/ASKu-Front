import styles from "./MyInfo.module.css"

function MyInfo(){
  return(
    <div className={styles.inforow}>
      <div className={styles.rowname}>
          <span className={styles.rowtitle}>이름</span>
          <span className={styles.text}> 하호</span>
      </div>
      <div className={styles.rowemail}>
          <span className={styles.rowtitle}>이메일</span>
          <span className={styles.text}>asku1234@gmail.com</span>
      </div>
      <div className={styles.rowid}>
          <span className={styles.rowtitle}>학번</span>
          <span className={styles.text}>2019140004</span>
      </div>
    </div>
  )
}

export default MyInfo