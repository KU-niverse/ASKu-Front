// @ts-expect-error TS(2307): Cannot find module '../img/threedots.png' or its c... Remove this comment to see the full error message
import threedots from "../img/threedots.png"
// @ts-expect-error TS(2307): Cannot find module '../img/like.png' or its corres... Remove this comment to see the full error message
import like from "../img/like.png"
// @ts-expect-error TS(2307): Cannot find module '../img/edit.png' or its corres... Remove this comment to see the full error message
import edit from "../img/edit.png"
// @ts-expect-error TS(2307): Cannot find module '../components/CommentQna.modul... Remove this comment to see the full error message
import styles from "../components/CommentQna.module.css"
// @ts-expect-error TS(2307): Cannot find module '../img/link_icon.png' or its c... Remove this comment to see the full error message
import link_icon from "../img/link_icon.png"
// @ts-expect-error TS(6142): Module './FormatDate' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import FormatDate from "./FormatDate"
// @ts-expect-error TS(6142): Module './ThreedotsReport' was resolved to 'C:/Use... Remove this comment to see the full error message
import ThreedotsReport from "./ThreedotsReport"

function CommentQna({
  index_title,
  id,
  wiki_history_id,
  created_at,
  user_id,
  nickname,
  rep_badge,
  badge_image,
  title,
  content
}: any){
  const formattedDate = FormatDate(created_at);
  const type=1;
  return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_list}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.q_header}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.q_fronthead}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.q_box}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img className={styles.q_badge} src={badge_image} alt="badge"/>
              </div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_mynick}>{nickname}</span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_date}>{formattedDate}</span>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.q_backhead}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThreedotsReport type={type} target={wiki_history_id}/>
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_middle}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.q_content}>{content}</span>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_footer}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.q_frontfooter}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_index}>[{index_title}]</span>

            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.q_backfooter}>
              {/* <button className={styles.q_editbtn}>
                <img src={link_icon} alt="link_icon"/>
                <span className={styles.q_linkbtn}>문서 바로가기</span>
              </button> */}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_message}>위 질문을 기반으로 수정된 문서 내용입니다.</span>
            </div>
          </div>
        </div>
    );
  };

  export default CommentQna;