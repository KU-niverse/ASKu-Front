import React from "react";
import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module './QuestionInput.module.css' or... Remove this comment to see the full error message
import styles from "./QuestionInput.module.css";
// @ts-expect-error TS(6142): Module './DropDown' was resolved to 'C:/Users/User... Remove this comment to see the full error message
import DropDown from "./DropDown";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function QuestionInput({
  onQuestionSubmit,
  title,
  wikiData,
  defaultOpt
}: any) {
  const [questionContent, setQuestionContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("전체"); // 선택한 option을 상태로 관리
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || '/';

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

  //dropdown에서 선택한 index 반영
  const handleSelectedOption = (optionValue: any) => {
    setSelectedOption(optionValue);
  };

  const handleChange = (e: any) => {
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <form className={styles.q_c}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_cheader}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_cfrontheader}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.q_cheadline}>질문 생성하기</p>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_dropdown}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DropDown
              onSelectedOption={handleSelectedOption}
              title={title}
              wikiData={wikiData}
              defaultOpt={defaultOpt}
            />
          </div>
        </div>
      </div>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_cbox}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <textarea
          // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
          rows="4"
          className={styles.q_ctextarea}
          placeholder="질문을 입력해주세요."
          value={questionContent}
          maxLength={200}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_clastheader}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.textnum}>{countCharacters()}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button className={styles.q_csubmit} onClick={handleSubmit}>
            생성하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default QuestionInput;
