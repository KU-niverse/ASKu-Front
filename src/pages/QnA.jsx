import React from "react";
import styles from "./QnA.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from '../components/Switch';
import { useState } from 'react';
import comment_icon from "../img/comment_icon.png"
import CommentQna from "../components/CommentQna";

const QnA = () => {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

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
        <Question/>
        <div className={styles.c_header}>
          <img src={comment_icon} alt="comment"/>
          <span className={styles.c_headline}>댓글</span>
          <span className={styles.c_num}>5</span>
          <CommentQna/>
          <CommentQna/>
          <CommentQna/>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default QnA;