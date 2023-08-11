import styles from "./CommentList.module.css"
import comment_icon from "../../img/comment_icon.png"

function CommentList({id, content, time, doc_title}){
  const maxLength = 80;

  // 글자 수가 maxLength를 넘으면 뒤에 "..."을 붙이고 아니면 그대로 반환
  const truncateContent = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return(
    <div className={styles.comment_list}>
      <div className={styles.comment_icon}>
        <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
      </div>
      <span className={styles.comment_content}>{truncateContent(content)}</span>
    </div>
  );
}

export default CommentList;