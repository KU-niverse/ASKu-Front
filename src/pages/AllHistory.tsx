import React from "react";
// @ts-expect-error TS(2307): Cannot find module './History.module.css' or its c... Remove this comment to see the full error message
import styles from "./History.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(2307): Cannot find module '../img/his2.png' or its corres... Remove this comment to see the full error message
import his2 from "../img/his2.png";
// @ts-expect-error TS(6142): Module '../components/AllHistoryBox' was resolved ... Remove this comment to see the full error message
import AllHistoryBox from "../components/AllHistoryBox";
import axios from "axios";
import { useState, useEffect } from "react";
// @ts-expect-error TS(6142): Module '../components/Paging' was resolved to 'C:/... Remove this comment to see the full error message
import Paging from "../components/Paging";
// @ts-expect-error TS(6142): Module '../components/FormatTimeAgo' was resolved ... Remove this comment to see the full error message
import FormatTimeAgo from "../components/FormatTimeAgo";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";

// const data = [
//     {
//         'version': 'v1',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
//     {
//         'version': 'v2',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
//     {
//         'version': 'v3',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
//     {
//         'version': 'v4',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
// ]

const AllHistory = () => {
  const [historys, setHistorys] = useState([]);
  const [type, setType] = useState("all");
  const [typeCount, setTypeCount] = useState(0);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const perPage = 10; // 페이지당 보여줄 컴포넌트 갯수
  // 현재 페이지에 해당하는 데이터만 추출
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleHistorys = historys.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: any) => {
    setPage(pageNumber); // 페이지 번호 업데이트
  };

  const getHistory = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/historys?type=${type}`
      );
      setHistorys(result.data.message);
      //console.log("개수" + result.data.message.length);
      setTypeCount(result.data.message.length);
    } catch (error) {
      console.error(error);
      //alert(result.data.message);
    }
  };

  useEffect(() => {
    getHistory();
  }, [type]);

  const allBtn = () => {
    setType("all");
  };
  const createBtn = () => {
    setType("create");
  };
  const rollBtn = () => {
    setType("rollback");
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={his2} />
          최근 변경
        </span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.history}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={type === "all" ? styles.historyList : styles.hidden}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.historyTitle}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.listTitle2}>최근 변경된 모든 문서</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.historyTypes}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={allBtn}
                className={type === "all" ? styles.clickType : styles.default}
              >
                all
              </p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={createBtn}
                className={
                  type === "create" ? styles.clickType : styles.default
                }
              >
                create
              </p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={rollBtn}
                className={
                  type === "rollback" ? styles.clickType : styles.default
                }
              >
                rollback
              </p>
            </div>
          </div>
          {visibleHistorys.map((item) => {
            // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
            const timestamp = FormatTimeAgo(item.created_at);
            // @ts-expect-error TS(2339): Property 'is_bad' does not exist on type 'never'.
            if (item.is_bad === 1) {
              return null; // 패스 (무시)
            }
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div key={item.timestamp}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <AllHistoryBox
                  // @ts-expect-error TS(2339): Property 'version' does not exist on type 'never'.
                  version={item.version}
                  // @ts-expect-error TS(2339): Property 'summary' does not exist on type 'never'.
                  summary={item.summary}
                  // @ts-expect-error TS(2339): Property 'nick' does not exist on type 'never'.
                  user={item.nick}
                  timestamp={timestamp}
                  // @ts-expect-error TS(2339): Property 'doc_title' does not exist on type 'never... Remove this comment to see the full error message
                  title={item.doc_title}
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  target={item.id}
                  type={type}
                />
              </div>
            );
          })}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Paging
            total={typeCount}
            perPage={perPage}
            activePage={page}
            onChange={handlePageChange}
          />
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={type === "create" ? styles.historyList : styles.hidden}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.historyTitle}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.listTitle2}>새로 생성된 모든 문서</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.historyTypes}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={allBtn}
                className={type === "all" ? styles.clickType : styles.default}
              >
                all
              </p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={createBtn}
                className={
                  type === "create" ? styles.clickType : styles.default
                }
              >
                create
              </p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={rollBtn}
                className={
                  type === "rollback" ? styles.clickType : styles.default
                }
              >
                rollback
              </p>
            </div>
          </div>
          {visibleHistorys.map((item) => {
            // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
            const timestamp = FormatTimeAgo(item.created_at);
            // @ts-expect-error TS(2339): Property 'is_bad' does not exist on type 'never'.
            if (item.is_bad === 1) {
              return null; // 패스 (무시)
            }

            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div key={item.timestamp}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <AllHistoryBox
                  // @ts-expect-error TS(2339): Property 'version' does not exist on type 'never'.
                  version={item.version}
                  // @ts-expect-error TS(2339): Property 'summary' does not exist on type 'never'.
                  summary={item.summary}
                  // @ts-expect-error TS(2339): Property 'nick' does not exist on type 'never'.
                  user={item.nick}
                  timestamp={timestamp}
                  // @ts-expect-error TS(2339): Property 'doc_title' does not exist on type 'never... Remove this comment to see the full error message
                  title={item.doc_title}
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  target={item.id}
                  type={type}
                />
              </div>
            );
          })}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Paging
            total={typeCount}
            perPage={perPage}
            activePage={page}
            onChange={handlePageChange}
          />
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          className={type === "rollback" ? styles.historyList : styles.hidden}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.historyTitle}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.listTitle2}>최근 롤백된 모든 문서</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.historyTypes}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={allBtn}
                className={type === "all" ? styles.clickType : styles.default}
              >
                all
              </p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={createBtn}
                className={
                  type === "create" ? styles.clickType : styles.default
                }
              >
                create
              </p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p
                onClick={rollBtn}
                className={
                  type === "rollback" ? styles.clickType : styles.default
                }
              >
                rollback
              </p>
            </div>
          </div>
          {visibleHistorys.map((item) => {
            // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
            const timestamp = FormatTimeAgo(item.created_at);
            // @ts-expect-error TS(2339): Property 'is_bad' does not exist on type 'never'.
            if (item.is_bad === 1) {
              return null; // 패스 (무시)
            }

            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div key={item.timestamp}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <AllHistoryBox
                  // @ts-expect-error TS(2339): Property 'version' does not exist on type 'never'.
                  version={item.version}
                  // @ts-expect-error TS(2339): Property 'summary' does not exist on type 'never'.
                  summary={item.summary}
                  // @ts-expect-error TS(2339): Property 'nick' does not exist on type 'never'.
                  user={item.nick}
                  timestamp={timestamp}
                  // @ts-expect-error TS(2339): Property 'doc_title' does not exist on type 'never... Remove this comment to see the full error message
                  title={item.doc_title}
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  target={item.id}
                  type={type}
                />
              </div>
            );
          })}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Paging
            total={typeCount}
            perPage={perPage}
            activePage={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer/>
    </div>
  );
};

export default AllHistory;
