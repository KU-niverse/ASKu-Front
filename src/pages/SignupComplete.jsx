import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./SignupComplete.module.css";
import logo from "../img/logo.png";
import complete from "../img/Complete.png";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import SpinnerMypage from "../components/SpinnerMypage";

const SignupComplete = () => {
  const { auth } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  function goToLogin() {
    nav("/signin");
  }
  function goToHome() {
    nav("/");
  }

  const authPost = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST+"/user/auth/signup/emailcheck",
        {
          auth_uuid: auth,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        nav("/");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        alert(error.response.data.message);
        nav("/");
      } else if (error.response.status === 500) {
        alert(error.response.data.message);
        nav("/");
      } else {
        alert(error.response.data.message);
        nav("/");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    authPost();
  }, []);

  if (loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    );
  }
  //

  return (
    <div className={styles.container}>
      <div className={styles.completed}>
        <img className={`${styles.logo}`} src={logo} alt="" />
        <img className={`${styles.complete}`} src={complete} alt="" />
        <div className={styles.complete_text}>
          ASKu 회원가입이 완료되었습니다!
        </div>
        <div className={styles.complete_btn}>
          <button className={styles.btn_login} onClick={goToLogin}>
            로그인
          </button>
          <button className={styles.btn_home} onClick={goToHome}>
            홈 화면으로 가기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupComplete;
