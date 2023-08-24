import React, { Component } from "react";
import styles from "./MyQuestion.module.css"
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import { useState } from "react";
import Switch from "../components/Switch";
import { useEffect } from "react";
import axios from "axios";

function MyQuestion(){
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [loading, setLoading] = useState(true);
  const arrange= isToggled ? "popularity" : "latest";

  //질문 기록 불러오기
  const [myQuestion, setMyQuestion] = useState([]);
  useEffect(() => {
    const takeMyQuestion = async () =>{
      try{
        const res = await axios.get( `http://localhost:8080/user/mypage/questionhistory/${arrange}`, {withCredentials: true});
        if(res.status === 201){
          console.log(res.data)
          setMyQuestion(res.data);
          setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
        if(res.status === 500){
          console.log(res.data.message)
        }
        }catch (error){
          console.error(error);
          setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
      }
      takeMyQuestion();
    }, [arrange]);
    console.log(myQuestion.success)
    console.log(myQuestion)


    //내 정보 불러오기
    const [mypageData, setMypageData] = useState([]);
    useEffect(() => {
      const takeMypage = async () =>{
        try{
          const res = await axios.get( `http://localhost:8080/user/mypage/info`, {withCredentials: true});
          if(res.status === 201){
            setMypageData(res.data);
            setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
          }
          if(res.status === 401){
            console.log(res.data.message)
          }
          if(res.status === 500){
            console.log(res.data.message)
          }
        }catch (error){
          console.error(error);
          setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
      }
      takeMypage();
    }, []); // 종속성 배열이 비어있으므로 이 useEffect는 한 번만 실행


    
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
        {mypageData&&myQuestion && myQuestion.success && myQuestion.data.length === 0 ? (
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
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MyQuestion;