import styles from "./DebateInput.module.css";
import submit from "../../img/submit.png";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DebateInput({ onDebateSubmit, title, debateId }) {
  const [debateContent, setDebateContent] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      if (error.status === 401) {
        setLoggedIn(false);
        alert(error.data.message);
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   if (value.length <= 200) {
  //     setDebateContent(value);
  //   }
  // };
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDebateContent(value);
    }
};

  const submitData = {
    content: debateContent,
  };

  // const handleSubmit = async (event) => {
  //   if (!loggedIn) {
  //     alert(
  //       "로그인 후에 질문을 작성할 수 있습니다. 로그인 페이지로 이동합니다."
  //     );
  //     Navigate("/signin");
  //     return;
  //   }
  //   if (debateContent.trim() === "") {
  //     alert("글을 입력해주세요.");
  //     return;
  //   }

  //   onDebateSubmit(submitData);
  //   window.location.reload();
  // };


  const handleSubmit = async (event) => {
    // event.preventDefault();
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

    // 상위 컴포넌트의 handleDebateSubmit 함수를 호출하여 데이터 전송
    await onDebateSubmit(submitData);

    // 폼 제출에 성공하면 입력 필드를 초기화합니다.
    setDebateContent('');
  };

  const handleKeyDown = (event) => {
    // Shift + Enter가 동시에 눌렸을 때
    if (event.key === "Enter" && event.shiftKey) {
      console.log()
    }
    // Enter만 눌렸을 때 메시지 전송(여기서는 handleSubmit 함수 호출)
    if (event.key === "Enter" && !event.shiftKey) { // Shift가 눌리지 않고 Enter만 눌렸을 때
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
