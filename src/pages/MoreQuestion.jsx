import React from "react";
import styles from "./MoreQuestion.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from '../components/Switch';
import DropDown from "../components/DropDown";
import { useState } from 'react';

const MoreQuestion = () => {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
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
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.frontheader}>
            <p className={styles.q_pagename}>입실렌티</p>
            <p className={styles.q_headline}>게시물의 질문</p>
          </div>
          <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div>
        </div>
        <form className={styles.q_c}>
          <div className={styles.q_cheader}>
            <div className={styles.q_cfrontheader}>
              <p className={styles.q_cheadline}>질문 생성하기</p>
              <DropDown/>
            </div>
            <div className={styles.q_clastheader}>
              <span className={styles.textnum}>0/200</span>
              <button className={styles.q_csubmit} onClick={handleSubmit}>생성하기</button>
            </div>
          </div>
          
          <textarea 
            rows="3"
            className={`${styles.q_ctextarea}`} 
            placeholder="질문을 입력해주세요."
            value={questionContent}
            maxLength={200}
            onChange={handleChange}
          >
          </textarea >
        </form>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MoreQuestion;