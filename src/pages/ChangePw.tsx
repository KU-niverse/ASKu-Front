import React from "react";
import { Link, useParams } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module './Find.module.css' or its corr... Remove this comment to see the full error message
import styles from "./Find.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
import logo from "../img/logo.png";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import axios from "axios";

const ChangePw = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [isPwValid, setisPwValid] = useState(true);
  const [isPwSame, setisPwSame] = useState(true);

  const nav = useNavigate();

  function onChangePW(e: any) {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    // if (!passwordRegex.test(passwordCurrent)) {
    //     setisPwValid(false);
    // } else {
    //     setisPwValid(true);
    // }
  }
  function onChangeNewPW(e: any) {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setNewPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setisPwValid(false);
    } else {
      setisPwValid(true);
    }
  }
  function onChangeCheckPW(e: any) {
    const checkPWCurrent = e.target.value;
    setCheckPw(checkPWCurrent);

    if (checkPWCurrent !== newPassword) {
      setisPwSame(false);
    } else {
      setisPwSame(true);
    }
  }

  const changeUserPw = async (e: any) => {
    e.preventDefault();

    if (newPassword.trim() === "") {
      return alert("새 비밀번호를 입력해주세요");
    }
    if (password.trim() === "") {
      return alert("기존 비밀번호를 입력해주세요");
    }

    if (isPwValid === false) {
      return alert("비밀번호 형식이 올바르지 않습니다");
    } else if (isPwSame === false) {
      return alert("비밀번호가 일치하지 않습니다");
    }

    try {
      const response = await axios.put(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/changepw",
        {
          password: password,
          new_password: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        alert(response.data.message);
        nav("/mypage");
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
      <h2 className={styles.findTitle}>비밀번호 재설정</h2>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <form onSubmit={changeUserPw}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.findInputs}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.inputLabel}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.inputHead}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span>현재 비밀번호</span>
              {/* <span className={isPwValid === false? `${styles.pwChangeAlert}`: `${styles.pwChangeDone}`}><FiAlertCircle size='12'/>&nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요</span> */}
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input
              required
              type="password"
              placeholder="8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요"
              name="password"
              value={password}
              onChange={onChangePW}
              // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
              maxLength="20"
            />
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.findInputs}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.inputLabel}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.inputHead}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span>새 비밀번호</span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span
                className={
                  isPwValid === false
                    ? `${styles.pwChangeAlert}`
                    : `${styles.pwChangeDone}`
                }
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <FiAlertCircle size="12" />
                &nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요
              </span>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input
              required
              type="password"
              placeholder="8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요"
              name="newpassword"
              value={newPassword}
              onChange={onChangeNewPW}
              // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
              maxLength="20"
            />
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={`${styles.findInputs}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.inputLabel}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.inputHead}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span>새 비밀번호 재확인</span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span
                className={
                  isPwSame === false
                    ? `${styles.pwChangeAlert}`
                    : `${styles.pwChangeDone}`
                }
                onChange={onChangeCheckPW}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <FiAlertTriangle size="12" />
                &nbsp;비밀번호가 일치하지 않습니다
              </span>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input
              required
              type="password"
              placeholder="비밀번호를 재입력하세요"
              name="checkPw"
              value={checkPw}
              onChange={onChangeCheckPW}
              // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
              maxLength="20"
            />
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          type="submit"
          className={`${styles.findBtn}`}
          value="비밀번호 변경"
        />
      </form>
    </div>
  );
};

export default ChangePw;
