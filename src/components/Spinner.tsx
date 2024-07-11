import haho from '../img/3d_haho.png'
import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div className={styles.loading_spinner_wrap}>
      <div className={styles.loader}>
        <img src={haho} alt={'haho'} className={styles.haho} />
      </div>
      <p className={styles.text1}>{'답변 생성중입니다!'}</p>
      <p className={styles.text2}>{'서버 환경에 따라 약 2분 정도 소요될 수 있습니다'}</p>
    </div>
  )
}

export default Spinner
