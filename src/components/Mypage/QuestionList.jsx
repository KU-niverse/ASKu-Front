import styles from "./QuestionList.module.css"

function Question(){
  return(
    <div className={styles.ask_list}>
      <span className={styles.ask_icon}>Q. </span>
      <span className={styles.ask_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
    </div>
  )
}

export default Question;