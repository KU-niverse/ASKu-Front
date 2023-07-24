import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Find.module.css'
import logo from '../img/logo.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const FindPassword = () => {

    const [id, setId] = useState('')
    const nav = useNavigate();

    const findUserPw = async () => {
        try{
            const response = await axios.post('http://118.67.130.57:8080/user/auth/findpw', {
                login_id: id
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
        findUserPw();
        nav('/findoutid');
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
                     onChange={e => setId(e.target.value)}
                     value={id}
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