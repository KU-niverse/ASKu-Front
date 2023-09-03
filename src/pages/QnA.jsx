import React from "react";
import styles from "./QnA.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from '../components/Switch';
import { useState } from 'react';
import comment_icon from "../img/comment_icon.png"
import CommentQna from "../components/CommentQna";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import QuestionQnA from "../components/QuestionQnA";

const QnA = () => {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [answerData, setAnswerData] = useState([]);
  const location = useLocation();
  const stateData = location.state;
  const question_id = stateData.question_id;
  const {title} = useParams();
  console.log(question_id)


  useEffect(() => {
    const takeAnswer = async () =>{
      try{
        const res = await axios.get( `https://asku.wiki/api/question/answer/${question_id}`, {withCredentials: true});
        if(res.status === 200){
          setAnswerData(res.data);
        }
        if(res.status === 500){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
      console.log('answerData:', answerData);
    }
    takeAnswer();
  }, [question_id]);

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
          {/* <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div> */}
        </div>
          <QuestionQnA
            question_id={stateData.question_id}
            user_id={stateData.user_id}
            nick={stateData.nick}
            content={stateData.content}
            like_count={stateData.like_count}
            created_at={stateData.created_at}
            index_title={stateData.index_title}
            answer_count={stateData.answer_count}
          />
        <div className={styles.c_header}>
          <img src={comment_icon} alt="comment"/>
          <span className={styles.c_headline}>답변</span>
          <span className={styles.c_num}>{stateData.answer_count}</span>
            {answerData && answerData.data && answerData.data.length === 0 ? (
              <p className={styles.no_answer}>아직 작성된 답변이 없습니다.</p>
            ) : (
            answerData && answerData.data && answerData.data.map((data) => (
              <CommentQna
                id={data.id}
                wiki_history_id= {data.wiki_history_id}
                question_id= {data.question_id}
                created_at= {data.created_at}
                user_id= {data.user_id}
                nickname= {data.nickname}
                rep_badge= {data.rep_badge}
                badge_image={data.badge_image}
                title={data.title}
                content={data.content}
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


export default QnA;