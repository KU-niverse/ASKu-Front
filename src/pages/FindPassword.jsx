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
    const [clicked, setClicked] = useState(false);

    const findUserPw = async (e) => {
        e.preventDefault();
        console.log(id);
        setClicked(true);

        try{
            const response = await axios.post('https://asku.wiki/api/user/auth/findpw', {
                login_id: id
            }, {
                withCredentials: true
            });
            if (response.data.success === true) {
                alert(response.data.message);
                nav('/');
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
        <h2 className={styles.findTitle}>비밀번호 찾기</h2>
        <form onSubmit={findUserPw}>
            <div className={`${styles.findInputs}`}>
                <div className={`${styles.inputLabel}`}>
                    <span>아이디를 입력하세요</span>
                </div>
                <span>
                    <input 
                     required type='text' 
                     onChange={e => setId(e.target.value)}
                     value={id}
                     />
                </span> 
            </div>
            <input className={clicked ? `${styles.hidden}` : `${styles.findBtn}`} type='submit' value='비밀번호 재설정 메일 받기'/>
            <div  className={clicked ? `${styles.hidden}` : `${styles.findAlert}`}>비밀번호 재설정 페이지를 아이디에 해당하는 이메일로 전송합니다. </div>
            <div className={clicked ? `${styles.findBtnTwo}` : `${styles.hidden}`}> 비밀번호 재설정 메일 전송 완료!</div>
            <div  className={clicked ? `${styles.findAlertTwo}` : `${styles.hidden}`}>5-10초 뒤 전송 완료 창이 뜬 후 확인을 누르고 메일을 확인해주세요. </div>
        </form>
    </div>
    
  )
}

export default FindPassword