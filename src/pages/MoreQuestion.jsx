import React from "react";
import styles from "./MoreQuestion.module.css";
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from "../components/Switch";
import QuestionInput from "../components/QuestionInput";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SpinnerMypage from "../components/SpinnerMypage";
import { track } from "@amplitude/analytics-browser";

const MoreQuestion = () => {
  const { title } = useParams();
  const [currentUserId, setCurrentUserId] = useState([]);
  const [data, setData] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [section, setSection] = useState("");
  const location = useLocation();
  const defaultOpt = location.state;
  const [titles, setTitles] = useState([]); // 문서 목록 상태 추가
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_HOST + "/user/mypage/info",
        {
          withCredentials: true,
        }
      );
      if (res.status === 201 && res.data.success === true) {
        // 사용자 정보에서 id를 가져옴
        setCurrentUserId(res.data);
      } else {
        setCurrentUserId(null);
      }
    } catch (error) {
      console.error(error);
      setCurrentUserId(null);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    track("click_more_quesiton_in_wiki", {
      title: title,
    });
  }, [title]);

  //접속한 사용자 id 가져오기

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + "/wiki/titles"
        );
        if (res.data.success) {
          setTitles(res.data.titles);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const takeQuestion = async () => {
      try {
        const flag = isToggled ? 1 : 0;
        const res = await axios.get(
          process.env.REACT_APP_HOST +
            `/question/view/${flag}/${encodeURIComponent(title)}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setQuestionData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTitles();
    if (title) {
      takeQuestion();
    }
  }, [title, isToggled]);

  const handleQuestionSubmit = async (submitData) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_HOST +
          `/question/new/${encodeURIComponent(title)}`,
        submitData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setData(res.data);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.status === 500) {
        //console.log(error.data.message);
        alert(error.data.message);
      }
    }
  }; //질문 생성하기

  if (loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        {/* 문서 목록에 title이 포함되지 않으면 메시지 표시 */}
        {titles.includes(title) ? (
          <div>
            <div className={styles.header}>
              <div className={styles.frontheader}>
                <p className={styles.q_pagename}>{title}</p>
                <p className={styles.q_headline}>문서의 질문</p>
              </div>
              <div className={styles.switch}>
                <Switch
                  isToggled={isToggled}
                  onToggle={() => setIsToggled(!isToggled)}
                />
              </div>
            </div>
            <div>
              <QuestionInput
                onQuestionSubmit={handleQuestionSubmit}
                title={title}
                defaultOpt={defaultOpt}
              />
            </div>
            <div>
              {questionData &&
              questionData.data &&
              questionData.data.length === 0 ? (
                <p>아직 작성한 질문이 없습니다.</p>
              ) : (
                questionData &&
                questionData.data &&
                questionData.data.map((data, index) => (
                  <Question
                    current_user_id={
                      currentUserId &&
                      currentUserId.data &&
                      currentUserId.data[0]
                        ? currentUserId.data[0].id
                        : null
                    }
                    key={data.id}
                    index={index}
                    id={data.id}
                    doc_id={data.doc_id}
                    user_id={data.user_id}
                    index_title={data.index_title}
                    content={data.content}
                    created_at={data.created_at}
                    answer_or_not={data.answer_or_not}
                    is_bad={data.is_bad}
                    nick={data.nickname}
                    like_count={data.like_count}
                    title={title}
                    answer_count={data.answer_count}
                    badge_image={data.badge_image}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <p>존재하지 않는 문서입니다.</p>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MoreQuestion;
