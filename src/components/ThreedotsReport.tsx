import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
// @ts-expect-error TS(2307): Cannot find module '../img/threedots.png' or its c... Remove this comment to see the full error message
import threedots from "../img/threedots.png";
// @ts-expect-error TS(2307): Cannot find module './ThreedotsReport.module.css' ... Remove this comment to see the full error message
import styles from "./ThreedotsReport.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module './ReportModal' was resolved to 'C:/Users/U... Remove this comment to see the full error message
import ReportModal from "./ReportModal";
import { useEffect } from "react";

function ThreedotsReport({
  type,
  target
}: any) {
  const nav = useNavigate();

  const [isReportModalVisible, setReportModalVisible] = useState(false);

  const closeReportModal = () => {
    setReportModalVisible(false);
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  

 //로그인 체크 후 우회
  // const checkLoginStatus = async () => {
  //   try {
  //     const res = await axios.get(
  //       process.env.REACT_APP_HOST+"/user/auth/issignedin",
  //       { withCredentials: true }
  //     );
  //     if (res.status === 201 && res.data.success === true) {
  //       setLoggedIn(true);
  //     } else if (res.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return Navigate(from);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoggedIn(false);
  //     if (error.response.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return Navigate(from);
  //     }else{
  //       alert("에러가 발생하였습니다");
  //       return Navigate(from);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  //

  //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoggedIn(false);
      }else{
        alert("에러가 발생하였습니다");
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);


  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Menu
      menuButton={
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MenuButton className={styles.menubtn}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={threedots} alt="Menu" />
        </MenuButton>
      }
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MenuItem
        className={styles.menuitem}
        value="신고하기"
        onClick={(e) => {
          checkLoginStatus();
          e.stopPropagation = true;
          e.keepOpen = true;
          // @ts-expect-error TS(2339): Property 'preventDefault' does not exist on type '... Remove this comment to see the full error message
          e.preventDefault = true;
          setReportModalVisible(true);
        }}
      >
        신고하기
      </MenuItem>
      {isReportModalVisible && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ReportModal
          type={type}
          target={target}
          isOpen={isReportModalVisible}
          onClose={() => setReportModalVisible(false)}
        />
      )}
    </Menu>
  );
}

export default ThreedotsReport;
