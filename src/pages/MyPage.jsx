import React from 'react';
import styles from './MyPage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import haho from '../img/haho.png';
import CommentList from '../components/Mypage/CommentList'
import QuestionList from '../components/Mypage/QuestionList'
import Contribute from '../components/Mypage/Contribute';
import Graph from "../components/Mypage/Graph";
import { Link } from 'react-router-dom';
import MyBadge from '../components/Mypage/MyBadge';
import MyProfile from '../components/Mypage/MyProfile';
import MyInfo from '../components/Mypage/MyInfo';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPage({loggedIn, setLoggedIn}) {
  
  //login status 체크하기
  const Navigate = useNavigate();
  useEffect(() => {
  const checkLoginStatus = async () => {
    try {
        const res = await axios.get("http://118.67.130.57:8080/user/auth/issignedin", {withCredentials: true});
        if (res.status===201 && res.data.success===true) {
            setLoggedIn(true);
        } else if(res.status === 401){
            setLoggedIn(false);
            Navigate('/signin');
        }
    } catch (error) {
        console.error(error);
        setLoggedIn(false);
       Navigate('/signin');
    }
  };
  checkLoginStatus();
}, [Navigate, setLoggedIn]);



  //내 정보 불러오기
  const [mypageData, setMypageData] = useState([]);
  useEffect(() => {
    const takeMypage = async () =>{
      try{
        const res = await axios.get( `http://118.67.130.57:8080/user/mypage/info`, {withCredentials: true});
        if(res.status === 201){
          setMypageData(res.data);
        }
        if(res.status === 401){
          console.log(res.data.message)
        }
        if(res.status === 500){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
    }
    takeMypage();
  }, []); // 종속성 배열이 비어있으므로 이 useEffect는 한 번만 실행


  //질문 기록 불러오기
  const [myQuestion, setMyQuestion] = useState([]);
  useEffect(() => {
    const takeMyQuestion = async () =>{
      try{
        const res = await axios.get( `http://118.67.130.57:8080/user/mypage/questionhistory`, {withCredentials: true});
        if(res.status === 201){
          setMyQuestion(res.data);
        }
        if(res.status === 500){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
    }
    takeMyQuestion();
  }, []);

  //토론 기록 불러오기
  const [myDebate, setMyDebate] = useState([]);
  useEffect(() => {
    const takeMyDebate = async () =>{
      try{
        const res = await axios.get( `http://118.67.130.57:8080/user/mypage/debatehistory`, {withCredentials: true});
        if(res.status === 201){
          setMyDebate(res.data);
        }
        if(res.status === 500){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
    }
    takeMyDebate();
  }, []);

  //뱃지 기록 불러오기
  const [myBadge, setMyBadge] = useState([]);
  useEffect(() => {
    const takeMyBadge = async () =>{
      try{
        const res = await axios.get( `http://118.67.130.57:8080/user/mypage/badgehistory`, {withCredentials: true});
        if(res.status === 201){
          setMyBadge(res.data);
        }
        if(res.status === 401){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
    }
    takeMyBadge();
  }, []);



  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>
      <div className={styles.header}>
        <p className={styles.mypage}>MYPAGE</p>
      </div>
      <div className={styles.mypagecontent}>
        <div className={styles.uppercontent}>
          <div className={styles.leftcontent}>
            <div className={styles.profile}>
              <div className={styles.profileheader}> 
                <p className={styles.title}>내 프로필</p>
                <button className={styles.edit}>수정하기</button>
              </div>
              {mypageData.map((data)=>(
                <MyProfile
                  nick={data.nickname}
                  point={data.point}
                />
              ))}
            </div>                
            <div className={styles.badge}>
              <div className={styles.badgeheader}> 
                <p className={styles.title}>뱃지</p>
                <Link to='/mypage/mybadge'className={styles.b_link} >
                <button className={styles.edit}> 더보기</button>
                </Link>
              </div>
              {myBadge.map((data)=>(
                <MyBadge
                  id={data.id}
                  uesr_id={data.user_id}
                  badge_id={data.badge_id}
                  time={data.created_at}
                />
              ))}            
            </div>
          </div>
        
          <div className={styles.rightcontent}>
            <div className={styles.info}>
              <div className={styles.infoheader}>
                <p className={styles.title}>내 정보</p>
              </div>
              {mypageData.map((data)=>(
                <MyInfo
                  name={data.name}
                  email={data.email}
                  stu_id={data.stu_id}
                />
              ))}
              <div className={styles.infoedit}>
                  <button className={styles.edit2}>비밀번호 변경</button>
                  <button className={styles.edit3}>개인정보 변경</button>
              </div>
            </div>
            <div className={styles.cb}>
              <p className={styles.title}>기여 목록</p>
              <div className={styles.graph}>
                <Graph />
              </div>
              <Contribute/>   
            </div>
          </div>
        </div>
        <div className={styles.middlecontent}>
          <div className={styles.ask}>
            <div className={styles.askheader}>
              <p className={styles.title}>내가 쓴 질문</p>
              <Link to='/mypage/myquestion' className={styles.q_link}>
              <button className={styles.edit}>더보기</button>
              </Link>
            </div>
            {myQuestion.map((data)=>(
              <QuestionList
                id={data.id}
                content={data.content}
                time={data.created_at}
                doc_title={data.doc_title}
              />
            ))}            
          </div>
        </div>
        <div className={styles.downcontent}>
          <div className={styles.comment}>
            <div className={styles.commentheader}>
              <p className={styles.title}>내가 쓴 토론</p>
              <Link to='/mypage/mycomment' className={styles.c_link}>
              <button className={styles.edit}>더보기</button>
              </Link>
            </div>
            {myDebate.map((data)=>(
              <CommentList
                id={data.debate_id}
                content={data.debate_content}
                time={data.debate_content_time}
                doc_title={data.doc_title}
              />
            ))}  
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};




export default MyPage;