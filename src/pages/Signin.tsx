import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import styles from './Signin.module.css'
import logo from '../img/logo.png'
import haho_login from '../img/login.png'

interface SigninProps {
  loggedIn: boolean
  setLoggedIn: (loggedIn: boolean) => void
}

const LS_KEY_ID = 'LS_KEY_ID' // 로컬스토리지에 저장할 키
const LS_KEY_SAVE_ID_FLAG = 'LS_KEY_SAVE_ID_FLAG' // 아이디 저장하기 체크여부

const fetchLoginStatus = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return response.data
}

const Signin = ({ loggedIn, setLoggedIn }: SigninProps) => {
  const nav = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [saveIDFlag, setSaveIDFlag] = useState(false)

  window.onpopstate = function (event) {
    // 뒤로 가기 버튼 클릭 시 새로고침하고자 하는 동작 수행
    window.location.reload()
  }

  // Amplitude
  useEffect(() => {
    track('view_login')
  }, [])

  const {
    data: loginStatus,
    isLoading: isLoadingLoginStatus,
    isError: isErrorLoginStatus,
  } = useQuery('loginStatus', fetchLoginStatus, {
    onSuccess: (loginStatusData) => {
      if (loginStatusData.success) {
        setLoggedIn(true)
        nav('/')
        track('complete_login')
      } else {
        setLoggedIn(false)
      }
    },
    onError: (error) => {
      console.error(error)
      setLoggedIn(false)
    },
  })

  const mutation = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/auth/signin`,
        {
          login_id: id,
          password,
        },
        {
          withCredentials: true,
        },
      )
      return response.data
    },
    {
      onSuccess: (loginData) => {
        if (loginData.success) {
          if (saveIDFlag) localStorage.setItem(LS_KEY_ID, id)
          track('complete_login')
          nav('/')
        }
      },
      onError: (error: any) => {
        if (error.response.status === 402 || error.response.status === 406) {
          nav('/signup', {
            state: {
              uuid: error.response.data.koreapas_uuid,
              nickname: error.response.data.koreapas_nickname,
            },
          })
        }
        console.error(error)
        alert(error.response.data.message)
      },
    },
  )

  const handleSaveIDFlag = () => {
    const newFlag = !saveIDFlag
    setSaveIDFlag(newFlag)
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, JSON.stringify(newFlag))
    if (!newFlag) {
      localStorage.removeItem(LS_KEY_ID)
    }
  }

  useEffect(() => {
    const idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG) || 'false')
    setSaveIDFlag(idFlag)
    if (idFlag) {
      const storedId = localStorage.getItem(LS_KEY_ID)
      if (storedId) {
        setId(storedId)
      }
    }
  }, [])

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (id === '') {
      alert('아이디를 입력해주세요.')
      return
    }
    if (password === '') {
      alert('비밀번호를 입력해주세요.')
      return
    }
    mutation.mutate()
  }

  return (
    <div className={styles.container}>
      <img role={'presentation'} className={styles.logo} src={logo} alt={'logo'} onClick={() => nav('/')} />
      <img className={styles.haho} src={haho_login} alt={'haho'} />
      <h1 className={styles.login_headers}>{'LOGIN'}</h1>
      <p className={styles.login_instruction}>{'고파스 계정으로 바로 로그인하세요!'}</p>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.login_input}>
          <input type={'text'} value={id} onChange={(e) => setId(e.target.value)} placeholder={'아이디를 입력하세요'} />
          <input
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'비밀번호를 입력하세요'}
          />
        </div>
        <div className={styles.login_remem}>
          <span className={styles.id_rem}>
            <input type={'checkbox'} id={'chkbox'} checked={saveIDFlag} onChange={handleSaveIDFlag} />
            <span>{'아이디 기억하기'}</span>
          </span>
        </div>
        <button className={styles.login_btn} type={'submit'}>
          {'로그인\r'}
        </button>
      </form>
      <div className={styles.login_signup}>
        <a href={'https://www.koreapas.com/m/member_join_new.php'}>{'고파스 회원가입'}</a>
      </div>
      <div className={styles.login_find}>
        <a href={'https://www.koreapas.com/bbs/lostid_new.php'}>{'아이디를 잊으셨나요?'}</a>
        <a href={'https://www.koreapas.com/bbs/lostid_new.php'}>{'비밀번호를 잊으셨나요?'}</a>
      </div>
    </div>
  )
}

export default Signin
