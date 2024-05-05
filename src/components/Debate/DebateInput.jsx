import styles from "./DebateInput.module.css";
import submit from "../../img/submit.png";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { track } from "@amplitude/analytics-browser";

function DebateInput({ onDebateSubmit, title, debateId }) {
  const [debateContent, setDebateContent] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || "/";

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
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

  const handleChange = (e) => {
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
    setDebateContent("");

    // Amplitude
    track("click_button_in_debate", {
      title: title,
    });
  };

  const handleKeyDown = (event) => {
    // Shift + Enter가 동시에 눌렸을 때
    if (event.key === "Enter" && event.shiftKey) {
    }
    // Enter만 눌렸을 때 메시지 전송(여기서는 handleSubmit 함수 호출)
    if (event.key === "Enter" && !event.shiftKey) {
      // Shift가 눌리지 않고 Enter만 눌렸을 때
      event.preventDefault(); // 기본 Enter 행동(새 줄 추가)을 방지
      handleSubmit(); // 폼 제출 처리
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>의견 달기</span>
        <img src={submit} alt="submit" onClick={handleSubmit} />
      </div>
      <div className={styles.textbox}>
        <textarea
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
