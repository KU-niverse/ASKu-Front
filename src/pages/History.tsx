import React from "react";
// @ts-expect-error TS(2307): Cannot find module './History.module.css' or its c... Remove this comment to see the full error message
import styles from "./History.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(2307): Cannot find module '../img/his2.png' or its corres... Remove this comment to see the full error message
import his2 from "../img/his2.png";
// @ts-expect-error TS(6142): Module '../components/HistoryBox' was resolved to ... Remove this comment to see the full error message
import HistoryBox from "../components/HistoryBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/Paging' was resolved to 'C:/... Remove this comment to see the full error message
import Paging from "../components/Paging";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";

const data = [
  {
    version: "v1",
    summary: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    user: "하호후리스",
    timestamp: "2023.05.26 01:34:32",
  },
  {
    version: "v2",
    summary: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    user: "하호후리스",
    timestamp: "2023.05.26 01:34:32",
  },
  {
    version: "v3",
    summary: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    user: "하호후리스",
    timestamp: "2023.05.26 01:34:32",
  },
  {
    version: "v4",
    summary: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    user: "하호후리스",
    timestamp: "2023.05.26 01:34:32",
  },
];

const History = (props: any) => {
  const { title } = useParams();
  const [lists, setLists] = useState([]);
  const [typeCount, setTypeCount] = useState(0);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const perPage = 6; // 페이지당 보여줄 컴포넌트 갯수
  // 현재 페이지에 해당하는 데이터만 추출
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleHistorys = lists.slice(startIndex, endIndex);
  const [blank, setBlank] = useState(false);

  const handlePageChange = (pageNumber: any) => {
    setPage(pageNumber); // 페이지 번호 업데이트
  };

  const getWiki = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/historys/${title}`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setLists(result.data.historys);
        setTypeCount(result.data.historys.length);
        if (result.data.historys.length === 0) {
          setBlank(true);
        }
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getWiki();
  }, []);

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
          히스토리
        </span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.history}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.historyList}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.historyTitle}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.listTitle}>{title}</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.listTitle2}>문서의 변경 내용</p>
          </div>
          {blank ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>아직 히스토리가 없습니다</div>
          ) : (
            visibleHistorys.map((item) => {
              let isFirst = false;
              // @ts-expect-error TS(2339): Property 'is_bad' does not exist on type 'never'.
              if (item.is_bad === 1) {
                return null; // 패스 (무시)
              }

              return (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div key={item.version}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <HistoryBox
                    // @ts-expect-error TS(2339): Property 'version' does not exist on type 'never'.
                    version={item.version}
                    // @ts-expect-error TS(2339): Property 'summary' does not exist on type 'never'.
                    summary={item.summary}
                    // @ts-expect-error TS(2339): Property 'nick' does not exist on type 'never'.
                    user={item.nick}
                    // @ts-expect-error TS(2339): Property 'timestamp' does not exist on type 'never... Remove this comment to see the full error message
                    timestamp={item.timestamp}
                    title={title}
                    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                    target={item.id}
                  />
                </div>
              );
            })
          )}

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

export default History;
