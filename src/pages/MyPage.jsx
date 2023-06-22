import React from 'react';
import styles from './MyPage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'

function MyPage() {
  return (
    <div className={`${styles.container}`}>
      <div>
          <Header />
      </div>
      <div className={`${styles.header}`}>
        <p className={`${styles.mypage}`}>MYPAGE</p>
      </div>
      <div className={`${styles.uppercontent}`}>
        <div className={`${styles.leftcontent}`}>
          <div className={`${styles.profile}`}>
            <p className={`${styles.title}`}>내 프로필</p>
          </div>
          <div className={`${styles.badge}`}>
            <p className={`${styles.title}`}>뱃지</p>
          </div>
        </div>
        <div className={`${styles.rightcontent}`}>
          <div className={`${styles.info}`}>
            <p className={`${styles.title}`}>내 정보</p>
          </div>
          <div className={`${styles.contribute}`}>
            <p className={`${styles.title}`}>기여 목록</p>
          </div>
        </div>
      </div>
      <div className={`${styles.middlecontent}`}>
        <div className={`${styles.ask}`}>
          <p className={`${styles.title}`}>내가 쓴 질문</p>
        </div>
      </div>
      <div className={`${styles.downcontent}`}>
        <div className={`${styles.comment}`}>
          <p className={`${styles.title}`}>내가 쓴 댓글</p>
        </div>
      </div>
      <div>
          <Footer />
      </div>
    </div>
  );
};




export default MyPage;