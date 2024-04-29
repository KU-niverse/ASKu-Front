// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
// @ts-expect-error TS(6142): Module '../components/Chatbot' was resolved to 'C:... Remove this comment to see the full error message
import Chatbot from "../components/Chatbot";
import { Link, useNavigate } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module '../img/logo_big.png' or its co... Remove this comment to see the full error message
import logo from "../img/logo_big.png";
// @ts-expect-error TS(2307): Cannot find module './Home.module.css' or its corr... Remove this comment to see the full error message
import styles from "./Home.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/search_icon.svg' or its... Remove this comment to see the full error message
import searchIcon from "../img/search_icon.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/chatBotBtn.png' or its ... Remove this comment to see the full error message
import chatBotBtn from "../img/chatBotBtn.png";
import axios from "axios";
import { useState, useEffect } from "react";

function Home({
  loggedIn,
  setLoggedIn
}: any) {
  const [inputValue, setInputValue] = useState("");
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + "/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setIsLoggedIn(true);
      } else if (res.status === 401) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchPopularKeywords = async () => {
      try {
        const response = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + "/search/popular"
        );
        if (response.data.success) {
          setPopularKeywords(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularKeywords();
  }, []);
  useEffect(() => {
    const fetchPopularQuestions = async () => {
      try {
        const response = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + "/question/popular"
        );
        if (response.data.success) {
          setPopularQuestions(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularQuestions();
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="pageWrap">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.homeWrap}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img src={logo} className={styles.logo} alt="logo" />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.inputContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input
            className={styles.searchInput}
            placeholder="검색어를 입력하세요."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // 엔터키를 누를 때
                e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
                if (inputValue.trim() !== "") {
                  window.location.href = `/result/${encodeURIComponent(
                    inputValue
                  )}`; // 페이지 이동
                  setInputValue("");
                }
              }
            }}
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img
            src={searchIcon}
            alt="icon"
            className={styles.searchIcon}
            onClick={() => {
              if (inputValue.trim() !== "") {
                window.location.href = `/result/${encodeURIComponent(
                  inputValue
                )}`; // 페이지 이동
                setInputValue("");
              }
            }}
          />
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.chatBotContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Chatbot isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link to="/chatbot">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={chatBotBtn} alt="button" className={styles.chatBotBtn} />
          </Link>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.realTime}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.keyWord}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className={styles.realTimeTitle}>실시간 인기 검색어</p>
              {popularKeywords.slice(0, 5).map((keyword, index) => (
                //TODO: 이부분 링크 인코딩 안 해도 제대로 가는지 확인
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link
                  // @ts-expect-error TS(2339): Property 'keyword' does not exist on type 'never'.
                  to={`/result/${encodeURIComponent(keyword.keyword).replace(
                    /\./g,
                    "%2E"
                  )}`}
                  className={styles.rankWrap}
                  key={index}
                >
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p className={styles.numberIcon}>{index + 1}.</p>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p className={styles.rankContent}>{keyword.keyword}</p>
                </Link>
              ))}
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.question}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className={styles.realTimeTitle}>실시간 인기 질문</p>
              {popularQuestions.map((question, index) => (
                //TODO: 이부분 링크 인코딩 안 해도 제대로 가는지 확인
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link
                  // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                  to={`wiki/morequestion/${encodeURIComponent(question.title)}/${question.id}`}
                  state={{
                    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                    question_id: question.id,
                    // @ts-expect-error TS(2339): Property 'user_id' does not exist on type 'never'.
                    user_id: question.user_id,
                    // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                    content: question.content,
                    // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
                    created_at: question.created_at,
                    // @ts-expect-error TS(2339): Property 'like_count' does not exist on type 'neve... Remove this comment to see the full error message
                    like_count: question.like_count,
                    // @ts-expect-error TS(2339): Property 'nickname' does not exist on type 'never'... Remove this comment to see the full error message
                    nick: question.nickname,
                    // @ts-expect-error TS(2339): Property 'index_title' does not exist on type 'nev... Remove this comment to see the full error message
                    index_title: question.index_title,
                    // @ts-expect-error TS(2339): Property 'answer_count' does not exist on type 'ne... Remove this comment to see the full error message
                    answer_count: question.answer_count,
                    // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                    title: question.title,
                  }}
                  className={styles.rankWrap}
                  key={index}
                >
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p className={styles.numberIcon}>Q.</p>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p className={styles.rankContent}>{question.content}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer />
    </div>
  );
}

export default Home;
