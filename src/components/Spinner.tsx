import ClipLoader from 'react-spinners/ClipLoader'
import haho from '../img/3d_haho.png'
import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinnerContainer}>
          <ClipLoader color={'#9F132E'} size={'50px'} className={styles.clipSpinner} />
          <img src={haho} alt={'haho'} className={styles.haho} />
        </div>
        <p className={styles.text1}>{'답변을 생성중입니다!'}</p>
      </div>
    </div>
  )
}

export default Spinner
