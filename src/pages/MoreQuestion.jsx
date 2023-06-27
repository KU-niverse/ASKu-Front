import React from "react";
import styles from "./MoreQuestion.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from '../components/Switch';
import Dropdown from "../components/DropDown";
import { useState } from 'react';

function MoreQuestion(){
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [questionContent, setQuestionContent] = useState('');

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
        <div className={styles.q_c}>
          <div className={styles.q_cheader}>
            <div className={styles.q_cfrontheader}>
              <p className={styles.q_cheadline}>질문 생성하기</p>
              <Dropdown/>
            </div>
            <div className={styles.q_clastheader}>
              <span className={styles.textnum}>0/200</span>
              <button className={styles.q_csubmit}>생성하기</button>
            </div>
          </div>
          <textarea 
            rows="3" 
            id='q_ctextarea' 
            placeholder="질문을 입력해주세요."
            value={questionContent}
            maxLength={200}
            onChange={e => setQuestionContent(e.target.value)}
          >
          </textarea >
        </div>
        <Question/>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MoreQuestion;