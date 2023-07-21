import React from 'react';
import styles from './Debate.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import DebateTitle from '../components/Debate/DebateTitle';
import DebateContent from '../components/Debate/DebateContent';
import DebateInput from '../components/Debate/DebateInput';
import DebateSearch from '../components/Debate/DebateSearch';
import DebateAdd from '../components/Debate/DebateAdd';
import DebateRecent from '../components/Debate/DebateRecent';

function Debate() {

  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>

      <div className={styles.header}>
        <p className={styles.debate}>토론 (OOO OOO)</p>
      </div>

      <div className={styles.debatecontent}>
        
        <div className={styles.maincontent}>
          <DebateTitle/>
          <DebateContent/>
          <DebateContent/>
          <div className={styles.input}>
            <DebateInput/>
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




export default Debate;