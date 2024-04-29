// @ts-expect-error TS(2307): Cannot find module '../img/threedots.png' or its c... Remove this comment to see the full error message
import threedots from "../img/threedots.png"
// @ts-expect-error TS(2307): Cannot find module '../img/like.png' or its corres... Remove this comment to see the full error message
import like from "../img/like.png"
// @ts-expect-error TS(2307): Cannot find module '../img/comment_icon.png' or it... Remove this comment to see the full error message
import comment_icon from "../img/comment_icon.png"
// @ts-expect-error TS(2307): Cannot find module '../img/edit.png' or its corres... Remove this comment to see the full error message
import edit from "../img/edit.png"
// @ts-expect-error TS(2307): Cannot find module '../components/QuestionFor.modu... Remove this comment to see the full error message
import styles from "../components/QuestionFor.module.css"
// @ts-expect-error TS(2307): Cannot find module '../img/minilike.png' or its co... Remove this comment to see the full error message
import minilike from "../img/minilike.png"
import { useLocation, useParams } from "react-router-dom"
// @ts-expect-error TS(6142): Module './FormatDate' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import FormatDate from "./FormatDate"

function QuestionFor(props: any){
  const timestamp = FormatDate(props.created_at)

  


  return(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_list}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_header}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.q_fronthead}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_mynick}>{props.nick}</span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_date}>{timestamp}</span>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.q_backhead}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_num}>{props.like_count}<div className={styles.q_like}><img src={minilike}/></div></span>
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_middle}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_icon}>Q. </span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_content}>{props.content}</span>
            </div>
            
            
          </div>
        </div>
    );
  };

  export default QuestionFor;