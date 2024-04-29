import React from "react";
// @ts-expect-error TS(2307): Cannot find module './DebateContent.module.css' or... Remove this comment to see the full error message
import styles from "./DebateContent.module.css"
// @ts-expect-error TS(6142): Module '../FormatDate' was resolved to 'C:/Users/U... Remove this comment to see the full error message
import FormatDate from "../FormatDate";
// @ts-expect-error TS(6142): Module '../ThreedotsReport' was resolved to 'C:/Us... Remove this comment to see the full error message
import ThreedotsReport from "../ThreedotsReport";

function DebateContent({
  badge_image,
  key,
  r_id,
  id,
  debate_id,
  user_id,
  content,
  created_at,
  is_bad,
  nick
}: any){
const formattedDate=FormatDate(created_at)
const type=4
  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.frontheader}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.num}>#{id}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_box}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img className={styles.q_badge} src={badge_image} alt="badge"/>
          </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.user}>{nick}</span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.date}>{formattedDate}</span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.backheader}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ThreedotsReport type={type} target={r_id}/>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.content}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.debate_content}>{content}</span>
      </div>
    </div>
  )
}

export default DebateContent;