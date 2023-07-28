import styles from "./CommentList.module.css"
import comment_icon from "../../img/comment_icon.png"

function CommentList({id, content, time, doc_title}){
  return(
      <div className={styles.comment_list}>
        <div className={styles.comment_icon}>
          <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
        </div>
        <span className={styles.comment_content}>{content}</span>
      </div>
  )
}

export default CommentList;