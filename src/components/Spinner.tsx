// @ts-expect-error TS(2307): Cannot find module '../img/3d_haho.png' or its cor... Remove this comment to see the full error message
import haho from '../img/3d_haho.png'; 
// @ts-expect-error TS(2307): Cannot find module '../components/Spinner.module.c... Remove this comment to see the full error message
import styles from "../components/Spinner.module.css"

function Spinner() {
    return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.loading_spinner_wrap}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.loader}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img src={haho} alt="haho" className={styles.haho} />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.text1}>답변 생성중입니다!</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.text2}>서버 환경에 따라 약 2분 정도 소요될 수 있습니다</p>
        </div>
    )
}

export default Spinner;