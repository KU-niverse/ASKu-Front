import React from 'react';
import styles from './MyBadge.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import haho from '../img/haho.png';
import comment_icon from '../img/comment_icon.png';
import Badge from '../components/Badge'

function MyBadge() {
  return (
    <div className={styles.container}>
        <div>
            <Header />
        </div>
        <div className={styles.header}>
          <p className={styles.mypage}>MYPAGE</p>
        </div>
      <div className={styles.mybadgecontent}>
        <div className={styles.b_header}>
          <p className={styles.b_headline}>OOO님의 뱃지 목록</p>
          <button className={styles.switch}>최신순</button>
        </div>
        <div className={styles.b_list}>
          <Badge className={styles.b_comp}/>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};




export default MyBadge;