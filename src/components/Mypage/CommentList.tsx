// @ts-expect-error TS(2307): Cannot find module './CommentList.module.css' or i... Remove this comment to see the full error message
import styles from "./CommentList.module.css"
// @ts-expect-error TS(2307): Cannot find module '../../img/comment_icon.png' or... Remove this comment to see the full error message
import comment_icon from "../../img/comment_icon.png"
import { useNavigate, useParams } from "react-router-dom";


function CommentList({
  id,
  subject,
  content,
  time,
  doc_title
}: any) {
  const maxLength = 70;

  // 글자 수가 maxLength를 넘으면 뒤에 "..."을 붙이고 아니면 그대로 반환
  const truncateContent = (text: any) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const debateId = id;
  const title = doc_title;
  const nav = useNavigate();
  const linktoComment = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/debate/${encodedTitle}/${subject}`,
      {
        state: {
          title: title,
          subject: subject,
          id: debateId
        }
      })
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.comment_list}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.comment_icon}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img className={styles.comment_png} src={comment_icon} alt='comment_icon' />
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span onClick={linktoComment} className={styles.comment_content}>{truncateContent(content)}</span>
    </div>
  );
}

export default CommentList;