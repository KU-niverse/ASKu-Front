import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import axios from 'axios';

const FindId = () => {

    const location = useLocation();
    const authId = location.state;
    const [password, setPassword] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [isPwValid, setisPwValid] = useState(true);
    const [isPwSame, setisPwSame] = useState(true);

    const nav = useNavigate();



    function onChangePW(e){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)

        if (!passwordRegex.test(passwordCurrent)) {
            setisPwValid(false);
        } else {
            setisPwValid(true);
        }
    }
    function onChangeCheckPW(e){
        const checkPWCurrent = e.target.value
        setCheckPw(checkPWCurrent)

        if (checkPWCurrent !== password) {
            setisPwSame(false);
        } else {
            setisPwSame(true);
        }
    }

    const changeUserPw = async () => {

        try{
            const response = await axios.put( 'http://118.67.130.57:8080/user/auth/changepw', {
                login_id: '', //얘는 어디서 가지고 와?/
                hashed_login_id: authId,
                password: password,
            }, {
                withCredentials: true
            });
            if (response.data.success === true) {
                return alert(response.data.message)
            } else {
                return alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    }

    function handleOnClick() {

        nav('/findoutid');
    }

  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h2 className={styles.findTitle}>비밀번호 재설정</h2>
        <form>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <div className={`${styles.inputHead}`}>
                        <span>비밀번호</span>
                        <span className={isPwValid === false? `${styles.pwChangeAlert}`: `${styles.pwChangeDone}`}><FiAlertCircle size='12'/>&nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요</span>
                    </div>
                    <input 
                     required type='text'
                     placeholder='8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요'
                     name='password'
                     value={password}
                     onChange={onChangePW}
                     maxLength='20'
                     />
                </div>
            </div>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <div className={`${styles.inputHead}`}>
                        <span>비밀번호 재확인</span>
                        <span className={isPwSame === false? `${styles.pwChangeAlert}`: `${styles.pwChangeDone}`} onChange={onChangeCheckPW}><FiAlertTriangle size='12'/>&nbsp;비밀번호가 일치하지 않습니다</span>
                    </div>
                    <input 
                     required type='text'
                     placeholder='비밀번호를 재입력하세요'
                     name='checkPw'
                     value={checkPw}
                     onChange={onChangeCheckPW}
                     maxLength='20'
                     />
                </div>
            </div>
            <button className={`${styles.findBtn}`} onClick={handleOnClick}>비밀번호 변경</button>
        </form>
    </div>
    
  )
}

export default FindId