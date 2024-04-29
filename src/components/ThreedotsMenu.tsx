import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
// @ts-expect-error TS(2307): Cannot find module '../img/threedots.png' or its c... Remove this comment to see the full error message
import threedots from "../img/threedots.png";
// @ts-expect-error TS(2307): Cannot find module './ThreedotsMenu.module.css' or... Remove this comment to see the full error message
import styles from "./ThreedotsMenu.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module './EditModal' was resolved to 'C:/Users/Use... Remove this comment to see the full error message
import EditModal from "./EditModal";
// @ts-expect-error TS(6142): Module './ReportModal' was resolved to 'C:/Users/U... Remove this comment to see the full error message
import ReportModal from "./ReportModal";
import { useEffect } from "react";

function ThreedotsMenu({
  questionId,
  type
}: any) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const closeReportModal = () => {
    setReportModalVisible(false);
  };
  const [loggedIn, setLoggedIn] = useState(false);

  //login status 체크하기
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

  const onQuestionDelete = async () => {
    try {
      const response = await axios.delete(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/question/delete/${questionId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.status === 400) {
        alert("이미 답변 및 좋아요가 달렸거나, 다른 회원의 질문입니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  }; //질문 삭제하기

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
          target={questionId}
          type={type}
          isOpen={isReportModalVisible}
          onClose={() => setReportModalVisible(false)}
        />
      )}

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MenuItem
        className={styles.menuitem}
        value="수정하기"
        onClick={(e) => {
          checkLoginStatus();
          // Stop the `onItemClick` of root menu component from firing
          e.stopPropagation = true;
          // Keep the menu open after this menu item is clicked
          e.keepOpen = true;
          // @ts-expect-error TS(2339): Property 'preventDefault' does not exist on type '... Remove this comment to see the full error message
          e.preventDefault = true;
          setEditModalVisible(true);
        }}
      >
        수정하기
      </MenuItem>
      {isEditModalVisible && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <EditModal
          questionId={questionId}
          isOpen={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
        />
      )}

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MenuItem
        className={styles.menuitem}
        value="삭제하기"
        onClick={(e) => {
          checkLoginStatus();
          e.stopPropagation = true;
          e.keepOpen = true;
          // @ts-expect-error TS(2339): Property 'preventDefault' does not exist on type '... Remove this comment to see the full error message
          e.preventDefault = true;
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          onQuestionDelete(questionId);
        }}
      >
        삭제하기
      </MenuItem>
    </Menu>
  );
}

export default ThreedotsMenu;
