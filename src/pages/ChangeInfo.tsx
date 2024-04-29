import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// @ts-expect-error TS(2307): Cannot find module './Signup.module.css' or its co... Remove this comment to see the full error message
import styles from './Signup.module.css'
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
import logo from '../img/logo.png'
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";

const ChangeInfo = () => {
    const nav = useNavigate();
    const [doubleCheck, setDoubleCheck] = useState(false);
    const [isPwValid, setisPwValid] = useState(true);
    const [isPwSame, setisPwSame] = useState(true);
    
    const [form, setForm] = useState({
        name: '',
        nick: '',
        password: '',
        checkPw: '',
        studentId: '',
    });



    function handleDoubleCheck(){
        alert('중복확인이 완료되었습니다!')
        setDoubleCheck(true);
    }

    function onChangePW(e: any){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setForm({...form, password:passwordCurrent})

        if (!passwordRegex.test(passwordCurrent)) {
            setisPwValid(false);
        } else {
            setisPwValid(true);
        }
    }
    function onChangeCheckPW(e: any){
        const checkPWCurrent = e.target.value
        setForm({...form, checkPw:checkPWCurrent})

        if (checkPWCurrent !== form.password) {
            setisPwSame(false);
        } else {
            setisPwSame(true);
        }
    }


    function handleOnSubmit(e: any) {
        e.prevent.default();
        nav('/signup/completed');
    }



  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.container}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img className={`${styles.logo}`} src={logo} alt=''/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <h1>내 정보 변경</h1>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.signup_input}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <span>이름</span>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <input
                 disabled type='text'
                 placeholder='이름을 입력하세요'
                 name='name'
                 value={form.name}
                 onChange={e => setForm({ ...form, name: e.target.value})}
                 />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.signup_input}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={`${styles.signup_head}`}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span>닉네임</span>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={doubleCheck === false ? `${styles.signup_check}` : `${styles.signup_done}`} onClick={handleDoubleCheck}><BsCheck2All size='12'/>&nbsp;중복확인은 여기를 눌러주세요</span>
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <input 
                 required type='text'
                 placeholder='닉네임을 입력하세요'
                 name='nick'
                 value={form.nick}
                 // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                 maxLength='30'
                 onChange={e => setForm({ ...form, nick: e.target.value})}
                 />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.signup_input}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <span>학번</span>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <input
                 required type='text'
                 placeholder='학번을 입력하세요'
                 name='studentId'
                 value={form.studentId}
                 // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                 maxLength='10'
                 onChange={e => setForm({ ...form, studentId: e.target.value})}
                 />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className={`${styles.signup_btn}`} onSubmit={handleOnSubmit}>내 정보 변경</button>
        </form>
        
    </div>
  )
}

export default ChangeInfo