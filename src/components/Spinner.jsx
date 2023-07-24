import haho from '../img/3d_haho.png'; 
import styles from "../components/Spinner.module.css"

function Spinner() {
    return(
        <div className={styles.loading_spinner_wrap}>
            <div className={styles.loader}>
                <img src={haho} alt="haho" className={styles.haho} />
            </div>
        </div>
    )
}

export default Spinner;