import React from 'react'
import { Link } from 'react-router-dom'
// @ts-expect-error TS(2307): Cannot find module './Find.module.css' or its corr... Remove this comment to see the full error message
import styles from './Find.module.css'
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.container}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img className={`${styles.logo}`} src={logo} alt=''/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <h2 className={styles.findTitle}>아이디 찾기</h2>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.findInputs}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={`${styles.inputLabel}`}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span>해당 이메일로 가입한 아이디는 다음과 같습니다.</span>
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <span>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input 
                     type='text' 
                     value={id}
                     disabled
                     />
                </span> 
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className={`${styles.findBtn}`} onClick={handleOnClick}>로그인 페이지로 이동</button>
        </form>
    </div>
    
  )
}

export default FindoutId