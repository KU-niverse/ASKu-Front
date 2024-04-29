// @ts-expect-error TS(2307): Cannot find module './BadgeModal.module.css' or it... Remove this comment to see the full error message
import styles from "./BadgeModal.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from "../img/close_btn.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BadgeModal({
  isOpen,
  onClose
}: any) {
  const modalRef = useRef(null);
  const handleOutsideClick = (event: any) => {
    // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const [myBadge, setMyBadge] = useState([]);
  useEffect(() => {
    const takeMyBadge = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST+`/user/mypage/badgehistory`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setMyBadge(res.data);
        }
      } catch (error) {
        console.log(error);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response && error.response.status === 401) {
          alert("로그인이 필요합니다.");
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    };
    takeMyBadge();
  }, []);

  const handleRepBadge = async () => {
    try {
      const response = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/user/mypage/setrepbadge`,
        // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
        { rep_badge_id: myBadge.data.badge_id },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("대표뱃지가 변경되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 400) {
        alert("잘못된 접근입니다. 대표 배지 변경에 실패하였습니다.");
        window.location.reload();
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  }; //대표뱃지 설정하기

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    {isOpen && (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.modal_overlay}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div ref={modalRef} className={styles.modal_wrapper}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.modal_inside}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.modal_close}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img
                src={closeBtn}
                alt="close"
                className={styles.close_btn}
                onClick={onClose}
              />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.modal_content}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className={styles.modal_text}>대표 뱃지 설정하기</p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.badgegrid}>
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                {myBadge && myBadge.data && myBadge.data.length === 0 ? (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p>아직 획득한 뱃지가 없습니다.</p>
                ) : (
                  myBadge &&
                  // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                  myBadge.data &&
                  // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                  myBadge.data
                    .slice(0, 12)
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    .map((badge: any) => <img
                    key={badge.id}
                    src={badge.image}
                    alt={badge.name}
                  />)
                )}
              </div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button className={styles.q_csubmit} onClick={handleRepBadge}>
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>;
}

export default BadgeModal;
