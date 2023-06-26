import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupComplete.module.css';
import logo from '../img/logo.png';
import complete from '../img/Complete.png';
import Footer from '../components/Footer';


const SignupComplete = () => {
    const nav = useNavigate();

    function goToLogin(){
        nav('/signin');
    }
    function goToHome(){
        nav('/');
    }

  return (
    <div className={styles.container}>
        <div className={styles.completed}>
            <img className={`${styles.logo}`} src={logo} alt=''/>
            <img className={`${styles.complete}`}src={complete} alt=''/>
            <div className={styles.complete_text}>ASKu 회원가입이 완료되었습니다!</div>
            <div className={styles.complete_btn}>
                <button className={styles.btn_login} onClick={goToLogin}>로그인</button>
                <button className={styles.btn_home} onClick={goToHome}>홈 화면으로 가기</button>
            </div>
        </div>
       <Footer/>
    </div>
   
    
  )
}

export default SignupComplete