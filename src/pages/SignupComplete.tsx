import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module './SignupComplete.module.css' o... Remove this comment to see the full error message
import styles from "./SignupComplete.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
import logo from "../img/logo.png";
// @ts-expect-error TS(2307): Cannot find module '../img/Complete.png' or its co... Remove this comment to see the full error message
import complete from "../img/Complete.png";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 400) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        nav("/");
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      } else if (error.response.status === 500) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        nav("/");
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SpinnerMypage />
      </div>
    );
  }
  //

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.completed}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img className={`${styles.logo}`} src={logo} alt="" />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img className={`${styles.complete}`} src={complete} alt="" />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.complete_text}>
          ASKu 회원가입이 완료되었습니다!
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.complete_btn}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button className={styles.btn_login} onClick={goToLogin}>
            로그인
          </button>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button className={styles.btn_home} onClick={goToHome}>
            홈 화면으로 가기
          </button>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer />
    </div>
  );
};

export default SignupComplete;
