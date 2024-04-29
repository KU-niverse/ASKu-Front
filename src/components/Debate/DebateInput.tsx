// @ts-expect-error TS(2307): Cannot find module './DebateInput.module.css' or i... Remove this comment to see the full error message
import styles from "./DebateInput.module.css";
// @ts-expect-error TS(2307): Cannot find module '../../img/submit.png' or its c... Remove this comment to see the full error message
import submit from "../../img/submit.png";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function DebateInput({
  onDebateSubmit,
  title,
  debateId
}: any) {
  const [debateContent, setDebateContent] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || '/';

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + "/user/auth/issignedin",
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
      } else {
        alert("에러가 발생하였습니다");
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    // 줄바꿈을 포함하여 길이를 계산
    if (value.length <= 200) {
      setDebateContent(value);
    } else {
      // 200자를 초과하는 경우, 최대 200자까지의 문자열로 잘라서 상태를 업데이트
      setDebateContent(value.slice(0, 200));
    }
  };

  const submitData = {
    content: debateContent,
  };

  const handleSubmit = async () => {
    if (!loggedIn) {
      alert(
        "로그인 후에 질문을 작성할 수 있습니다. 로그인 페이지로 이동합니다."
      );
      Navigate("/signin");
      return;
    }
    if (debateContent.trim() === "") {
      alert("글을 입력해주세요.");
      return;
    }
    await onDebateSubmit(submitData);
    setDebateContent('');
  };

  const handleKeyDown = (event: any) => {
    // Shift + Enter가 동시에 눌렸을 때
    if (event.key === "Enter" && event.shiftKey) {
    }
    // Enter만 눌렸을 때 메시지 전송(여기서는 handleSubmit 함수 호출)
    if (event.key === "Enter" && !event.shiftKey) { // Shift가 눌리지 않고 Enter만 눌렸을 때
      event.preventDefault(); // 기본 Enter 행동(새 줄 추가)을 방지
      handleSubmit(); // 폼 제출 처리
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.title}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span>의견 달기</span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img src={submit} alt="submit" onClick={handleSubmit} />
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.textbox}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <textarea
          // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
          rows="4"
          className={styles.textarea}
          placeholder="해당 토론에 대한 의견을 입력하세요."
          value={debateContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default DebateInput;
