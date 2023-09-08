import styles from "./QuestionList.module.css"
import { useNavigate, useParams } from "react-router-dom";
import comment_icon from "../../img/comment_icon.png"
import nocomment_icon from "../../img/nocomment_icon.png"

function QuestionList({ id, doc_id, user_id, index_title, content, time, is_bad, nickname, like_count, doc_title, answer_count }) {
  const maxLength = 80;
  const title=doc_title;
  const truncateContent = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const nav = useNavigate();
  const linktoQuestion = ()=>{
  nav(`/wiki/morequestion/${title}`)
} 
  const linktoAnswer = () => {
    nav(`/wiki/morequestion/${title}/${id}`, {state:{
      question_id : id,
      user_id: user_id,
      content: content,
      created_at: time,
      like_count: like_count,
      nick: nickname,
      index_title:index_title,
      answer_count: answer_count,
      title : doc_title
    }})
  }

  return (
    <div className={styles.ask_list}>
      <div className={styles.ask_front}>
        <span className={styles.ask_icon}>Q.</span>
        <span onClick={linktoAnswer} className={styles.ask_content}>{truncateContent(content)}</span>
      </div>
      <div onClick={linktoAnswer} className={styles.comment_icon}>
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