import styles from "./QuestionList.module.css"
import { useNavigate, useParams } from "react-router-dom";
import comment_icon from "../../img/comment_icon.png"
import nocomment_icon from "../../img/nocomment_icon.png"

function QuestionList({ id, content, time, doc_title, answer_count }) {
  const maxLength = 80;
  const title=doc_title;
  const truncateContent = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const nav = useNavigate();
  const linktoQuestion = ()=>{
  nav(`/wiki/morequestion/${title}`)
} 

  return (
    <div className={styles.ask_list}>
      <div className={styles.ask_front}>
        <span className={styles.ask_icon}>Q.</span>
        <span onClick={linktoQuestion} className={styles.ask_content}>{truncateContent(content)}</span>
      </div>
      <div className={styles.comment_icon}>
      {answer_count === 0 ? ( // answer_count가 0일 때
          <>  
            <img
              className={styles.comment_png}
              src={nocomment_icon} // nocomment_icon을 보여줌
              alt="nocomment_icon"
            />
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        ) : (
          // answer_count가 0이 아닐 때
          <>
            <img
              className={styles.comment_png}
              src={comment_icon}
              alt="comment_icon"
            />
            <span className={styles.comment_num}>{answer_count}</span>
          </>
        )}      </div>
    </div>
  );
}

export default QuestionList;