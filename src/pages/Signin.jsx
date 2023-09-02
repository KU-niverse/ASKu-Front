import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Signin.module.css'
import logo from '../img/logo.png'
import haho_login from '../img/login.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const Signin = () => {

    const nav = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const LS_KEY_ID = "LS_KEY_ID"; //로컬스토리지에 저장할 키
    const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG"; //아이디 저장하기 체크여부
    const [saveIDFlag, setSaveIDFlag] = useState(false);


    const handleSaveIDFlag = () => {
        console.log('전' , saveIDFlag);
        setSaveIDFlag(prev => !prev);
        console.log('후', saveIDFlag);
    }

    useEffect(() => {
        let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
        if (idFlag !== null) setSaveIDFlag(idFlag);
        if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");
      
        let data = localStorage.getItem(LS_KEY_ID);
        if (data !== null) setId(data);
      }, []);

    const userLogin = async () => {
        
        try{
            const response = await axios.post('http://localhost:8080/user/auth/signin', {
                login_id: id,
                password: password,
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                //로그인 성공시
                if (saveIDFlag) localStorage.setItem(LS_KEY_ID, id);
                nav('/');
            } else {
                return alert('이상해');
            }
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    }
    
    const handleOnSubmit = (e) => {

        e.preventDefault();

        if (id === "") {
            alert("아이디를 입력해주세요.");
        }
        if (password === "") {
          alert("비밀번호를 입력해주세요.");
        }
        userLogin();

        

        
    }


  return (
    <div className={`${styles.container}`}>
        <img className={`${styles.logo}`} src={logo} alt='logo' onClick={() => nav('/')}/>
        <img className={`${styles.haho}`}src={haho_login} alt='haho'/>
        <h1 className={styles.login_headers}>LOGIN</h1>
        <form onSubmit={handleOnSubmit}>
            <div className={`${styles.login_input}`}>
                <input type='text' value={id} onChange={e => setId(e.target.value)} placeholder='아이디를 입력하세요'/>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='비밀번호를 입력하세요' />
            </div>
            <div className={`${styles.login_remem}`}>
                <span><input type='checkbox' id='chkbox'checked={saveIDFlag} onChange={handleSaveIDFlag}/>아이디 기억하기</span>
            </div>
            <button className={`${styles.login_btn}`} type='submit'>로그인</button>
        </form>
        <div className={`${styles.login_signup}`}>
            <Link to="/signup">회원가입</Link>
        </div>
        <div className={`${styles.login_find}`}>
            <Link to="/findid">아이디를 잊으셨나요?</Link>
            <Link to="/findpw">비밀번호를 잊으셨나요?</Link>
        </div>
    </div>
    
  )
}

export default Signin