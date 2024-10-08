import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './Find.module.css'
import logo from '../img/logo.png'

const FindId = () => {
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const nav = useNavigate()

  const findUserId = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/auth/findid`,
        {
          email,
        },
        {
          withCredentials: true,
        },
      )
      if (response.data.success) {
        setId(response.data.login_id)
        nav('/findoutid', { state: response.data.login_id })
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
      nav('/')
    }
  }

  function handleOnClick() {
    if (email.trim() === '') {
      alert('이메일을 입력해주세요')
    }
    findUserId()
    nav('/findoutid')
  }

  return (
    <div className={`${styles.container}`}>
      <img className={`${styles.logo}`} src={logo} alt={''} />
      <h2 className={styles.findTitle}>{'아이디 찾기'}</h2>
      <form>
        <div className={`${styles.findInputs}`}>
          <div className={`${styles.inputLabel}`}>
            <span>{'학교 이메일을 입력하세요'}</span>
          </div>
          <span>
            <input type={'text'} onChange={(e) => setEmail(e.target.value)} value={email} />
          </span>
        </div>
        <button type={'button'} className={`${styles.findBtn}`} onClick={handleOnClick}>
          {'아이디 찾기\r'}
        </button>
      </form>
    </div>
  )
}

export default FindId
