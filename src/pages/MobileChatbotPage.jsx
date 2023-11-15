// import styles from './MobileChatBotPage.module.css';
import Header from "../components/Header";
import ChatbotMobile from "../components/ChatbotMobile";
import { useState, useEffect } from "react";
import axios from "axios";

const MobileChatBotPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
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
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ChatbotMobile
        userId={userId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default MobileChatBotPage;
