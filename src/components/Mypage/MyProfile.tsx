// @ts-expect-error TS(2307): Cannot find module './MyProfile.module.css' or its... Remove this comment to see the full error message
import styles from "./MyProfile.module.css"
// @ts-expect-error TS(2307): Cannot find module '../../img/haho.png' or its cor... Remove this comment to see the full error message
import haho from "../../img/haho.png"
import { useState } from "react";
// @ts-expect-error TS(6142): Module '../BadgeModal' was resolved to 'C:/Users/U... Remove this comment to see the full error message
import BadgeModal from "../BadgeModal";
// @ts-expect-error TS(6142): Module './NickEditModal' was resolved to 'C:/Users... Remove this comment to see the full error message
import NickEditModal from "./NickEditModal"
import { useNavigate } from "react-router-dom";

function MyProfile({
  nick,
  point,
  badge,
  percent,
  badgeimg
}: any) {
  // const [isBadgeModalVisible, setBadgeModalVisible] = useState(false);
  // const closeBadgeModal = () => {
  //     setBadgeModalVisible(false);
  // };
  const nav = useNavigate();
  const linktoBadge = () => {
    nav(`/mypage/mybadge`)
  }

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  const handleNickEdit = () => {
    setEditModalVisible(true);
  }

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  { isEditModalVisible && <NickEditModal isOpen={isEditModalVisible} onClose={() => setEditModalVisible(false)} /> }



  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.profileimg}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img className={styles.profileimg_content} onClick={linktoBadge} src={badgeimg} alt='haho' />
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.profilerow}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.rownick}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.rowtitle}>닉네임</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.text}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.point}>{nick}</span>
            {/* <span className={styles.editbtn} onClick={handleNickEdit}>수정</span> */}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {isEditModalVisible && <NickEditModal isOpen={isEditModalVisible} onClose={() => setEditModalVisible(false)} />}
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.rowbadge}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.rowtitle}>대표 뱃지</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.text} onClick={linktoBadge}>{badge}
            {/* <p className={`${styles.badgeedit}`}>뱃지 수정은 PC에서만 가능합니다.</p> */}

          </span>
          {/* <span className={styles.edit} onClick={setBadgeModalVisible(true)}>수정</span> */}
          {/* {isBadgeModalVisible && <BadgeModal isOpen={isBadgeModalVisible} onClose={() => setBadgeModalVisible(false)} />} */}
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.rowpoint}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.rowtitle}>기여도</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.text}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.point}>{point}p</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.rank}> &nbsp;&nbsp;&nbsp;상위 {percent}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile