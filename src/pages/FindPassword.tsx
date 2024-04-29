import React from "react";
import { Link } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module './Find.module.css' or its corr... Remove this comment to see the full error message
import styles from "./Find.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
import logo from "../img/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindPassword = () => {
  const [id, setId] = useState("");
  const nav = useNavigate();
  const [clicked, setClicked] = useState(false);

  const findUserPw = async (e: any) => {
    e.preventDefault();
    setClicked(true);

    try {
      const response = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/findpw",
        {
          login_id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        alert(response.data.message);
        nav("/");
      } else {
        return alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.container}`}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <img className={`${styles.logo}`} src={logo} alt="" />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h2 className={styles.findTitle}>비밀번호 찾기</h2>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <form onSubmit={findUserPw}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.findInputs}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.inputLabel}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>아이디를 입력하세요</span>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input
              required
              type="text"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className={clicked ? `${styles.hidden}` : `${styles.findBtn}`}
          type="submit"
          value="비밀번호 재설정 메일 받기"
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={clicked ? `${styles.hidden}` : `${styles.findAlert}`}>
          비밀번호 재설정 페이지를 아이디에 해당하는 이메일로 전송합니다.{" "}
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={clicked ? `${styles.findBtnTwo}` : `${styles.hidden}`}>
          {" "}
          비밀번호 재설정
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          className={clicked ? `${styles.findAlertTwo}` : `${styles.hidden}`}
        >
          처리중입니다. 잠시만 기다려주세요 5-10초 소요됩니다.{" "}
        </div>
      </form>
    </div>
  );
};

export default FindPassword;
