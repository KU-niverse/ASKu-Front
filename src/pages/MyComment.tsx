import React, { Component } from "react";
// @ts-expect-error TS(2307): Cannot find module './MyComment.module.css' or its... Remove this comment to see the full error message
import styles from "./MyComment.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Comment' was resolved to 'C:... Remove this comment to see the full error message
import Comment from "../components/Comment";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import { useState } from "react";
// @ts-expect-error TS(6142): Module '../components/Switch' was resolved to 'C:/... Remove this comment to see the full error message
import Switch from "../components/Switch";
import { useEffect } from "react";
import axios from "axios";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";

function MyComment() {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현
  const [loadingMyDebate, setLoadingMyDebate] = useState(true);
  const [loadingMypage, setLoadingMypage] = useState(true);

  //토론 기록 불러오기
  const [myDebate, setMyDebate] = useState([]);
  useEffect(() => {
    const takeMyDebate = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST+`/user/mypage/debatehistory`,
          { withCredentials: true }
        );
        if (res.status === 201) {
          setMyDebate(res.data);
          setLoadingMyDebate(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
        if (res.status === 500) {
        }
      } catch (error) {
        console.error(error);
        setLoadingMyDebate(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
      }
    };
    takeMyDebate();
  }, []);

  //내 정보 불러오기
  const [mypageData, setMypageData] = useState([]);
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
          setLoadingMypage(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
        if (res.status === 401) {
        }
        if (res.status === 500) {
        }
      } catch (error) {
        console.error(error);
        setLoadingMypage(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
      }
    };
    takeMypage();
  }, []); // 종속성 배열이 비어있으므로 이 useEffect는 한 번만 실행

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </div>
      {loadingMyDebate || loadingMypage ? (
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
            <p className={styles.comment}>내가 쓴 토론</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.switch}>
              {/* <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/> */}
            </div>
          </div>
          {mypageData &&
          myDebate &&
          // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
          myDebate.message &&
          // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
          myDebate.message.length === 0 ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>아직 작성한 토론이 없습니다.</p>
          ) : (
            mypageData &&
            myDebate &&
            // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
            myDebate.message &&
            // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
            myDebate.message.map((debate: any) => <Comment
              key={debate.debate_id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
              id={debate.debate_id}
              subject={debate.debate_subject}
              content={debate.debate_content}
              created_at={debate.debate_content_time}
              is_bad={debate.is_bad}
              docsname={debate.doc_title}
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              nick={mypageData.data[0].nickname}
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

export default MyComment;
