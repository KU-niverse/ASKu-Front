import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Signin.module.css'
import logo from '../img/logo.png'
import haho_login from '../img/login.png'

const Signin = () => {
  return (
    <div className={`${styles.container}`}>
        <img src={logo} alt=''/>
        <img className={`${styles.haho}`}src={haho_login} alt=''/>
        <h1>LOGIN</h1>
        <form>
            <div className={`${styles.login_input}`}>
                <input type='text' placeholder='아이디를 입력하세요'/>
                <input type='text' placeholder='비밀번호를 입력하세요' />
            </div>
            <div className={`${styles.login_remem}`}>
                <span><input type='checkbox' id='chkbox'/>아이디 기억하기</span>
                <Link to="/signup">아이디 비밀번호 찾기</Link>
            </div>
            <button className={`${styles.login_btn}`}>로그인</button>
        </form>
        <div className={`${styles.login_signup}`}>
            <Link to="/signup">회원가입</Link>
        </div>
        <div className={`${styles.login_find}`}>
            <Link to="/signup">아이디를 잊으셨나요?</Link>
            <Link to="/signup">비밀번호를 잊으셨나요?</Link>
        </div>
    </div>
    
  )
}

export default Signin