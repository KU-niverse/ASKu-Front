import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindId = () => {

    const [email, setEmail] = useState('')
    const nav = useNavigate();


    function handleOnClick() {
        nav('/findoutid');
    }

  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt=''/>
        <h2 className={styles.findTitle}>아이디 찾기</h2>
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
            <button className={`${styles.findBtn}`} onClick={handleOnClick}>아이디 찾기</button>
        </form>
    </div>
    
  )
}

export default FindId