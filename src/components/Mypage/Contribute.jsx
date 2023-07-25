import styles from "./Contribute.module.css"

function Contribute(){
  return(
    <div className={styles.cb_list}>
    <div className={styles.cb_front}>
      <span className={styles.cb_index}>안녕하세요 제이름은 하찮은 호랑이입니다 많이 사랑해주세요</span>
    </div>
    <div className={styles.cb_back}> 
      <span className={styles.cb_num}>+10p</span>
      <span className={styles.cb_time}>2023.05.26 01:34:32</span>
    </div>
    </div>
  )
}

export default Contribute;