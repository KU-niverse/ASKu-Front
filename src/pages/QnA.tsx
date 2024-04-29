import React from "react";
// @ts-expect-error TS(2307): Cannot find module './QnA.module.css' or its corre... Remove this comment to see the full error message
import styles from "./QnA.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Question' was resolved to 'C... Remove this comment to see the full error message
import Question from "../components/Question";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
// @ts-expect-error TS(6142): Module '../components/Switch' was resolved to 'C:/... Remove this comment to see the full error message
import Switch from "../components/Switch";
import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module '../img/comment_icon.png' or it... Remove this comment to see the full error message
import comment_icon from "../img/comment_icon.png";
// @ts-expect-error TS(6142): Module '../components/CommentQna' was resolved to ... Remove this comment to see the full error message
import CommentQna from "../components/CommentQna";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/QuestionQnA' was resolved to... Remove this comment to see the full error message
import QuestionQnA from "../components/QuestionQnA";
// @ts-expect-error TS(2307): Cannot find module '../img/link_icon.png' or its c... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    const encodedTitle = encodeURIComponent(title);

    nav(`/wiki/${encodedTitle}`);
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + "/user/mypage/info",
        {
          withCredentials: true,
        }
      );
      if (res.status === 201 && res.data.success === true) {
        // 사용자 정보에서 id를 가져옴
        setCurrentUserId(res.data);
      } else {
        // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
        setCurrentUserId(null);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/question/lookup/${question_id}`,
          { withCredentials: true }
        );
        console.log("🚀 ~ file: QnA.jsx:89 ~ takeQuestion ~ res:", res)
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.content}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.header}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.frontheader}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.q_pagename}>{title}</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.q_headline}>문서의 질문</p>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.backheader}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button onClick={linktoWiki} className={styles.q_editbtn}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img src={link_icon} alt="link_icon" />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.q_linkbtn}>문서 바로가기</span>
            </button>
          </div>
          {/* <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div> */}
        </div>
        // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
        {questionData && questionData.data && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <QuestionQnA
            question_id={question_id}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            user_id={questionData.data[0].user_id}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            nick={questionData.data[0].nickname}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            content={questionData.data[0].content}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            like_count={questionData.data[0].like_count}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            created_at={questionData.data[0].created_at}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            index_title={questionData.data[0].index_title}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            answer_count={questionData.data[0].answer_count}
            title={title}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            badge_image={questionData.data[0].badge_image}
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            current_user_id={currentUserId && currentUserId.data && currentUserId.data[0] ? currentUserId.data[0].id : null}
          />
        )}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.c_header}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={comment_icon} alt="comment" />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.c_headline}>답변</span>
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
          {questionData && questionData.data && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.c_num}>
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              {questionData.data[0].answer_count}
            </span>
          )}
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
          {answerData && answerData.data && answerData.data.length === 0 ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.no_answer}>아직 작성된 답변이 없습니다.</p>
          ) : (
            answerData &&
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            answerData.data &&
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            answerData.data.map((data: any) => <CommentQna
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
            />)
          )}
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer />
      </div>
    </div>
  );
};

export default QnA;
