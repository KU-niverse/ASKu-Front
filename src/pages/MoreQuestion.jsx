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
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const MoreQuestion = () => {
  
  const { title } = useParams();
  const [data, setData] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

  const flag = isToggled ? 1 : 0;  
  


  useEffect(() => {
    const takeQuestion = async () =>{
      try{
        const res = await axios.get( `${process.env.REACT_APP_HOST}/question/view/${flag}/${title}`, {withCredentials: true});
        if(res.status === 200){
          setQuestionData(res.data);
        }
        if(res.status === 404){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
      console.log('questionData:', questionData);
    }
    takeQuestion();
  }, [title, flag]); //질문 목록 가져오기

 
 



 
  const handleQuestionSubmit = async (submitData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_HOST}/question/new/${title}`, submitData, {withCredentials: true});
      if(res.status === 200){
        setData(res.data);
        alert(res.data.message)
      }
    }catch (error){
      console.error(error);
      if(error.status === 500){
        console.log(error.data.message)
        alert(error.data.message)
      }
    }
  }; //질문 생성하기








  return(
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.frontheader}>
            <p className={styles.q_pagename}>{title}</p>
            <p className={styles.q_headline}>게시물의 질문</p>
          </div>
          <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div>
        </div>
        <div>
          <QuestionInput onQuestionSubmit={handleQuestionSubmit} title={title}/>
        </div>
        <div>
          {questionData && questionData.data && questionData.data.length === 0 ? (
              <p>아직 작성한 질문이 없습니다.</p>
            ) : (
            questionData && questionData.data && questionData.data.map((data) => (
              <Question
                key={data.id}
                id={data.id}
                doc_id={data.doc_id}
                user_id={data.user_id}
                index_title={data.index_title}
                content={data.content}
                created_at={data.created_at}
                answer_or_not={data.answer_or_not}
                is_bad={data.is_bad}
                nick={data.nickname}
                like_count={data.like_count}
                title={title}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MoreQuestion;