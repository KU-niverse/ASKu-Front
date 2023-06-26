import React, { Component } from "react";
import styles from "./MyQuestion.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";

function MyQuestion(){
  return(
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.question}>내가 쓴 질문</p>
          <button className={styles.switch}>최신순</button>
        </div>
        <Question/>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MyQuestion;