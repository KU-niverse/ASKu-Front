import React, { useState, useEffect } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { FiAlertTriangle, FiAlertCircle } from 'react-icons/fi'
import { BsCheck2All } from 'react-icons/bs'
import axios from 'axios'
import logo from '../img/logo.png'
import styles from './Signup.module.css'
import { KoreapasAgreeComponent } from '../components/KoreapasAgreeComponent'

const Signup = ({ loggedIn, setLoggedIn }: any) => {
  const nav = useNavigate()
  const [nickDoubleCheck, setNickDoubleCheck] = useState(false)
  const [idDoubleCheck, setIdDoubleCheck] = useState(false)
  const [emailDoubleCheck, setEmailDoubleCheck] = useState(false)
  const [isNickValid, setisNickValid] = useState(true)
  const [isIdValid, setisIdValid] = useState(true)
  const [isPwValid, setisPwValid] = useState(true)
  const [isPwSame, setisPwSame] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [clicked, setClicked] = useState(false)
  const location = useLocation()
  const koreapasData = location.state

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
        nav('/')
      } else if (res.status === 401) {
        setLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
    }
  }
  useEffect(() => {
    checkLoginStatus()
  }, [])

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }
  // 비정상적인 접근 차단
  useEffect(() => {
    if (!koreapasData?.uuid) {
      nav('/')
    }
  })
  const [form, setForm] = useState({
    name: '',
    nick: '',
    id: '',
    password: '',
    checkPw: '',
    studentId: '',
    emailId: '',
  })

  const handleNickDoubleCheck = async (e: any) => {
    e.preventDefault()
    if (form.nick.trim() === '') {
      alert('닉네임을 입력해주세요.')
    }
    if (isNickValid === false) {
      alert('닉네임 형식이 올바르지 않습니다.')
    }

    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/nickdupcheck/${form.nick}`)

      if (result.data.success === true) {
        alert(result.data.message)
        setNickDoubleCheck(true)
      } else {
        alert(result.data.message)
        setNickDoubleCheck(false)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  const handleIdDoubleCheck = async (e: any) => {
    e.preventDefault()
    if (form.id.trim() === '') {
      alert('아이디를 입력해주세요.')
    }
    if (isIdValid === false) {
      alert('아이디 형식이 올바르지 않습니다.')
    }
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/iddupcheck/${form.id}`)

      if (result.data.success === true) {
        alert(result.data.message)
        setIdDoubleCheck(true)
      } else {
        alert(result.data.message)
        setIdDoubleCheck(false)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  const handleEmailDoubleCheck = async (e: any) => {
    e.preventDefault()
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_HOST}/user/auth/emaildupcheck/${form.emailId}@korea.ac.kr`,
      )

      if (result.data.success === true) {
        alert(result.data.message)
        setEmailDoubleCheck(true)
      } else {
        alert(result.data.message)
        setEmailDoubleCheck(false)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  function onChangeNick(e: any) {
    const nickRegex = /^[가-힣a-zA-Z]{2,8}$/
    const nickCurrent = e.target.value
    setForm({ ...form, nick: nickCurrent })

    if (!nickRegex.test(nickCurrent)) {
      setisNickValid(false)
    } else {
      setisNickValid(true)
    }
  }

  function onChangeId(e: any) {
    const idRegex = /^[a-zA-Z0-9]{6,15}$/
    const idCurrent = e.target.value
    setForm({ ...form, id: idCurrent })

    if (!idRegex.test(idCurrent)) {
      setisIdValid(false)
    } else {
      setisIdValid(true)
    }
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

  const createUserApi = async (e: any) => {
    e.preventDefault() // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

    // if (isNickValid === false) {
    //   return alert("닉네임 형식이 올바르지 않습니다");
    // } else if (isIdValid === false) {
    //   return alert("아이디 형식이 올바르지 않습니다");
    // } else if (isPwValid === false) {
    //   return alert("비밀번호 형식이 올바르지 않습니다");
    // } else if (isPwSame === false) {
    //   return alert("비밀번호가 일치하지 않습니다");
    // } else if (idDoubleCheck === false) {
    //   return alert("아이디 중복을 확인해주세요");
    // } else if (nickDoubleCheck === false) {
    //   return alert("닉네임 중복을 확인해주세요");
    // } else if (isChecked === false) {
    //   return alert("개인정보 수집에 동의해주십시오");
    // } else if (form.studentId.length != 10) {
    //   return alert("학번을 정학히 입력해주세요"); //힉번 10자리 유효성 검사.
    // }

    setClicked(true)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/auth/signup/koreapas`,
        {
          uuid: koreapasData.uuid,
          nickname: koreapasData.nickname,
          // login_id: form.id,
          // name: form.name,
          // stu_id: form.studentId,
          // email: `${form.emailId}@korea.ac.kr`,
          // password: form.password,
          // nickname: form.nick,
        },
        {
          withCredentials: true,
        },
      )
      if (response.data.success === true) {
        alert(response.data.message)
        setLoggedIn(true)
        nav('/')
      }
    } catch (error) {
      console.error(error)
      nav('/')
      alert(error.response.data.message)
    }
  }

  const handleCancel = () => {
    nav('/')
  }

  const handleExternalLink = () => {
    window.location.href = 'https://034179.notion.site/9ccf1d40d79e47ce8bb78e83d780c052' // 외부 링크 URL로 이동
  }

  return (
    <div className={`${styles.container}`}>
      <img role={'presentation'} className={`${styles.logo}`} src={logo} alt={''} onClick={() => nav('/')} />
      <h1>{'회원가입'}</h1>
      <form onSubmit={createUserApi}>
        <KoreapasAgreeComponent nickname={koreapasData.nickname} />
        {/* <div className={`${styles.signup_input}`}>
          <span>이름</span>
          <input
            required
            type="text"
            placeholder="이름을 입력하세요"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className={`${styles.signup_checkinput}`}>
          <div className={`${styles.signup_head}`}>
            <span>닉네임</span>
            <span
              className={
                isNickValid === false
                  ? `${styles.signup_alert}`
                  : `${styles.signup_done}`
              }
            >
              <FiAlertCircle size="12" />
              2자이상-8자미만, 한글 또는 영문으로 입력해주세요
            </span>
          </div>
          <div className={`${styles.checkInput}`}>
            <input
              required
              type="text"
              placeholder="2-8자 한글 또는 영문으로 입력하세요"
              name="nick"
              value={form.nick}
              maxLength="8"
              onChange={onChangeNick}
              className={`${styles.checkInput}`}
            />
            <button
              className={`${styles.dblcheck}`}
              onClick={handleNickDoubleCheck}
            >
              중복확인
            </button>
          </div>
        </div>
        <div className={`${styles.signup_checkinput}`}>
          <div className={`${styles.signup_head}`}>
            <span>아이디</span>
            <span
              className={
                isIdValid === false
                  ? `${styles.signup_alert}`
                  : `${styles.signup_done}`
              }
            >
              <FiAlertCircle size="12" />
              6자이상-15자미만, 영문, 숫자로 입력해주세요
            </span>
          </div>
          <div className={`${styles.checkInput}`}>
            <input
              required
              type="text"
              placeholder="아이디를 입력하세요"
              name="id"
              value={form.id}
              maxLength="30"
              onChange={onChangeId}
            />
            <button
              className={`${styles.dblcheck}`}
              onClick={handleIdDoubleCheck}
            >
              중복확인
            </button>
          </div>
        </div>
        <div className={`${styles.signup_input}`}>
          <div className={`${styles.signup_head}`}>
            <span>비밀번호</span>
            <span
              className={
                isPwValid === false
                  ? `${styles.signup_alert}`
                  : `${styles.signup_done}`
              }
            >
              <FiAlertCircle size="12" />
              8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요
            </span>
          </div>
          <input
            required
            type="password"
            placeholder="8자이상-20자미만, 영문, 숫자, 특수문자로 입력해주세요"
            name="password"
            value={form.password}
            onChange={onChangePW}
            maxLength="20"
          />
        </div>
        <div className={`${styles.signup_input}`}>
          <div className={`${styles.signup_head}`}>
            <span>비밀번호 재확인</span>
            <span
              className={
                isPwSame === false
                  ? `${styles.signup_alert}`
                  : `${styles.signup_done}`
              }
              onChange={onChangeCheckPW}
            >
              <FiAlertTriangle size="12" />
              비밀번호가 일치하지 않습니다
            </span>
          </div>
          <input
            required
            type="password"
            placeholder="비밀번호를 재입력하세요"
            name="checkPw"
            value={form.checkPw}
            onChange={onChangeCheckPW}
            maxLength="20"
          />
        </div>
        <div className={`${styles.signup_input}`}>
          <span>학번</span>
          <input
            required
            type="text"
            placeholder="학번을 입력하세요"
            name="studentId"
            value={form.studentId}
            maxLength="10"
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
        </div>
        <div className={`${styles.signup_email}`}>
          <div className={`${styles.signup_head}`}>
            <span>학교 이메일</span>
          </div>
          <span>
            <input
              required
              type="text"
              onChange={(e) => setForm({ ...form, emailId: e.target.value })}
            />
            @korea.ac.kr
            <button
              className={`${styles.dblcheck}`}
              onClick={handleEmailDoubleCheck}
            >
              중복확인
            </button>
          </span>

          <span className={`${styles.signup_alert}`}>
            *학교 이메일은 소속학교 인증 및 개인정보 찾기에 이용됩니다
          </span>
        </div>
        <div className={`${styles.signup_agree}`}>
          <span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            개인정보 수집에 동의합니다.
          </span>
          <span onClick={handleExternalLink} className={`${styles.moreLink}`}>
            [더보기]
          </span>
        </div> */}
        {}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            type={'button'}
            value={'취소'}
            className={clicked ? `${styles.hidden}` : `${styles.signup_btn_two}`}
            onClick={handleCancel}
          />
          <input
            type={'submit'}
            value={'동의하기'}
            className={clicked ? `${styles.hidden}` : `${styles.signup_btn}`}
            style={{ marginLeft: '30px' }}
          />
        </div>

        <div className={clicked ? `${styles.signup_btn_two}` : `${styles.hidden}`}>{' 처리중'}</div>
        <div className={clicked ? `${styles.findAlertTwo}` : `${styles.hidden}`}>
          {'처리중입니다. 잠시만 기다려주세요. (5-10초정도 소요됩니다)\r'}
        </div>
      </form>
    </div>
  )
}

export default Signup
