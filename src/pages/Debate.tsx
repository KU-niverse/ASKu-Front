import React from "react";
import styles from "./Debate.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import DebateTitle from "../components/Debate/DebateTitle";
import DebateContent from "../components/Debate/DebateContent";
import DebateInput from "../components/Debate/DebateInput";
import DebateSearch from "../components/Debate/DebateSearch";
import DebateAdd from "../components/Debate/DebateAdd";
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
  const handleDebateSubmit = async (submitData) => {
    try {
      const postResponse = await axios.post(
        process.env.REACT_APP_HOST + `/debate/${encodeURIComponent(title)}/new/${debateId}`,
        submitData,
        { withCredentials: true }
      );

      if (postResponse.status === 200) {
        // POST 요청이 성공한 후 전체 메시지 목록을 다시 가져옵니다.
        const getResponse = await axios.get(
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
      if (error.response && error.response.status === 500) {
        //console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>

      <div className={styles.header}>
        <p className={styles.debate}>토론 ({title})</p>
      </div>

      <div className={styles.debatecontent}>
        <div className={styles.maincontent}>
          <DebateTitle title={title} subject={subject} />

          {debateContentData &&
            debateContentData.message &&
            debateContentData.message.data === 0 ? (
            <p>아직 작성된 토론 메세지가 없습니다.</p>
          ) : (
            debateContentData &&
            debateContentData.message &&
            debateContentData.data.map((debate, index) => (
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
          <div className={styles.input}>
            <DebateInput
              onDebateSubmit={handleDebateSubmit}
              title={title}
              debateId={debateId}
            />
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateSearch title={title} />
          </div>

          <div className={styles.debateRecent}>
            <DebateRecent title={title} />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Debate;
