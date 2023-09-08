import styles from "./LatestDebateList.module.css"
import FormatDate from "../FormatDate";
import { useNavigate } from "react-router-dom";

function LatestDebateList({id, doc_id, user_id, subject, created_at, recent_edited_at, done_or_not, done_at, is_bad, title}){
const formattedDate=FormatDate(recent_edited_at)
const nav=useNavigate();
const linktoDebateRoom=()=>{
  window.history.replaceState(null, '', `/latestdebate`);  
  nav(`/debate/${title}/${subject}`, {state : {
    title: title,
    subject: subject,
    id: id}
  });
}
  return(
    <div className={styles.container}>
      <span onClick={linktoDebateRoom} className={styles.title}>
        {subject} ({title})
      </span>
      <span className={styles.date}>
        {formattedDate}
      </span>
    </div>
  )
}

export default LatestDebateList;