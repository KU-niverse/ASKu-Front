import React, { Component } from "react";
import styles from "./MyQuestion.module.css"
import Header from "../components/Header";
import MyQuestionList from "../components/MyQuestionList";
import Footer from "../components/Footer";
import { useState } from "react";
import Switch from "../components/Switch";
import { useEffect } from "react";
import axios from "axios";
import SpinnerMypage from "../components/SpinnerMypage";

function MyQuestion() {
  const [isToggled, setIsToggled] = useState(false);
  const [myQuestion, setMyQuestion] = useState([]);
  const [mypageData, setMypageData] = useState([]);
  const [loadingMyQuestion, setLoadingMyQuestion] = useState(true);
  const [loadingMypage, setLoadingMypage] = useState(true);
  const arrange = isToggled ? "popularity" : "latest";

  useEffect(() => {
    const takeMyQuestion = async () => {
      try {
        const res = await axios.get(`https://asku.wiki/api/user/mypage/questionhistory/${arrange}`, { withCredentials: true });
        if (res.status === 201) {
          setMyQuestion(res.data);
          setLoadingMyQuestion(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingMyQuestion(false);
      }
    };
    takeMyQuestion();
  }, [arrange]);

  useEffect(() => {
    const takeMypage = async () => {
      try {
        const res = await axios.get(`https://asku.wiki/api/user/mypage/info`, { withCredentials: true });
        if (res.status === 201) {
          setMypageData(res.data);
          setLoadingMypage(false);
          console.log(res.data)
        }
      } catch (error) {
        console.error(error);
        setLoadingMypage(false);
      }
    };
    takeMypage();
  }, []);

  console.log(mypageData.data); 

    
  return(
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      {loadingMyQuestion || loadingMypage ? (
      <div><SpinnerMypage/></div>
    ) : (
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.question}>내가 쓴 질문</p>
          <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div>        
        </div>
        {mypageData.data&&myQuestion && myQuestion.success && myQuestion.data.length === 0 ? (
          <p>아직 작성한 질문이 없습니다.</p>
        ) : (
          mypageData && myQuestion && myQuestion.success && myQuestion.data.map((question) => (
            <Question
              key={question.id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
              id={question.id}
              doc_id={question.doc_id}
              user_id={question.user_id}
              index_title={question.index_title}
              content={question.content}
              created_at={question.created_at}
              answer_or_not={question.answer_or_not}
              is_bad={question.is_bad}
              docsname={question.doc_title}
              nick={mypageData.data[0].nickname}
              like_count={question.like_count}
            />
          ))
        )}
      </div>
    )}
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MyQuestion;