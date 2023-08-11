import React from 'react';
import styles from './LatestDebate.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import LatestDebateList from '../components/Debate/LatestDebateList';
import DebateSearch from '../components/Debate/DebateSearch';
import DebateAdd from '../components/Debate/DebateAdd';
import DebateRecent from '../components/Debate/DebateRecent';



function LatestDebate() {

  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>

      <div className={styles.header}>
        <p className={styles.debate}>토론</p>
      </div>

      <div className={styles.debatecontent}>
 
        <div className={styles.maincontent}>
          <div className={styles.maincontent_box}>
            <p className={styles.title}>
              최근 토론
            </p>
            <div className={styles.menu}>
              <span className={styles.menu1}>
                항목
              </span>
              <span className={styles.menu2}>
                수정 시간
              </span>
            </div>
            <LatestDebateList/>
            <LatestDebateList/>
            <LatestDebateList/>
            <LatestDebateList/>

          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateSearch/>
          </div>
          <div className={styles.debateAdd}>
            <DebateAdd/>
          </div>
          <div className={styles.debateRecent}>
            <DebateRecent/>
          </div>
          
        </div>
      </div>
      <div>
          <Footer />
      </div>
    </div>
  );
};




export default LatestDebate;