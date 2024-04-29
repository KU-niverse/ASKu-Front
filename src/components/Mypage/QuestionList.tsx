// @ts-expect-error TS(2307): Cannot find module './QuestionList.module.css' or ... Remove this comment to see the full error message
import styles from "./QuestionList.module.css"
import { useNavigate, useParams } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module '../../img/comment_icon.png' or... Remove this comment to see the full error message
import comment_icon from "../../img/comment_icon.png"
// @ts-expect-error TS(2307): Cannot find module '../../img/nocomment_icon.png' ... Remove this comment to see the full error message
import nocomment_icon from "../../img/nocomment_icon.png"

function QuestionList({
  id,
  doc_id,
  user_id,
  index_title,
  content,
  time,
  is_bad,
  nickname,
  like_count,
  doc_title,
  answer_count
}: any) {
  const maxLength = 80;
  const title = doc_title;
  const truncateContent = (text: any) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const nav = useNavigate();
  const linktoQuestion = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/wiki/morequestion/${encodedTitle}`)
  }
  const linktoAnswer = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/wiki/morequestion/${encodedTitle}/${id}`, {
      state: {
        question_id: id,
        user_id: user_id,
        content: content,
        created_at: time,
        like_count: like_count,
        nick: nickname,
        index_title: index_title,
        answer_count: answer_count,
        title: doc_title
      }
    })
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.ask_list}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.ask_front}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.ask_icon}>Q.</span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span onClick={linktoAnswer} className={styles.ask_content}>{truncateContent(content)}</span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div onClick={linktoAnswer} className={styles.comment_icon}>
        {answer_count === 0 ? ( // answer_count가 0일 때
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img
              className={styles.comment_png}
              src={nocomment_icon} // nocomment_icon을 보여줌
              alt="nocomment_icon"
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        ) : (
          // answer_count가 0이 아닐 때
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img
              className={styles.comment_png}
              src={comment_icon}
              alt="comment_icon"
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        )}      </div>
    </div>
  );
}

export default QuestionList;