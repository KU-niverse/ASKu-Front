import React, { Component } from "react";
import styles from "./MyComment.module.css"
import Header from "../components/Header";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import { useState } from "react";
import Switch from "../components/Switch";
import { useEffect } from "react";
import axios from "axios";

function MyComment(){
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [loading, setLoading] = useState(true);


 //토론 기록 불러오기
  const [myDebate, setMyDebate] = useState([]);
  useEffect(() => {
    const takeMyDebate = async () =>{
      try{
        const res = await axios.get( `${process.env.REACT_APP_HOST}/user/mypage/debatehistory`, {withCredentials: true});
        if(res.status === 201){
          console.log(res.data)
          setMyDebate(res.data);
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
      takeMyDebate();
    }, []);
    console.log(myDebate.message)
    console.log(myDebate)


    //내 정보 불러오기
    const [mypageData, setMypageData] = useState([]);
    useEffect(() => {
      const takeMypage = async () =>{
        try{
          const res = await axios.get( `${process.env.REACT_APP_HOST}/user/mypage/info`, {withCredentials: true});
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

   
    console.log(mypageData)

  return(
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.comment}>내가 쓴 토론</p>
          <div className={styles.switch}>
          {/* <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/> */}
          </div>
        </div>       
        {mypageData&& myDebate && myDebate.message && myDebate.message.length === 0 ? (
          <p>아직 작성한 토론이 없습니다.</p>
        ) : (
          mypageData && myDebate && myDebate.message && myDebate.message.map((debate) => (
            <Comment
              key={debate.debate_id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
              id={debate.debate_id}
              subject={debate.debate_subject}
              content={debate.debate_content}
              created_at={debate.debate_content_time}
              is_bad={debate.is_bad}
              docsname={debate.doc_title}
              nick={mypageData.data[0].nickname}
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


export default MyComment;