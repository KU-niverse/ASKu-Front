import styles from "./DebateInput.module.css"
import submit from "../../img/submit.png"
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

function DebateInput(){
  const [debateContent, setDebateContent] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    if(value.length<=200) {
      setDebateContent(value);
    }
  };

  const handleSubmit=() => {
    if(debateContent.trim()===''){
      alert('질문을 입력해주세요.');
      return;
    }
    //여기에 질문 제출하는 로직을 추가...
  }
  return(
    <div className={styles.container}>
      <div className={styles.title}>
        <span>의견 달기</span>
        <img src={submit} alt="submit"
          onClick={handleSubmit}
        />
      </div>
      <div className={styles.textbox}>
        <textarea
          rows="4"
          className={styles.textarea}
          placeholder="해당 토론에 대한 의견을 입력하세요."
          value={debateContent}
          maxLength={200}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default DebateInput;