import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SignupComplete.module.css';
import logo from '../img/logo.png';
import complete from '../img/Complete.png';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import axios from 'axios';


const SignupComplete = () => {
    const location = useLocation();
    const authId = location.state;
    const nav = useNavigate();

    function goToLogin(){
        nav('/signin');
    }
    function goToHome(){
        nav('/');
    }

    const authPost = async () => {
        try{
            const response = await axios.post('http://118.67.130.57:8080/user/auth/signup/emailcheck', {
                auth_uuid: authId
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                return alert(response.data.message);
                
            } else {
                alert(response.data.message);
                nav('/signin');
            
            }
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    }

    useEffect(() => {
        authPost();

    }, []);

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