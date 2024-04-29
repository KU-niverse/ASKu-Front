// import styles from './MobileChatBotPage.module.css';
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/ChatbotMobile' was resolved ... Remove this comment to see the full error message
import ChatbotMobile from "../components/ChatbotMobile";
import { useState, useEffect } from "react";
import axios from "axios";

const MobileChatBotPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
        { withCredentials: true }
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

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/mypage/info",
        {
          withCredentials: true,
        }
      );
      if (res.status === 201 && res.data.success === true) {
        // 사용자 정보에서 id를 가져옴
        setUserId(res.data);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    getUserInfo();
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ChatbotMobile
        userId={userId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default MobileChatBotPage;
