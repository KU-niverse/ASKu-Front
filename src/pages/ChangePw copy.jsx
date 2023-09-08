import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import axios from 'axios';

const ChangePw = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [isPwValid, setisPwValid] = useState(true);
    const [isPwSame, setisPwSame] = useState(true);

    const nav = useNavigate();



    function onChangePW(e){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)

        // if (!passwordRegex.test(passwordCurrent)) {
        //     setisPwValid(false);
        // } else {
        //     setisPwValid(true);
        // }
    }
    function onChangeNewPW(e){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setNewPassword(passwordCurrent)

        if (!passwordRegex.test(passwordCurrent)) {
            setisPwValid(false);
        } else {
            setisPwValid(true);
        }
    }
    function onChangeCheckPW(e){
        const checkPWCurrent = e.target.value
        setCheckPw(checkPWCurrent)

        if (checkPWCurrent !== newPassword) {
            setisPwSame(false);
        } else {
            setisPwSame(true);
        }
    }

    const changeUserPw = async (e) => {

        e.preventDefault();

        if(newPassword==='') {
            return alert('새 비밀번호를 입력해주세요')
        } 
        if(password===''){
            return alert('기존 비밀번호를 입력해주세요')
        }

        

        if(isPwValid === false){
            return alert('비밀번호 형식이 올바르지 않습니다');
        } else if(isPwSame=== false){
            return alert('비밀번호가 일치하지 않습니다')
        }

        try{
            const response = await axios.put( 'http://localhost:8080/user/auth/changepw', {
                password: password,
                new_password: newPassword,
            }, {
                withCredentials: true
            });
            if (response.data.success === true) {
                alert(response.data.message)
                nav('/mypage');
            } else {
                return alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    }


  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h2 className={styles.findTitle}>비밀번호 재설정</h2>
        <form onSubmit={changeUserPw}>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <div className={`${styles.inputHead}`}>
                        <span>현재 비밀번호</span>
                        {/* <span className={isPwValid === false? `${styles.pwChangeAlert}`: `${styles.pwChangeDone}`}><FiAlertCircle size='12'/>&nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요</span> */}
                    </div>
                    <input 
                     required type='password'
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
                        <span>새 비밀번호</span>
                        <span className={isPwValid === false? `${styles.pwChangeAlert}`: `${styles.pwChangeDone}`}><FiAlertCircle size='12'/>&nbsp;8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요</span>
                    </div>
                    <input 
                     required type='password'
                     placeholder='8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요'
                     name='newpassword'
                     value={newPassword}
                     onChange={onChangeNewPW}
                     maxLength='20'
                     />
                </div>
            </div>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <div className={`${styles.inputHead}`}>
                        <span>새 비밀번호 재확인</span>
                        <span className={isPwSame === false? `${styles.pwChangeAlert}`: `${styles.pwChangeDone}`} onChange={onChangeCheckPW}><FiAlertTriangle size='12'/>&nbsp;비밀번호가 일치하지 않습니다</span>
                    </div>
                    <input 
                     required type='password'
                     placeholder='비밀번호를 재입력하세요'
                     name='checkPw'
                     value={checkPw}
                     onChange={onChangeCheckPW}
                     maxLength='20'
                     />
                </div>
            </div>
            <input type='submit' className={`${styles.findBtn}`} value='비밀번호 변경' />
        </form>
    </div>
    
  )
}

export default ChangePw;