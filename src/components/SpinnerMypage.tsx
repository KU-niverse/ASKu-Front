// @ts-expect-error TS(2307): Cannot find module '../img/3d_haho.png' or its cor... Remove this comment to see the full error message
import haho from '../img/3d_haho.png'; 
// @ts-expect-error TS(2307): Cannot find module '../components/SpinnerMypage.mo... Remove this comment to see the full error message
import styles from "../components/SpinnerMypage.module.css"

function SpinnerMypage() {
    return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.loading_spinner_wrap}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.loader}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img src={haho} alt="haho" className={styles.haho} />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.text1}>잠시만 기다려주세요...</p>
        </div>
    )
}

export default SpinnerMypage;