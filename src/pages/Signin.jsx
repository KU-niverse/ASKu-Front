import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";
import logo from "../img/logo.png";
import haho_login from "../img/login.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = ({ loggedIn, setLoggedIn }) => {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const LS_KEY_ID = "LS_KEY_ID"; //로컬스토리지에 저장할 키
  const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG"; //아이디 저장하기 체크여부
  const [saveIDFlag, setSaveIDFlag] = useState(false);

  window.onpopstate = function (event) {
    // 뒤로 가기 버튼 클릭 시 새로고침하고자 하는 동작 수행
    window.location.reload();
  }

  //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_HOST + "/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
        nav("/");
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // //아이디 기억하기 체크 여부
  // const handleSaveIDFlag = () => {
  //     console.log('전' , saveIDFlag);
  //     setSaveIDFlag(prev => !prev);
  //     console.log('후', saveIDFlag);
  // }

  // 아이디 기억하기 체크 여부
  const handleSaveIDFlag = () => {
    const newFlag = !saveIDFlag;
    setSaveIDFlag(newFlag);

    // 아이디 저장하기 체크 여부를 로컬 스토리지에 저장
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, JSON.stringify(newFlag));

    // 아이디 저장하기 체크를 해제할 때 아이디 삭제
    if (!newFlag) {
      localStorage.removeItem(LS_KEY_ID);
    }
  };

  // //아이디 기억하기
  // useEffect(() => {
  //     let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
  //     if (idFlag !== null) setSaveIDFlag(idFlag);
  //     if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");

  //     let data = localStorage.getItem(LS_KEY_ID);
  //     if (data !== null) setId(data);
  //   }, []);

  // 자동으로 체크박스 설정 및 아이디 불러오기
  useEffect(() => {
    const idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) {
      setSaveIDFlag(idFlag);

      // 아이디 저장하기 체크가 되어 있고, 저장된 아이디가 있으면 아이디를 설정합니다.
      if (idFlag) {
        const data = localStorage.getItem(LS_KEY_ID);
        if (data !== null) {
          setId(data);
        }
      }
    }
  }, []);

  //로그인
  const userLogin = async () => {
    if (saveIDFlag) {
      localStorage.setItem(LS_KEY_ID, id);
    } else {
      localStorage.removeItem(LS_KEY_ID);
    }


    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + "/user/auth/signin",
        {
          login_id: id,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        //로그인 성공시
        if (saveIDFlag) localStorage.setItem(LS_KEY_ID, id);
        nav("/");
      } 
      else {
        return null;
      }
    } catch (error) {
      if (error.response.status === 402){
        
        //signup페이지에 resopnase.data를 같이 넘겨줌
        nav("/signup", {state: {uuid: error.response.data.koreapas_uuid, nickname: error.response.data.koreapas_nickname}});
      }
      console.error(error);
      return alert(error.response.data.message);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (id === "") {
      return alert("아이디를 입력해주세요.");
    } else if (password === "") {
      return alert("비밀번호를 입력해주세요.");
    }
    userLogin();
  };

  return (
    <div className={`${styles.container}`}>
      <img
        className={`${styles.logo}`}
        src={logo}
        alt="logo"
        onClick={() => nav("/")}
      />
      <img className={`${styles.haho}`} src={haho_login} alt="haho" />
      <h1 className={styles.login_headers}>LOGIN</h1>
      <p className={styles.login_instruction}>고파스 계정으로 바로 로그인하세요!</p>
      <form onSubmit={handleOnSubmit}>
        <div className={`${styles.login_input}`}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className={`${styles.login_remem}`}>
          <span className={`${styles.id_rem}`}>
            <input
              type="checkbox"
              id="chkbox"
              checked={saveIDFlag}
              onChange={handleSaveIDFlag}
            />
            <span>아이디 기억하기</span>
          </span>
        </div>
        <button className={`${styles.login_btn}`} type="submit">
          고파스 아이디로 로그인
        </button>
      </form>
      <div className={`${styles.login_signup}`}>
        {/* <Link to="/signup">회원가입</Link> */}
        <a href="https://www.koreapas.com/m/member_join_new.php">고파스 회원가입</a>
      </div>
      <div className={`${styles.login_find}`}>
        {/* <Link to="/findid">아이디를 잊으셨나요?</Link> */}
        {/* <Link to="/findpw">비밀번호를 잊으셨나요?</Link> */}
        <a href="https://www.koreapas.com/bbs/lostid_new.php">아이디를 잊으셨나요?</a>
        <a href="https://www.koreapas.com/bbs/lostid_new.php">비밀번호를 잊으셨나요?</a>
      </div>
    </div>
  );
};

export default Signin;
