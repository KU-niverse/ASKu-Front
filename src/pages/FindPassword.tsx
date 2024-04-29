import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './Find.module.css'
import logo from '../img/logo.png'

const FindPassword = () => {
  const [id, setId] = useState('')
  const nav = useNavigate()
  const [clicked, setClicked] = useState(false)

  const findUserPw = async (e: any) => {
    e.preventDefault()
    setClicked(true)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/auth/findpw`,
        {
          login_id: id,
        },
        {
          withCredentials: true,
        },
      )
      if (response.data.success === true) {
        alert(response.data.message)
        nav('/')
      } else {
        return alert(response.data.message)
      }
    } catch (error) {
      console.error(error)
      return alert(error.response.data.message)
    }
  }

  return (
    <div className={`${styles.container}`}>
      <img className={`${styles.logo}`} src={logo} alt={''} />
      <h2 className={styles.findTitle}>{'비밀번호 찾기'}</h2>
      <form onSubmit={findUserPw}>
        <div className={`${styles.findInputs}`}>
          <div className={`${styles.inputLabel}`}>
            <span>{'아이디를 입력하세요'}</span>
          </div>
          <span>
            <input required type={'text'} onChange={(e) => setId(e.target.value)} value={id} />
          </span>
        </div>
        <input
          className={clicked ? `${styles.hidden}` : `${styles.findBtn}`}
          type={'submit'}
          value={'비밀번호 재설정 메일 받기'}
        />
        <div className={clicked ? `${styles.hidden}` : `${styles.findAlert}`}>
          {'비밀번호 재설정 페이지를 아이디에 해당하는 이메일로 전송합니다.'}{' '}
        </div>
        <div className={clicked ? `${styles.findBtnTwo}` : `${styles.hidden}`}>{' 비밀번호 재설정'}</div>
        <div className={clicked ? `${styles.findAlertTwo}` : `${styles.hidden}`}>
          {'처리중입니다. 잠시만 기다려주세요 5-10초 소요됩니다.'}{' '}
        </div>
      </form>
    </div>
  )
}

export default FindPassword
