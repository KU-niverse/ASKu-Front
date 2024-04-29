import React from "react";
// @ts-expect-error TS(2307): Cannot find module './Debate.module.css' or its co... Remove this comment to see the full error message
import styles from "./Debate.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateTitle' was reso... Remove this comment to see the full error message
import DebateTitle from "../components/Debate/DebateTitle";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateContent' was re... Remove this comment to see the full error message
import DebateContent from "../components/Debate/DebateContent";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateInput' was reso... Remove this comment to see the full error message
import DebateInput from "../components/Debate/DebateInput";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateSearch' was res... Remove this comment to see the full error message
import DebateSearch from "../components/Debate/DebateSearch";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateAdd' was resolv... Remove this comment to see the full error message
import DebateAdd from "../components/Debate/DebateAdd";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateRecent' was res... Remove this comment to see the full error message
import DebateRecent from "../components/Debate/DebateRecent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Debate() {
  const [data, setData] = useState(null);
  const [debateContentData, setDebateContentData] = useState([]);
  const location = useLocation();
  const stateData = location.state;
  const debateId = stateData.id;
  const title = stateData.title;
  const subject = stateData.subject;

  useEffect(() => {
    const takeDebateContent = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/debate/view/${encodeURIComponent(title)}/${debateId}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setDebateContentData(res.data);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    takeDebateContent();
  }, [title, debateId]); //토론방 메시지 가져오기

  // const handleDebateSubmit = async (submitData) => {
  //   try {
  //     const res = await axios.post(
  //       process.env.REACT_APP_HOST+`/debate/${title}/new/${debateId}`,
  //       submitData,
  //       { withCredentials: true }
  //     );
  //     if (res.status === 200) {
  //       setData(res.data);
  //       // alert(res.data.message)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response.status === 500) {
  //       console.log(error.response.data.message);
  //       alert(error.response.data.message);
  //     }
  //   }
  // }; //토론 메세지 생성하기
  const handleDebateSubmit = async (submitData: any) => {
    try {
      const postResponse = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/debate/${encodeURIComponent(title)}/new/${debateId}`,
        submitData,
        { withCredentials: true }
      );

      if (postResponse.status === 200) {
        // POST 요청이 성공한 후 전체 메시지 목록을 다시 가져옵니다.
        const getResponse = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/debate/view/${encodeURIComponent(title)}/${debateId}`,
          { withCredentials: true }
        );

        if (getResponse.status === 200) {
          // 전체 메시지 목록으로 상태를 업데이트합니다.
          setDebateContentData(getResponse.data);
        }
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.status === 500) {
        //console.log(error.response.data.message);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
      }
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </div>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className={styles.debate}>토론 ({title})</p>
      </div>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.debatecontent}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.maincontent}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <DebateTitle title={title} subject={subject} />

          {debateContentData &&
            // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
            debateContentData.message &&
            // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
            debateContentData.message.data === 0 ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>아직 작성된 토론 메세지가 없습니다.</p>
          ) : (
            debateContentData &&
            // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
            debateContentData.message &&
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            debateContentData.data.map((debate: any, index: any) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <DebateContent
                key={debate.id}
                r_id={debate.id}
                id={index + 1}
                user_id={debate.user_id}
                content={debate.content}
                created_at={debate.created_at}
                is_bad={debate.is_bad}
                nick={debate.nickname}
                badge_image={debate.badge_image}
              />
            ))
          )}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.input}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DebateInput
              onDebateSubmit={handleDebateSubmit}
              title={title}
              debateId={debateId}
            />
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.sidebar}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.debateSearch}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DebateSearch title={title} />
          </div>

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.debateRecent}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DebateRecent title={title} />
          </div>
        </div>
      </div>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer />
      </div>
    </div>
  );
}

export default Debate;
