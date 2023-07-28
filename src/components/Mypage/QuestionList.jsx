import styles from "./QuestionList.module.css"

function Question({id, content, time, doc_title}){
  return(
    <div className={styles.ask_list}>
      <span className={styles.ask_icon}>Q.</span>
      <span className={styles.ask_content}>{content}</span>
    </div>
  )
}

export default Question;