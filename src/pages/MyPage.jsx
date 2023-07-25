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

function MyPage() {


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
              <MyProfile/>
            </div>                
            <div className={styles.badge}>
              <div className={styles.badgeheader}> 
                <p className={styles.title}>뱃지</p>
                <Link to='/mypage/mybadge'className={styles.b_link} >
                <button className={styles.edit}> 더보기</button>
                </Link>
              </div>
              <MyBadge/>            
            </div>
          </div>
        
          <div className={styles.rightcontent}>
            <div className={styles.info}>
              <div className={styles.infoheader}>
                <p className={styles.title}>내 정보</p>
              </div>
              <MyInfo/>
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
            <QuestionList/>
          </div>
        </div>
        <div className={styles.downcontent}>
          <div className={styles.comment}>
            <div className={styles.commentheader}>
              <p className={styles.title}>내가 쓴 댓글</p>
              <Link to='/mypage/mycomment' className={styles.c_link}>
              <button className={styles.edit}>더보기</button>
              </Link>
            </div>
            <CommentList/>
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