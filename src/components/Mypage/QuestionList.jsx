import styles from "./QuestionList.module.css"
import { useNavigate, useParams } from "react-router-dom";

function QuestionList({ id, content, time, doc_title }) {
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
      <span className={styles.ask_icon}>Q.</span>
      <span onClick={linktoQuestion} className={styles.ask_content}>{truncateContent(content)}</span>
    </div>
  );
}

export default QuestionList;