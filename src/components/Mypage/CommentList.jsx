import styles from "./CommentList.module.css"
import { Link } from "react-router-dom"
import comment_icon from "../../img/comment_icon.png"

function CommentList(){
  return(
      <div className={styles.comment_list}>
        <div className={styles.comment_icon}>
          <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
        </div>
        <span className={styles.comment_content}>안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데, 촉촉한 초코칩 나라의 촉촉한 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 눈물을 흘리며 안 촉촉한 초코칩 나라로 돌아갔다.</span>
      </div>
  )
}

export default CommentList;