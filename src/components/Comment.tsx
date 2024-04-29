// @ts-expect-error TS(2307): Cannot find module '../img/threedots.png' or its c... Remove this comment to see the full error message
import threedots from "../img/threedots.png"
// @ts-expect-error TS(2307): Cannot find module '../img/like.png' or its corres... Remove this comment to see the full error message
import like from "../img/like.png"
// @ts-expect-error TS(2307): Cannot find module '../img/edit.png' or its corres... Remove this comment to see the full error message
import edit from "../img/edit.png"
// @ts-expect-error TS(2307): Cannot find module '../components/Comment.module.c... Remove this comment to see the full error message
import styles from "../components/Comment.module.css"
// @ts-expect-error TS(6142): Module './ThreedotsReport' was resolved to 'C:/Use... Remove this comment to see the full error message
import ThreedotsReport from "./ThreedotsReport"
// @ts-expect-error TS(6142): Module './FormatDate' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import FormatDate from "./FormatDate"
import { useNavigate } from "react-router-dom"

function Comment({
  id,
  subject,
  content,
  created_at,
  is_bad,
  docsname,
  nick
}: any) {
  const formattedDate = FormatDate(created_at);
  const nav = useNavigate();
  const debateId = id;
  const title = docsname;
  const linktoComment = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/debate/${encodedTitle}/${subject}`, {
      state: {
        title: title,
        subject: subject,
        id: debateId
      }
    })
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.q_list}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_fronthead}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.q_mynick}>{nick}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_backhead}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ThreedotsReport id={id} />
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_middle}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span onClick={linktoComment} className={styles.q_content}>{content}</span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_footer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_frontfooter}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_like}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span onClick={linktoComment} className={styles.likeCount}>{subject} 토론방</span>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_backfooter}>
          {/* <button className={styles.q_editbtn}>
                <span>Q 질문 보기</span>
              </button> */}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span>{docsname}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;