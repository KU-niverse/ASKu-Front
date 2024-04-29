// @ts-expect-error TS(2307): Cannot find module '../img/resultcomment.svg' or i... Remove this comment to see the full error message
import comment_icon from "../img/resultcomment.svg"
// @ts-expect-error TS(2307): Cannot find module '../img/resultedit.svg' or its ... Remove this comment to see the full error message
import edit from "../img/resultedit.svg"
// @ts-expect-error TS(2307): Cannot find module '../components/ResultQues.modul... Remove this comment to see the full error message
import styles from "../components/ResultQues.module.css"
// @ts-expect-error TS(6142): Module './FormatDate' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import FormatDate from "./FormatDate"
// @ts-expect-error TS(6142): Module './ThreedotsMenu' was resolved to 'C:/Users... Remove this comment to see the full error message
import ThreedotsMenu from "./ThreedotsMenu"
// @ts-expect-error TS(6142): Module './LikeorNot' was resolved to 'C:/Users/Use... Remove this comment to see the full error message
import LikeorNot from "./LikeorNot"
import { useNavigate } from "react-router-dom"


function Question({
  title,
  id,
  doc_id,
  user_id,
  index_title,
  content,
  created_at,
  answer_count,
  is_bad,
  nick,
  like_count
}: any) {
  const formattedDate = FormatDate(created_at);

  const nav = useNavigate();
  const linktoQuestionEdit = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/question/edit/${encodedTitle}`, {
      state: {
        qid: id,
        user_id: user_id,
        content: content,
        created_at: created_at,
        like_count: like_count,
        nick: nick
      }
    });
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
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_backhead}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_middle}
        onClick={() => {
          const encodedTitle = encodeURIComponent(title);
          nav(`/wiki/morequestion/${encodedTitle}/${id}`, {
            state: {
              question_id: id,
              user_id: user_id,
              content: content,
              created_at: created_at,
              like_count: like_count,
              nick: nick,
              index_title: index_title,
              answer_count: answer_count,
              title: title,
            },
          })
        }}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.q_icon}>Q. </span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.q_content}>{content}</span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_footer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_frontfooter}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_like}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <LikeorNot questionId={id} like_count={like_count} nick={nick} />
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_comment}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={comment_icon} alt="comment" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.commentCount}>{answer_count}</span>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_backfooter}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button onClick={linktoQuestionEdit} className={styles.q_editbtn}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={edit} alt="edit" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>질문을 기반으로 문서 수정하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;