import React from "react";
// @ts-expect-error TS(2307): Cannot find module './MoreQuestion.module.css' or ... Remove this comment to see the full error message
import styles from "./MoreQuestion.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Question' was resolved to 'C... Remove this comment to see the full error message
import Question from "../components/Question";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
// @ts-expect-error TS(6142): Module '../components/Switch' was resolved to 'C:/... Remove this comment to see the full error message
import Switch from "../components/Switch";
// @ts-expect-error TS(6142): Module '../components/QuestionInput' was resolved ... Remove this comment to see the full error message
import QuestionInput from "../components/QuestionInput";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";

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
    const fetchTitles = async () => {
      try {
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        const res = await axios.get(process.env.REACT_APP_HOST + "/wiki/titles");
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
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/question/view/${flag}/${encodeURIComponent(title)}`,
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

  const handleQuestionSubmit = async (submitData: any) => {
    try {

      const res = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/question/new/${encodeURIComponent(title)}`,
        submitData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setData(res.data);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.status === 500) {
        //console.log(error.data.message);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.data.message);
      }
    }
  }; //질문 생성하기

  if (loading) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SpinnerMypage />
      </div>
    );
  }

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
        {/* 문서 목록에 title이 포함되지 않으면 메시지 표시 */}
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        {titles.includes(title) ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div>
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
              <div className={styles.switch}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Switch
                  isToggled={isToggled}
                  onToggle={() => setIsToggled(!isToggled)}
                />
              </div>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <QuestionInput
                onQuestionSubmit={handleQuestionSubmit}
                title={title}
                defaultOpt={defaultOpt}
              />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              {questionData &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                questionData.data &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                questionData.data.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>아직 작성한 질문이 없습니다.</p>
              ) : (
                questionData &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                questionData.data &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                questionData.data.map((data: any) => <Question
                  // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                  current_user_id={currentUserId && currentUserId.data && currentUserId.data[0] ? currentUserId.data[0].id : null}
                  key={data.id}
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
                />)
              )}
            </div>
          </div>
        ) : (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p>존재하지 않는 문서입니다.</p>
        )}
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer />
      </div>
    </div>
  );
};

export default MoreQuestion;
