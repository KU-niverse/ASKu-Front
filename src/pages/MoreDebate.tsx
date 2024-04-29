import React from "react";
// @ts-expect-error TS(2307): Cannot find module './MoreDebate.module.css' or it... Remove this comment to see the full error message
import styles from "./MoreDebate.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateList' was resol... Remove this comment to see the full error message
import DebateList from "../components/Debate/DebateList";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateSearch' was res... Remove this comment to see the full error message
import DebateSearch from "../components/Debate/DebateSearch";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateAdd' was resolv... Remove this comment to see the full error message
import DebateAdd from "../components/Debate/DebateAdd";
// @ts-expect-error TS(6142): Module '../components/Debate/DebateRecent' was res... Remove this comment to see the full error message
import DebateRecent from "../components/Debate/DebateRecent";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MoreDebate() {
  const { title } = useParams();
  const [debateListData, setDebateListData] = useState([]);

  useEffect(() => {
    const takeDebateList = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/debate/list/${encodeURIComponent(title)}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setDebateListData(res.data);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };

    takeDebateList();
  }, [title]); //토론방 목록 가져오기

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
          <div className={styles.maincontent_box}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.title}>이 문서의 토론 목록</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.menu}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.menu1}>항목</span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.menu2}>수정 시간</span>
            </div>

            {debateListData &&
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              debateListData.data &&
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              debateListData.data.length === 0 ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className={styles.none}>아직 생성된 토론방이 없습니다.</p>
            ) : (
              debateListData &&
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              debateListData.data &&
              // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
              debateListData.data.map((data: any) => <DebateList
                key={data.id}
                id={data.id}
                doc_id={data.doc_id}
                user_id={data.user_id}
                subject={data.subject}
                created_at={data.created_at}
                recent_edited_at={data.recent_edited_at}
                done_or_not={data.done_or_not}
                done_at={data.done_at}
                is_bad={data.is_bad}
                title={title}
              />)
            )}
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
          <div className={styles.debateAdd}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DebateAdd title={title} />
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

export default MoreDebate;
