import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { FiAlertTriangle, FiAlertCircle } from 'react-icons/fi'
import { BsCheck2All } from 'react-icons/bs'
import styles from './Signup.module.css'
import logo from '../img/logo.png'

const ChangeInfo = () => {
  const nav = useNavigate()
  const [doubleCheck, setDoubleCheck] = useState(false)
  const [isPwValid, setisPwValid] = useState(true)
  const [isPwSame, setisPwSame] = useState(true)

  const [form, setForm] = useState({
    name: '',
    nick: '',
    password: '',
    checkPw: '',
    studentId: '',
  })

  function handleDoubleCheck() {
    alert('중복확인이 완료되었습니다!')
    setDoubleCheck(true)
  }

  function onChangePW(e: any) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setForm({ ...form, password: passwordCurrent })

    if (!passwordRegex.test(passwordCurrent)) {
      setisPwValid(false)
    } else {
      setisPwValid(true)
    }
  }
  function onChangeCheckPW(e: any) {
    const checkPWCurrent = e.target.value
    setForm({ ...form, checkPw: checkPWCurrent })

    if (checkPWCurrent !== form.password) {
      setisPwSame(false)
    } else {
      setisPwSame(true)
    }
  }

  function handleOnSubmit(e: any) {
    e.prevent.default()
    nav('/signup/completed')
  }

  return (
    <div className={`${styles.container}`}>
      <img className={`${styles.logo}`} src={logo} alt={''} />
      <h1>{'내 정보 변경'}</h1>
      <form>
        <div className={`${styles.signup_input}`}>
          <span>{'이름'}</span>
          <input
            disabled
            type={'text'}
            placeholder={'이름을 입력하세요'}
            name={'name'}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className={`${styles.signup_input}`}>
          <div className={`${styles.signup_head}`}>
            <span>{'닉네임'}</span>
            <span
              className={doubleCheck === false ? `${styles.signup_check}` : `${styles.signup_done}`}
              onClick={handleDoubleCheck}
            >
              <BsCheck2All size={'12'} />
              &nbsp;{'중복확인은 여기를 눌러주세요\r'}
            </span>
          </div>
          <input
            required
            type={'text'}
            placeholder={'닉네임을 입력하세요'}
            name={'nick'}
            value={form.nick}
            maxLength={'30'}
            onChange={(e) => setForm({ ...form, nick: e.target.value })}
          />
        </div>
        <div className={`${styles.signup_input}`}>
          <span>{'학번'}</span>
          <input
            required
            type={'text'}
            placeholder={'학번을 입력하세요'}
            name={'studentId'}
            value={form.studentId}
            maxLength={'10'}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
        </div>
        <button className={`${styles.signup_btn}`} onSubmit={handleOnSubmit}>
          {'내 정보 변경\r'}
        </button>
      </form>
    </div>
  )
}

export default ChangeInfo
