// @ts-expect-error TS(2307): Cannot find module './AlarmMobileModal.module.css'... Remove this comment to see the full error message
import styles from "./AlarmMobileModal.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from "../img/close_btn.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const patterns = {
  1: /\[즐겨찾기\] (.+?) 문서에 질문이 있습니다\./,
  2: /\[좋아요\] (.+?) 문서의 (.+?) 질문\((.+?)\)에 답변이 있습니다\./,
  3: /\[질문\] (.+?) 문서의 (.+?) 질문\((.+?)\)에 답변이 있습니다\./,
  4: /\[뱃지\] (.+?)를 획득했습니다\./,
  // 5: /\[관리자\] 100자 이상의 문서 수정 발생: (.+?) 문서의 (.+?)$/,
  // 6: /\[관리자\] 새로운 문서 생성: (.+?)$/,
  // 7: /\[관리자\] 새로운 신고 발생: (.+?)$/,
  // 8: /\[관리자\] 비정상\/반복적 글 수정 발생: (.+?) 문서의 (.+?)$/
};

const dummyData = [
  {
    id: 1,
    user_id: 1,
    type_id: 1,
    read_or_not: 0,
    message: "[즐겨찾기] 멀틱스 문서에 질문이 있습니다.",
    created_at: "2023-08-25T00:00:00.000Z",
    is_admin: 0,
  },
  {
    id: 2,
    user_id: 1,
    type_id: 2,
    read_or_not: 0,
    message: "[좋아요] 멀틱스 문서의 예시질문 질문(1)에 답변이 있습니다.",
    created_at: "2023-08-25T01:00:00.000Z",
    is_admin: 0,
  },
  {
    id: 3,
    user_id: 1,
    type_id: 3,
    read_or_not: 0,
    message: "[질문] 멀틱스 문서의 예시질문 질문(2)에 답변이 있습니다.",
    created_at: "2023-08-25T01:00:00.000Z",
    is_admin: 0,
  },
  {
    id: 4,
    user_id: 1,
    type_id: 4,
    read_or_not: 0,
    message: "[뱃지] 건국신화 뱃지를 획득했습니다.",
    created_at: "2023-08-25T01:00:00.000Z",
    is_admin: 0,
  },
];
function AlarmMobileModal({
  isOpen,
  handleMobileAlarmModal
}: any) {
  // useEffect(() => {
  //     if (isOpen) {
  //         // API 호출 대신 더미 데이터 사용
  //         setNotifications(dummyData);
  //     }
  // }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Axios를 사용하여 데이터 가져오기
      axios
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        .get(process.env.REACT_APP_HOST + "/notification/user", {
          withCredentials: true,
        })
        .then((response) => {
          setNotifications(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
          // 데이터를 불러오는 동안 오류가 발생하면 알림 데이터를 빈 배열로 설정
          setNotifications([]);
        });
    }
  }, [isOpen]);

  const removeIdFromMessage = (message: any) => {
    return message.replace(/\(\d+\)/g, "");
  };

  const extractInfo = (type_id: any, message: any) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const pattern = patterns[type_id];
    if (!pattern) {
      return null;
    }

    const match = message.match(pattern);
    if (!match) {
      return null;
    }

    let info = {};

    switch (type_id) {
      case 1:
        info = { result: match[1] };
        break;
      case 2:
        info = { title: match[1], result: match[2], id: match[3] };
        break;
      case 3:
        info = { title: match[1], result: match[2], id: match[3] };
        break;
      case 4:
        info = { result: match[1] };
        break;
      default:
        return null;
    }

    return info;
  };

  const extractInfoAndRefineMessage = (type_id: any, message: any) => {
    const info = extractInfo(type_id, message);
    if (!info) {
      return { info: null, refinedMessage: message };
    }

    let refinedMessage = removeIdFromMessage(message);
    return { info, refinedMessage };
  };

  const generateLink = (notification: any) => {
    const { message } = notification;
    const type_id = parseInt(
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      Object.keys(patterns).find((key) => {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const pattern = patterns[key];
        return message.match(pattern) !== null;
      })
    );

    const { info } = extractInfoAndRefineMessage(type_id, message);
    //TODO: 이 부분 링크 잘 동작하는지 확인
    const link = (() => {
      switch (type_id) {
        case 1:
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          return `/wiki/morequestion/${info.result}`;
        case 2:
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          return `/wiki/morequestion/${encodeURIComponent(info.title)}/${info.id}`;
        case 3:
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          return `/wiki/morequestion/${encodeURIComponent(info.title)}/${info.id}`;
        case 4:
          return "/mypage/mybadge";
        default:
          return "/";
      }
    })();

    return link;
  };

  const modalRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const handleOutsideClick = (event: any) => {
    // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleMobileAlarmModal();
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

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
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
                <span id={styles.alarmTitle}>내 알림</span>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img
                  src={closeBtn}
                  alt="close"
                  className={styles.close_btn}
                  onClick={handleMobileAlarmModal}
                />
              </div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.modal_content}>
                {notifications.length > 0
                  ? notifications.map((notification, index) => (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div key={index}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <Link
                        to={generateLink(notification)}
                        className={styles.alarmLink}
                      >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <p className={styles.alarmText}>
                          // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never'.
                          {notification.message}
                        </p>
                      </Link>
                      {index < notifications.length - 1 && (
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <hr
                          style={{
                            height: "0.3px",
                            opacity: "0.7",
                            backgroundColor: "#D5D5D5",
                            width: "100%",
                          }}
                        />
                      )}
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AlarmMobileModal;
