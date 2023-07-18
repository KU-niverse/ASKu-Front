import React from "react";
import styles from "./MoreQuestion.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from '../components/Switch';
import QuestionInput from "../components/QuestionInput";
import { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";

const MoreQuestion = ({title}) => {

  const [questionData, setQuestionData] = useState([]);
  useEffect(() => {
    const takeQuestion = async () =>{
      try{
        const res = await axios.get(process.env.REACT_APP_HOST+`question/view/${title}`, {withCredentials: true});
        if(res.status === 200){
          setQuestionData(res.data);
        }
        if(res.status === 404){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
    }
    takeQuestion();
  }, [title]);


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
        <div>
          <QuestionInput/>
        </div>
        <div>
          {questionData.map((data) => (
            <Question
              id={data.id}
              doc_id={data.doc_id}
              user_id={data.user_id}
              index_title={data.index_title}
              content={data.content}
              created_at={data.created_at}
              answer_or_not={data.answer_or_not}
              is_bad={data.is_bad}
            />
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MoreQuestion;