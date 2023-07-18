import React from "react";
import { useState } from "react";
import styles from "./QuestionInput.module.css"
import DropDown from "./DropDown";

function QuestionInput() {

  const [questionContent, setQuestionContent] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    if(value.length<=200) {
      setQuestionContent(value);
    }
  };

  const handleSubmit=() => {
    if(questionContent.trim()===''){
      alert('질문을 입력해주세요.');
      return;
    }
    //여기에 질문 제출하는 로직을 추가...
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
        <span className={styles.textnum}>0/200</span>
        <button className={styles.q_csubmit} onClick={handleSubmit}>
          생성하기
        </button>
      </div>
    </div>
  </form>
  );
};

export default QuestionInput;