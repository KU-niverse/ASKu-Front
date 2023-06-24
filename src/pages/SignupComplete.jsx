import React from 'react';
import styles from './SignupComplete.module.css';
import logo from '../img/logo.png';
import Arrow from '../img/Arrow.png';
import Footer from '../components/Footer';


const SignupComplete = () => {
  return (
    <div className={styles.container}>
        <div className={styles.completed}>
            <img className={`${styles.logo}`} src={logo} alt=''/>
            <img className={`${styles.arrow}`}src={Arrow} alt=''/>
            <div className={styles.complete_text}>ASKu 회원가입이 완료되었습니다!</div>
            <div className={styles.complete_btn}>
                <button className={styles.btn_login}>로그인</button>
                <button className={styles.btn_home}>홈 화면으로 가기</button>
            </div>
        </div>
       
    </div>
   
    
  )
}

export default SignupComplete