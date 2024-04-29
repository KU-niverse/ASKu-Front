import styles from "./DebateList.module.css"
import FormatDate from "../FormatDate";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DebateList({
  title,
  id,
  doc_id,
  user_id,
  subject,
  created_at,
  recent_edited_at,
  done_or_not,
  done_at,
  is_bad
}: any) {
  const formattedDate = FormatDate(recent_edited_at)
  const nav = useNavigate();
  const linktoDebateRoom = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/debate/${encodedTitle}/${subject}`, {
      state: {
        title: title,
        subject: subject,
        id: id
      }
    });


  }


  return (
        <div className={styles.container}>

            <span onClick={linktoDebateRoom} className={styles.title}>
        {subject}
      </span>

            <span className={styles.date}>
        {formattedDate}
      </span>
    </div>
  )
}

export default DebateList;