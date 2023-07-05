import React, { Component } from "react";
import styles from "./MyQuestion.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import { useState } from "react";
import Switch from "../components/Switch";

function MyQuestion(){
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

  return(
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.question}>내가 쓴 질문</p>
          <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div>        
        </div>
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


export default MyQuestion;