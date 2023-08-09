import haho from '../img/3d_haho.png'; 
import styles from "../components/SpinnerMypage.module.css"

function SpinnerMypage() {
    return(
        <div className={styles.loading_spinner_wrap}>
            <div className={styles.loader}>
                <img src={haho} alt="haho" className={styles.haho} />
            </div>
            <p className={styles.text1}>잠시만 기다려주세요...</p>
        </div>
    )
}

export default SpinnerMypage;