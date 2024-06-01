import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo_big.png";
import styles from "./Home.module.css";
import searchIcon from "../img/search_icon.svg";
import chatBotBtn from "../img/chatBotBtn.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { track } from "@amplitude/analytics-browser";

function Home({ loggedIn, setLoggedIn }) {
  const [inputValue, setInputValue] = useState("");
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
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
  // Amplitude
  useEffect(() => {
    track("view_home");
  }, []);

  return (
    <div className={styles.pageWrap}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className={styles.homeWrap}>
        <div className={styles.inputContainer}>
          <img src={logo} className={styles.logo} alt="logo" />
          <input
            className={styles.searchInput}
            placeholder="Wiki 검색어를 입력하세요."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // 엔터키를 누를 때
                e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
                if (inputValue.trim() !== "") {
                  window.location.href = `/result/${encodeURIComponent(
                    inputValue
                  )}/${encodeURIComponent(`search`)}`; // 페이지 이동
                  setInputValue("");
                }
              }
            }}
          />
          <img
            src={searchIcon}
            alt="icon"
            className={styles.searchIcon}
            onClick={() => {
              if (inputValue.trim() !== "") {
                window.location.href = `/result/${encodeURIComponent(
                  inputValue
                )}/${encodeURIComponent(`search`)}`; // 페이지 이동
                setInputValue("");
              }
            }}
          />
        </div>
        <div className={styles.chatBotContainer}>
          <Chatbot isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Link to="/chatbot">
            <img src={chatBotBtn} alt="button" className={styles.chatBotBtn} />
          </Link>
          <div className={styles.realTime}>
            <div className={styles.keyWord}>
              <p className={styles.realTimeTitle}>실시간 인기 검색어</p>
              {popularKeywords.slice(0, 5).map((keyword, index) => (
                //TODO: 이부분 링크 인코딩 안 해도 제대로 가는지 확인
                <Link
                  to={`/result/${encodeURIComponent(keyword.keyword).replace(
                    /\./g,
                    "%2E"
                  )}/${encodeURIComponent(`popularsearch`)}`}
                  className={styles.rankWrap}
                  key={index}
                  onClick={() => {
                    track("click_trend_search_keyword", {
                      search_rank: index + 1,
                      search_keyword: keyword.keyword,
                    });
                  }}
                >
                  <p className={styles.numberIcon}>{index + 1}.</p>
                  <p className={styles.rankContent}>{keyword.keyword}</p>
                </Link>
              ))}
            </div>
            <div className={styles.question}>
              <p className={styles.realTimeTitle}>실시간 인기 질문</p>
              {popularQuestions.map((question, index) => (
                //TODO: 이부분 링크 인코딩 안 해도 제대로 가는지 확인
                <Link
                  to={`wiki/morequestion/${encodeURIComponent(
                    question.title
                  )}/${question.id}`}
                  state={{
                    question_id: question.id,
                    user_id: question.user_id,
                    content: question.content,
                    created_at: question.created_at,
                    like_count: question.like_count,
                    nick: question.nickname,
                    index_title: question.index_title,
                    answer_count: question.answer_count,
                    title: question.title,
                  }}
                  className={styles.rankWrap}
                  key={index}
                  onClick={() => {
                    track("click_trend_search_question", {
                      question_rank: index + 1,
                      question_title: question.content,
                    });
                  }}
                >
                  <p className={styles.numberIcon}>Q.</p>
                  <p className={styles.rankContent}>{question.content}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
