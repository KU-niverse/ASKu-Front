// @ts-expect-error TS(2307): Cannot find module './AlarmModal.module.css' or it... Remove this comment to see the full error message
import styles from "./AlarmModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from "../img/close_btn.png";
import { Link } from "react-router-dom";

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

const AlarmModal = ({
  isAlarmVisible,
  handleAlarm
}: any) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + "/user/auth/issignedin",
          {
            withCredentials: true,
          }
        );
        if (res.status === 201 && res.data.success === true) {
          setIsLoggedIn(true);
        } else if (res.status === 401) {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    // 화면 크기 변화 이벤트 리스너를 추가
    window.addEventListener("resize", handleWindowResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // 창 크기 변화 이벤트 핸들러
  const handleWindowResize = () => {
    if (isAlarmVisible) {
      handleAlarm();
    } else {
      return;
    }
  };

  // useEffect(() => {
  //     if (isAlarmVisible) {
  //         // API 호출 대신 더미 데이터 사용
  //         setNotifications(dummyData);
  //     }
  // }, [isAlarmVisible]);

  useEffect(() => {
    if (isAlarmVisible) {
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
  }, [isAlarmVisible]);

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
    //TODO: 이부분 링크 잘 동작하는지 확인
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

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {isAlarmVisible && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.alarmContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.alarmTitleWrap}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span id={styles.alarmTitle}>내 알림</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img
              src={closeBtn}
              alt="close"
              className={styles.close_btn}
              onClick={handleAlarm}
            />
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.alarmContent}>
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
                    <p className={styles.alarmText}>{notification.message}</p>
                  </Link>
                  {index < notifications.length - 1 && (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <hr
                      style={{
                        height: "0.3px",
                        opacity: "0.7",
                        backgroundColor: "#D5D5D5",
                        width: "100%",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </div>
              ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default AlarmModal;
