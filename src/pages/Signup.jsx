import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'
import logo from '../img/logo.png'
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";
import axios from 'axios';

const Signup = () => {
    const nav = useNavigate();
    const [nickDoubleCheck, setNickDoubleCheck] = useState(false);
    const [idDoubleCheck, setIdDoubleCheck] = useState(false);
    const [emailDoubleCheck, setEmailDoubleCheck] = useState(false);
    const [isNickValid, setisNickValid] = useState(true);
    const [isIdValid, setisIdValid] = useState(true);
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

    const handleNickDoubleCheck = async () => {
        try{
            const result = await axios.get(`http://118.67.130.57:8080/user/auth/nickdupcheck/${form.nick}`);

            if (result.data.success === true){
                alert(result.data.message);
                setNickDoubleCheck(true);
            }
            else{
                alert(result.data.message);
                setNickDoubleCheck(false);
            }
            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    const handleIdDoubleCheck = async () => {
        try{
            const result = await axios.get(`http://118.67.130.57:8080/user/auth/iddupcheck/${form.id}`);

            if (result.data.success === true){
                alert(result.data.message);
                setIdDoubleCheck(true);
            }
            else{
                alert(result.data.message);
                setIdDoubleCheck(false);
            }
            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
        }
    };

    const handleEmailDoubleCheck = async () => {
        try{
            const result = await axios.get(`http://118.67.130.57:8080/user/auth/emaildupcheck/${form.emailId}@korea.ac.kr`);

            if (result.data.success === true){
                alert(result.data.message);
                setEmailDoubleCheck(true);
            }
            else{
                alert(result.data.message)
                setEmailDoubleCheck(false);
            }
            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
        }
    };



    function onChangeNick(e){
        const nickRegex = /^[가-힣]{2,8}$/;
        const nickCurrent = e.target.value
        setForm({...form, nick:nickCurrent})

        if (!nickRegex.test(nickCurrent)) {
            setisNickValid(false);
        } else {
            setisNickValid(true);
        }
    }
    
    function onChangeId(e){
        const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,15}$/
        const idCurrent = e.target.value
        setForm({...form, id:idCurrent})

        if (!idRegex.test(idCurrent)) {
            setisIdValid(false);
        } else {
            setisIdValid(true);
        }
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


    const createUserApi = async (e) => {
        //event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        if(isNickValid === false || 
            isIdValid === false || 
            isPwValid === false || 
            nickDoubleCheck === false || 
            idDoubleCheck === false || 
            isPwSame === false ){
            
            e.preventDefault();
            return alert('형식이 올바르지 않습니다.');
            
        }

        try{
            const response = await axios.post('http://118.67.130.57:8080/user/auth/signup', {
                login_id: form.id,
                name: form.name,
                stu_id: form.studentId,
                email: `${form.emailId}@korea.ac.kr`,
                password: form.password,
                nickname: form.nick
            }, {
                withCredentials: true
            });
            if (response.data.success === true) {
                alert(response.data.message);
                nav('/signup/completed');
            }
        } catch (error) {
            console.error(error);
            return alert('뭔가 잘못됨');
        }
    
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
            <div className={`${styles.signup_checkinput}`}>
                <div className={`${styles.signup_head}`}>
                    <span>닉네임</span>
                    <span className={nickDoubleCheck === false ? `${styles.signup_check}` : `${styles.signup_done}`} onClick={handleNickDoubleCheck}><BsCheck2All size='12'/>&nbsp;중복확인은 여기를 눌러주세요</span>
                </div>
                <div className={`${styles.checkInput}`}>
                    <input 
                     required type='text'
                     placeholder='2-8자 한글로 입력하세요'
                     name='nick'
                     value={form.nick}
                     maxLength='8'
                     onChange={onChangeNick}
                     className={`${styles.checkInput}`}
                     />
                     <button className={`${styles.dblcheck}`} onClick={handleNickDoubleCheck}>중복확인</button>
                </div>
                
            </div>
            <div className={`${styles.signup_checkinput}`}>
                <div className={`${styles.signup_head}`}>
                    <span>아이디</span>
                    <span className={isIdValid === false? `${styles.signup_alert}`: `${styles.signup_done}`}><FiAlertCircle size='12'/>&nbsp;6자이상-15자미만, 영문, 숫자로 입력해주세요</span>
                </div>
                <div className={`${styles.checkInput}`}>
                    <input 
                     required type='text'
                     placeholder='아이디를 입력하세요'
                     name='id'
                     value={form.id}
                     maxLength='30'
                     onChange={onChangeId}
                     
                     />
                    <button className={`${styles.dblcheck}`} onClick={handleIdDoubleCheck}>중복확인</button>
                </div>
                
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
                     <button className={`${styles.dblcheck}`} onClick={handleEmailDoubleCheck}>중복확인</button>
                </span>

                <span className={`${styles.signup_alert}`}>*학교 이메일은 소속학교 인증 및 개인정보 찾기에 이용됩니다</span>  
            </div>
            <div className={`${styles.signup_agree}`}>
                <span><input required type='checkbox'/>개인정보 수집에 동의합니다.</span>
                <span>더보기</span>
            </div>
            <button className={`${styles.signup_btn}`} onClick={createUserApi}>회원가입</button>
        </form>
        
    </div>
  )
}

export default Signup