import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FindoutId = () => {

    const location = useLocation();
    const id = location.state;
    const nav = useNavigate();
    

    function handleOnClick() {
        nav('/signin');
    }

  return (
        <div className={`${styles.container}`}>
                <img className={`${styles.logo}`} src={logo} alt=''/>
                <h2 className={styles.findTitle}>아이디 찾기</h2>
                <form>
                        <div className={`${styles.findInputs}`}>
                                <div className={`${styles.inputLabel}`}>
                                        <span>해당 이메일로 가입한 아이디는 다음과 같습니다.</span>
                </div>
                                <span>
                                        <input 
                     type='text' 
                     value={id}
                     disabled
                     />
                </span> 
            </div>
                        <button className={`${styles.findBtn}`} onClick={handleOnClick}>로그인 페이지로 이동</button>
        </form>
    </div>
    
  )
}

export default FindoutId