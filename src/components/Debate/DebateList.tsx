// @ts-expect-error TS(2307): Cannot find module './DebateList.module.css' or it... Remove this comment to see the full error message
import styles from "./DebateList.module.css"
// @ts-expect-error TS(6142): Module '../FormatDate' was resolved to 'C:/Users/U... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span onClick={linktoDebateRoom} className={styles.title}>
        {subject}
      </span>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className={styles.date}>
        {formattedDate}
      </span>
    </div>
  )
}

export default DebateList;