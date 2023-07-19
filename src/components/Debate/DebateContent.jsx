import React from "react";
import styles from "./DebateContent.module.css"

function DebateContent(){
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.num}>#1</span>
        <span className={styles.user}>qwerty</span>
        <span className={styles.date}>2023.05.26 01:34:32</span>
      </div>
      <div className={styles.content}>
        <span>이런 서술은 지워야 하지 않을까요? 문서와 맞지 않는 것 같습니다</span>
      </div>
    </div>
  )
}

export default DebateContent;