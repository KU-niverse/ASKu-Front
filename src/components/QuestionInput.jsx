import React from "react";
import { useState } from "react";
import styles from "./QuestionInput.module.css";
import DropDown from "./DropDown";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function QuestionInput({ onQuestionSubmit, title, wikiData, defaultOpt }) {
  const [questionContent, setQuestionContent] = useState("");
  const [selectedOption, setSelectedOption] = useState(null); // 선택한 option을 상태로 관리
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || '/';
  console.log(from)

 //로그인 체크 후 우회
  // const checkLoginStatus = async () => {
  //   try {
  //     const res = await axios.get(
  //       process.env.REACT_APP_HOST+"/user/auth/issignedin",
  //       { withCredentials: true }
  //     );
  //     if (res.status === 201 && res.data.success === true) {
  //       setLoggedIn(true);
  //     } else if (res.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return Navigate(from);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoggedIn(false);
  //     if (error.response.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return Navigate(from);
  //     }else{
  //       alert("에러가 발생하였습니다");
  //       return Navigate(from);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  //

  //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
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
      }else{
        alert("에러가 발생하였습니다");
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  //dropdown에서 선택한 index 반영
  const handleSelectedOption = (optionValue) => {
    setSelectedOption(optionValue);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setQuestionContent(value);
    }
};


  const submitData = {
    index_title: selectedOption,
    content: questionContent,
  };

  const handleSubmit = async () => {
    if (!loggedIn) {
      alert(
        "로그인 후에 질문을 작성할 수 있습니다. 로그인 페이지로 이동합니다."
      );
      Navigate("/signin");
      return;
    }
    // 로그인 안한 유저 로그인창으로 전송
    if (!selectedOption) {
      alert("목차를 선택해 주세요.");
      return;
    }
    if (questionContent.trim() === "") {
      alert("질문을 입력해주세요.");
      return;
    } 
    onQuestionSubmit(submitData);
    window.location.reload();
  };

  const countCharacters = () => {
    return `${questionContent.length}/200`;
  };

  return (
    <form className={styles.q_c}>
      <div className={styles.q_cheader}>
        <div className={styles.q_cfrontheader}>
          <p className={styles.q_cheadline}>질문 생성하기</p>
          <div className={styles.q_dropdown}>
            <DropDown
              onSelectedOption={handleSelectedOption}
              title={title}
              wikiData={wikiData}
              defaultOpt={defaultOpt}
            />
          </div>
        </div>
      </div>

      <div className={styles.q_cbox}>
        <textarea
          rows="4"
          className={styles.q_ctextarea}
          placeholder="질문을 입력해주세요."
          value={questionContent}
          maxLength={200}
          onChange={handleChange}
        />
        <div className={styles.q_clastheader}>
          <span className={styles.textnum}>{countCharacters()}</span>
          <button className={styles.q_csubmit} onClick={handleSubmit}>
            생성하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default QuestionInput;
