import React from "react";
import { Link } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module './Find.module.css' or its corr... Remove this comment to see the full error message
import styles from "./Find.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
import logo from "../img/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindId = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const nav = useNavigate();

  const findUserId = async () => {
    try {
      const response = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/findid",
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setId(response.data.login_id);
        nav("/findoutid", { state: response.data.login_id });
      } else {
        return alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      alert(error.response.data.message);
      nav("/");
    }
  };

  function handleOnClick() {
    if(email.trim() === ''){
      return alert("이메일을 입력해주세요");
    }
    findUserId();
    nav("/findoutid");
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.container}`}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <img className={`${styles.logo}`} src={logo} alt="" />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h2 className={styles.findTitle}>아이디 찾기</h2>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <form>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.findInputs}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.inputLabel}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>학교 이메일을 입력하세요</span>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button className={`${styles.findBtn}`} onClick={handleOnClick}>
          아이디 찾기
        </button>
      </form>
    </div>
  );
};

export default FindId;
