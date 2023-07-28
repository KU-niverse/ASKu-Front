import React from "react";
import { useState } from "react";
import styles from "./QuestionInput.module.css"
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function QuestionInput({onQuestionSubmit}) {
  const [questionContent, setQuestionContent] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate(); 




  const handleChange = (e) => {
    const value = e.target.value;
    if(value.length<=200) {
      setQuestionContent(value);
    }
  };

  const checkLoginStatus = async () => {
    try {
        const res = await axios.get("http://118.67.130.57:8080/user/auth/issignedin", {withCredentials: true});
        if (res.status===201 && res.data.success===true) {
            setLoggedIn(true);
        } else if(res.status === 401){
            setLoggedIn(false);
            Navigate('/signin');
        }
    } catch (error) {
        console.error(error);
        setLoggedIn(false);
       Navigate('/signin');
    }
  };

  const handleSubmit= async (event) => {
    event.preventDefault(); // 폼 제출을 막음
    await checkLoginStatus();
    if (!loggedIn) {
      alert("로그인 후에 질문을 작성할 수 있습니다. 로그인 페이지로 이동합니다.");
      Navigate("/signin")
      return;
      }
    //로그인 안한 유저 로그인창으로 전송
    if(questionContent.trim()===''){
      alert('질문을 입력해주세요.');
      return;
    }
  
  const questionData = {
    index_title: 1,
    content: questionContent,
  };

  onQuestionSubmit(questionData);
  };

  const countCharacters = () =>{
    return `${questionContent.length}/200`;
  }
  return(
    <form className={styles.q_c}>
    <div className={styles.q_cheader}>
      <div className={styles.q_cfrontheader}>
        <p className={styles.q_cheadline}>질문 생성하기</p>
        <div className={styles.q_dropdown}>
          <DropDown/>
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
};

export default QuestionInput;