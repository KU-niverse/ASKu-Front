import React from "react";
// @ts-expect-error TS(2307): Cannot find module '../img/haho.png' or its corres... Remove this comment to see the full error message
import haho from "../img/haho.png";
// @ts-expect-error TS(2307): Cannot find module './Badge.module.css' or its cor... Remove this comment to see the full error message
import styles from "./Badge.module.css"
// @ts-expect-error TS(6142): Module './ThreedotsBadge' was resolved to 'C:/User... Remove this comment to see the full error message
import ThreedotsBadge from "./ThreedotsBadge"
// @ts-expect-error TS(6142): Module './FormatDate' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import FormatDate from "./FormatDate";
// @ts-expect-error TS(2307): Cannot find module '../img/lock.png' or its corres... Remove this comment to see the full error message
import lock from "../img/lock.png";

function Badge({
  myBadgeIds,
  id,
  name,
  image,
  description,
  event,
  count
}: any){

  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.b_thumb} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}> 
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={`${styles.b_content} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>        
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.b_thumb} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img src={myBadgeIds.has(id) ? image : lock} alt={name}/>          
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.b_right} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.b_listhead} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={`${styles.b_listfronthead} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>{myBadgeIds.has(id) ? name : "잠긴 뱃지입니다."}</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.b_listput} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <ThreedotsBadge badge_id={id}/> 
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.b_listmid} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={`${styles.midtext} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>{description}</p>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.b_listfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={`${styles.b_listfrontfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
              달성자 수 : {count}명
            </span>
            {/* <span className={`${styles.b_listlastfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
              획득일 : {formattedDate}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badge;