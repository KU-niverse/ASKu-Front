import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'
import logo from '../img/logo.png'
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";

const Signup = () => {
    const nav = useNavigate();
    const [doubleCheck, setDoubleCheck] = useState(false);
    const [isPwValid, setisPwValid] = useState(true);
    const [isPwSame, setisPwSame] = useState(true);
    
    const [form, setForm] = useState({
        name: '',
        nick: '',
        id: '',
        password: '',
        checkPw: '',
        studentId: '',
        emailId: '',
    });



    function handleDoubleCheck(){
        alert('중복확인이 완료되었습니다!')
        setDoubleCheck(true);
    }

    function onChangePW(e){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setForm({...form, password:passwordCurrent})

        if (!passwordRegex.test(passwordCurrent)) {
            setisPwValid(false);
        } else {
            setisPwValid(true);
        }
    }
    function onChangeCheckPW(e){
        const checkPWCurrent = e.target.value
        setForm({...form, checkPw:checkPWCurrent})

        if (checkPWCurrent !== form.password) {
            setisPwSame(false);
        } else {
            setisPwSame(true);
        }
    }


    function handleOnSubmit(e) {
        e.prevent.default();
        nav('/signup/completed');
    }



  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h1>회원가입</h1>
        <form>
            <div className={`${styles.signup_input}`}>
                <span>이름</span>
                <input
                 required type='text'
                 placeholder='이름을 입력하세요'
                 name='name'
                 value={form.name}
                 onChange={e => setForm({ ...form, name: e.target.value})}
                 />
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>닉네임</span>
                    <span className={doubleCheck === false ? `${styles.signup_check}` : `${styles.signup_done}`} onClick={handleDoubleCheck}><BsCheck2All size='12'/>&nbsp;중복확인은 여기를 눌러주세요</span>
                </div>
                <input 
                 required type='text'
                 placeholder='닉네임을 입력하세요'
                 name='nick'
                 value={form.nick}
                 maxLength='30'
                 onChange={e => setForm({ ...form, nick: e.target.value})}
                 />
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>아이디</span>
                    <span className={doubleCheck === false ? `${styles.signup_check}` : `${styles.signup_done}`} onClick={handleDoubleCheck}><BsCheck2All size='12'/>&nbsp;중복확인은 여기를 눌러주세요</span>
                </div>
                <input 
                 required type='text'
                 placeholder='아이디를 입력하세요'
                 name='id'
                 value={form.id}
                 maxLength='30'
                 onChange={e => setForm({ ...form, id: e.target.value})}
                 />
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>비밀번호</span>
                    <span className={isPwValid === false? `${styles.signup_alert}`: `${styles.signup_done}`}><FiAlertCircle size='12'/>&nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요</span>
                </div>
                <input 
                 required type='text'
                 placeholder='8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요'
                 name='password'
                 value={form.password}
                 onChange={onChangePW}
                 maxLength='20'
                 />
            </div>
            <div className={`${styles.signup_input}`}>
                <div className={`${styles.signup_head}`}>
                    <span>비밀번호 재확인</span>
                    <span className={isPwSame === false? `${styles.signup_alert}`: `${styles.signup_done}`} onChange={onChangeCheckPW}><FiAlertTriangle size='12'/>&nbsp;비밀번호가 일치하지 않습니다</span>
                </div>
                <input 
                 required type='text'
                 placeholder='비밀번호를 재입력하세요'
                 name='checkPw'
                 value={form.checkPw}
                 onChange={onChangeCheckPW}
                 maxLength='20'
                 />
            </div>
            <div className={`${styles.signup_input}`}>
                <span>학번</span>
                <input
                 required type='text'
                 placeholder='학번을 입력하세요'
                 name='studentId'
                 value={form.studentId}
                 maxLength='10'
                 onChange={e => setForm({ ...form, studentId: e.target.value})}
                 />
            </div>
            <div className={`${styles.signup_email}`}>
                <div className={`${styles.signup_head}`}>
                    <span>학교 이메일</span>
                </div>
                <span>
                    <input 
                     required type='text' onChange={e => setForm({ ...form, emailId: e.target.value})}
                     />@korea.ac.kr
                </span>
                <span className={`${styles.signup_alert}`}>*학교 이메일은 소속학교 인증 및 개인정보 찾기에 이용됩니다</span>  
            </div>
            <div className={`${styles.signup_agree}`}>
                <span><input required type='checkbox'/>개인정보 수집에 동의합니다.</span>
                <span>더보기</span>
            </div>
            <button className={`${styles.signup_btn}`} onSubmit={handleOnSubmit}>회원가입</button>
        </form>
        
    </div>
  )
}

export default Signup