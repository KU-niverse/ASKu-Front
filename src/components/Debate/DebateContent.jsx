import React from "react";
import styles from "./DebateContent.module.css"
import FormatDate from "../FormatDate";

function DebateContent({id, debate_id, user_id, content, created_at, is_bad, nick}){
const formattedDate=FormatDate(created_at)
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.num}>#{id}</span>
        <span className={styles.user}>{nick}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <div className={styles.content}>
        <span>{content}</span>
      </div>
    </div>
  )
}

export default DebateContent;