// @ts-expect-error TS(2307): Cannot find module './Contribute.module.css' or it... Remove this comment to see the full error message
import styles from "./Contribute.module.css"

function Contribute({
  title,
  key,
  user_id,
  doc_id,
  text_pointer,
  version,
  summary,
  created_at,
  count,
  diff,
  is_bad,
  is_rollback,
  is_q_based
}: any){
  // 주어진 created_at 값을 그대로 사용하여 Date 객체 생성
  const utcDate = new Date(created_at);

  // UTC 시간에 9시간을 더한 후 시간을 표시
  utcDate.setHours(utcDate.getHours() + 9);
  const formattedDate = utcDate.toISOString().replace("T", " ").replace(".000Z", "").replace(/-/g, ".");

  const maxLength = 80;

  // 글자 수가 maxLength를 넘으면 뒤에 "..."을 붙이고 아니면 그대로 반환
  const truncateContent = (text: any) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const displayDiff = diff < 0 ? 0 : diff;


  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.cb_list}>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.cb_front}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.cb_index}>{title}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.cb_summary}> - {truncateContent(summary)}</span>
        </span>
      </div>
      
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.cb_back}> 
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className={styles.cb_num}>+{displayDiff}p</span>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className={styles.cb_time}>{formattedDate}</span>
    </div>
    </div>
  )
}

export default Contribute;