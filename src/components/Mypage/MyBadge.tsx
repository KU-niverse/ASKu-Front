// @ts-expect-error TS(2307): Cannot find module '../../img/haho.png' or its cor... Remove this comment to see the full error message
import haho from "../../img/haho.png"
// @ts-expect-error TS(2307): Cannot find module './MyBadge.module.css' or its c... Remove this comment to see the full error message
import styles from "./MyBadge.module.css"

function MyBadge(key: any, id: any, user_id: any, badge_id: any, time: any){
  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.badgegrid}>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <img src={haho} alt='haho'/>
    </div>
  )
}

export default MyBadge