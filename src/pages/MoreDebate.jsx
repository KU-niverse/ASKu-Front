import React from 'react';
import styles from './MoreDebate.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import DebateList from '../components/Debate/DebateList';

function MoreDebate() {

  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>

      <div className={styles.header}>
        <p className={styles.debate}>토론 (OOO OOO)</p>
      </div>

      <div className={styles.debatecontent}>
        <div className={styles.sidebar}>

        </div>
        <div className={styles.maincontent}>
          <div className={styles.maincontent_box}>
            <p className={styles.title}>
              이 문서의 토론 목록
            </p>
            <div className={styles.menu}>
              <span className={styles.menu1}>
                항목
              </span>
              <span className={styles.menu2}>
                수정 시간
              </span>
            </div>
            <DebateList/>
            <DebateList/>
            <DebateList/>
            <DebateList/>

          </div>
        </div>
      </div>


      <div>
          <Footer />
      </div>
    </div>
  );
};




export default MoreDebate;