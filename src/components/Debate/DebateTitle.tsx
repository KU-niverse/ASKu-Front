// @ts-expect-error TS(2307): Cannot find module './DebateTitle.module.css' or i... Remove this comment to see the full error message
import styles from "./DebateTitle.module.css"
// @ts-expect-error TS(2307): Cannot find module '../../img/debate.png' or its c... Remove this comment to see the full error message
import debate from "../../img/debate.png"

function DebateTitle({
  title,
  subject
}: any){
  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.title}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.headline}>
          {title}
        </span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.headline2}> 
          &nbsp;&nbsp;문서 기반 토론
        </span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.content}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img src={debate} alt="debate"/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.part}>
          &nbsp;&nbsp;{subject}
        </span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.part2}>
          &nbsp;에 대해서
        </span>
      </div>
    </div>
   
  )
}

export default DebateTitle;