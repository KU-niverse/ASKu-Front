import styles from "./CommentList.module.css"
import comment_icon from "../../img/comment_icon.png"
import { useNavigate, useParams } from "react-router-dom";


function CommentList({id, subject, content, time, doc_title}){
  const maxLength = 80;

  // 글자 수가 maxLength를 넘으면 뒤에 "..."을 붙이고 아니면 그대로 반환
  const truncateContent = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const debateId = id;
  const title=doc_title;
  const nav = useNavigate();
  const linktoComment = ()=>{
  nav(`/debate/${title}/${subject}`,
  {state : {
    title: title,
    subject: subject,
    id: id}
  })
}

  return(
    <div className={styles.comment_list}>
      <div className={styles.comment_icon}>
        <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
      </div>
      <span onClick={linktoComment} className={styles.comment_content}>{truncateContent(content)}</span>
    </div>
  );
}

export default CommentList;