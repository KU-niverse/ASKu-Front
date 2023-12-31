import React from "react";
import styles from "./QnA.module.css";
import Header from "../components/Header";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Switch from "../components/Switch";
import { useState } from "react";
import comment_icon from "../img/comment_icon.png";
import CommentQna from "../components/CommentQna";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import QuestionQnA from "../components/QuestionQnA";
import link_icon from "../img/link_icon.png";
import { useNavigate } from "react-router-dom";
const QnA = () => {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [currentUserId, setCurrentUserId] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const location = useLocation();
  const stateData = location.state;
  // const question_id = stateData.question_id;
  const { title } = useParams();
  const { question_id } = useParams();
  const nav = useNavigate();
  const linktoWiki = () => {
    const encodedTitle = encodeURI(title);
    console.log("🚀 ~ file: QnA.jsx:29 ~ linktoWiki ~ title:", title)
    console.log("🚀 ~ file: QnA.jsx:29 ~ linktoWiki ~ encodedTitle:", encodedTitle)
    nav(`/wiki/${encodedTitle}`);
  };

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
      setCurrentUserId(null)
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  //접속한 사용자 id 가져오기





  useEffect(() => {
    const takeAnswer = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + `/question/answer/${question_id}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setAnswerData(res.data);
        }
        if (res.status === 500) {
        }
      } catch (error) {
        console.error(error);
      }
    };
    takeAnswer();
  }, [question_id]);

  useEffect(() => {
    const takeQuestion = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + `/question/lookup/${question_id}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setQuestionData(res.data);
        }
        if (res.status === 500) {
        }
      } catch (error) {
        console.error(error);
      }
    };
    takeQuestion();
  }, [question_id]);

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.frontheader}>
            <p className={styles.q_pagename}>{title}</p>
            <p className={styles.q_headline}>문서의 질문</p>
          </div>
          <div className={styles.backheader}>
            <button onClick={linktoWiki} className={styles.q_editbtn}>
              <img src={link_icon} alt="link_icon" />
              <span className={styles.q_linkbtn}>문서 바로가기</span>
            </button>
          </div>
          {/* <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div> */}
        </div>
        {questionData && questionData.data && (
          <QuestionQnA
            question_id={question_id}
            user_id={questionData.data[0].user_id}
            nick={questionData.data[0].nickname}
            content={questionData.data[0].content}
            like_count={questionData.data[0].like_count}
            created_at={questionData.data[0].created_at}
            index_title={questionData.data[0].index_title}
            answer_count={questionData.data[0].answer_count}
            title={title}
            badge_image={questionData.data[0].badge_image}
            current_user_id={currentUserId && currentUserId.data && currentUserId.data[0] ? currentUserId.data[0].id : null}
          />
        )}
        <div className={styles.c_header}>
          <img src={comment_icon} alt="comment" />
          <span className={styles.c_headline}>답변</span>
          {questionData && questionData.data && (
            <span className={styles.c_num}>
              {questionData.data[0].answer_count}
            </span>
          )}
          {answerData && answerData.data && answerData.data.length === 0 ? (
            <p className={styles.no_answer}>아직 작성된 답변이 없습니다.</p>
          ) : (
            answerData &&
            answerData.data &&
            answerData.data.map((data) => (
              <CommentQna
                id={data.id}
                wiki_history_id={data.wiki_history_id}
                question_id={data.question_id}
                created_at={data.created_at}
                user_id={data.user_id}
                nickname={data.nickname}
                rep_badge={data.rep_badge}
                badge_image={data.badge_image}
                title={data.title}
                content={data.content}
                index_title={data.index_title}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default QnA;
