import styles from "./Contribute.module.css"

function Contribute({key, user_id, doc_id, text_pointer, version, summary, created_at, count, diff, is_bad, is_rollback, is_q_based}){
  // 주어진 created_at 값을 그대로 사용하여 Date 객체 생성
  const utcDate = new Date(created_at);

  // UTC 시간에 9시간을 더한 후 시간을 표시
  utcDate.setHours(utcDate.getHours() + 9);
  const formattedDate = utcDate.toISOString().replace("T", " ").replace(".000Z", "").replace(/-/g, ".");

  const displayDiff = diff < 0 ? 0 : diff;


  return(
    <div className={styles.cb_list}>
    <div className={styles.cb_front}>
      <span className={styles.cb_index}>{summary}</span>
    </div>
    <div className={styles.cb_back}> 
      <span className={styles.cb_num}>+{displayDiff}p</span>
      <span className={styles.cb_time}>{formattedDate}</span>
    </div>
    </div>
  )
}

export default Contribute;