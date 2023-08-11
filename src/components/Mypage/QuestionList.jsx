import styles from "./QuestionList.module.css"

function QuestionList({ id, content, time, doc_title }) {
  const maxLength = 80;

  const truncateContent = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className={styles.ask_list}>
      <span className={styles.ask_icon}>Q.</span>
      <span className={styles.ask_content}>{truncateContent(content)}</span>
    </div>
  );
}

export default QuestionList;