import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckPw = () => {

    const [password, setPassword] = useState('')
    const nav = useNavigate();


    function handleOnClick() {
        alert('비밀번호가 확인되었습니다')
        nav('/changeinfo');
    }

  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h2 className={styles.findTitle}>비밀번호 확인</h2>
        <form>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <span>비밀번호를 입력하세요</span>
                </div>
                <span>
                    <input 
                     required type='text' 
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     />
                </span> 
            </div>
            <button className={`${styles.findBtn}`} onClick={handleOnClick}>비밀번호 확인</button>
        </form>
    </div>
    
  )
}

export default CheckPw