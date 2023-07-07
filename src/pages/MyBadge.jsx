import React from 'react';
import styles from './MyBadge.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import SwitchBadge from '../components/SwitchBadge';
import { useState } from 'react';




//이렇게 작성
function MyBadge() {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

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
          <SwitchBadge  isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
        </div>
        <div className={styles.b_list}>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
          <Badge/>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};




export default MyBadge;