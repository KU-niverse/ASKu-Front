import React, { Component } from "react";
// @ts-expect-error TS(2307): Cannot find module './MyQuestion.module.css' or it... Remove this comment to see the full error message
import styles from "./MyQuestion.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/MyQuestionList' was resolved... Remove this comment to see the full error message
import MyQuestionList from "../components/MyQuestionList";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import { useState } from "react";
// @ts-expect-error TS(6142): Module '../components/Switch' was resolved to 'C:/... Remove this comment to see the full error message
import Switch from "../components/Switch";
import { useEffect } from "react";
import axios from "axios";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";

function MyQuestion() {
  const [isToggled, setIsToggled] = useState(false);
  const [myQuestion, setMyQuestion] = useState([]);
  const [mypageData, setMypageData] = useState([]);
  const [loadingMyQuestion, setLoadingMyQuestion] = useState(true);
  const [loadingMypage, setLoadingMypage] = useState(true);
  const arrange = isToggled ? "popularity" : "latest";

  useEffect(() => {
    const takeMyQuestion = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST+`/user/mypage/questionhistory/${arrange}`,
          { withCredentials: true }
        );
        if (res.status === 201) {
          setMyQuestion(res.data);
          setLoadingMyQuestion(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingMyQuestion(false);
      }
    };
    takeMyQuestion();
  }, [arrange]);

  useEffect(() => {
    const takeMypage = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST+`/user/mypage/info`,
          { withCredentials: true }
        );
        if (res.status === 201) {
          setMypageData(res.data);
          setLoadingMypage(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingMypage(false);
      }
    };
    takeMypage();
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </div>
      {loadingMyQuestion || loadingMypage ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SpinnerMypage />
        </div>
      ) : (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.content}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.header}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.question}>내가 쓴 질문</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.switch}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Switch
                isToggled={isToggled}
                onToggle={() => setIsToggled(!isToggled)}
              />
            </div>
          </div>
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
          {mypageData.data &&
          myQuestion &&
          // @ts-expect-error TS(2339): Property 'success' does not exist on type 'never[]... Remove this comment to see the full error message
          myQuestion.success &&
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
          myQuestion.data.length === 0 ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>아직 작성한 질문이 없습니다.</p>
          ) : (
            mypageData &&
            myQuestion &&
            // @ts-expect-error TS(2339): Property 'success' does not exist on type 'never[]... Remove this comment to see the full error message
            myQuestion.success &&
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            myQuestion.data.map((question: any) => <MyQuestionList
              key={question.id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
              id={question.id}
              doc_id={question.doc_id}
              user_id={question.user_id}
              index_title={question.index_title}
              content={question.content}
              created_at={question.created_at}
              answer_or_not={question.answer_or_not}
              is_bad={question.is_bad}
              docsname={question.doc_title}
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              nick={mypageData.data[0].nickname}
              like_count={question.like_count}
              answer_count={question.answer_count}
              badge_image={question.badge_image}
            />)
          )}
        </div>
      )}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer />
      </div>
    </div>
  );
}

export default MyQuestion;
