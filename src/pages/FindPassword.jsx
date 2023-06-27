import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {

    const [email, setEmail] = useState('')
    const nav = useNavigate();


    function handleOnClick() {
        
    }

  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h2 className={styles.findTitle}>비밀번호 찾기</h2>
        <form>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <span>학교 이메일을 입력하세요</span>
                </div>
                <span>
                    <input 
                     required type='text' 
                     onChange={e => setEmail(e.target.value)}
                     value={email}
                     />
                </span> 
            </div>
            <button className={`${styles.findBtn}`} onClick={handleOnClick}>비밀번호 재설정 메일 받기</button>
            <div  className={`${styles.findAlert}`}>비밀번호를 재설정 할 수 있는 페이지를 이메일로 전송합니다. </div>
        </form>
    </div>
    
  )
}

export default FindPassword