import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './Signup.module.css'
import logo from '../img/logo.png'
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";

const Signup = () => {
    const [doubleCheck, setDoubleCheck] = useState(false);
    
    const [form, setForm] = useState({
        name: '',
        id: '',
        password: '',
        checkPw: '',
        phoneNum: '',
        studentId: '',
        emailId: '',
    });



    function handleDoubleCheck(){
        alert('중복확인이 완료되었습니다!')
        setDoubleCheck(true);
    }

  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h2>회원가입</h2>
        <form>
            <div className={`${styles.signup_input}`}>
                <span>이름</span>
                <input type='text' placeholder='이름을 입력하세요'/>
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>아이디</span>
                    <span className={doubleCheck === false ? `${styles.signup_check}` : `${styles.signup_done}`} onClick={handleDoubleCheck}><BsCheck2All size='12'/>&nbsp;중복확인은 여기를 눌러주세요</span>
                </div>
                <input type='text' required placeholder='아이디를 입력하세요'/>
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>비밀번호</span>
                    <span className={`${styles.signup_alert}`}><FiAlertCircle size='12'/>&nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요</span>
                </div>
                <input type='text' required placeholder='비밀번호를 입력하세요'/>
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>비밀번호 재확인</span>
                    <span className={`${styles.signup_alert}`}><FiAlertTriangle size='12'/>&nbsp;비밀번호가 일치하지 않습니다</span>
                </div>
                <input type='text' required placeholder='비밀번호를 재입력하세요'/>
            </div>
            <div className={`${styles.signup_input}`}>
                <span>전화번호</span>
                <input type='text' required placeholder='전화번호를 입력하세요'/>
            </div>
            <div className={`${styles.signup_input}`}>
                <span>학번</span>
                <input type='text' required placeholder='학번을 입력하세요'/>
            </div>
            <div className={`${styles.signup_email}`}>
                <div className={`${styles.signup_head}`}>
                    <span>학교 이메일</span>
                    <span className={`${styles.signup_alert}`}>*학교 이메일은 소속학교 인증 및 개인정보 찾기에 이용됩니다</span>
                </div>
                <span><input type='text' required />@korea.ac.kr</span>  
            </div>
            <div className={`${styles.signup_agree}`}>
                <span><input required type='checkbox'/>개인정보 수집에 동의합니다.</span>
                <span>더보기</span>
            </div>
            <button className={`${styles.signup_btn}`}>회원가입</button>
        </form>
        
    </div>
  )
}

export default Signup