import React, { useState, useEffect } from "react";
// @ts-expect-error TS(2307): Cannot find module './DebateRecent.module.css' or ... Remove this comment to see the full error message
import styles from "./DebateRecent.module.css";
// @ts-expect-error TS(6142): Module '../FormatTimeAgo' was resolved to 'C:/User... Remove this comment to see the full error message
import FormatTimeAgo from "../FormatTimeAgo";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DebateRecent = ({
  title
}: any) => {
  const [recentListData, setRecentListData] = useState(null);

  useEffect(() => {
    const takeRecentList = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/debate/all/recent`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setRecentListData(res.data);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };

    takeRecentList();
  }, [title]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <p className={styles.recentTitle}>최근 토론</p>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.recentLists}>
        {recentListData === null ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.none}>데이터를 불러오는 중입니다.</p>
        // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never'.
        ) : recentListData.data.length === 0 ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.none}>최근 변경된 토론이 없습니다.</p>
        ) : (
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never'.
          recentListData.data.slice(0, 4).map((item: any) => {
            const timestamp = FormatTimeAgo(item.recent_edited_at);
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link
                to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
                state={{
                  title: item.title,
                  subject: item.subject,
                  id: item.id,
                }}
                className={styles.linkTo}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <ul key={item.title}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <span className={styles.listTitle}>{item.subject}</span>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <span className={styles.listTimestamp}>{timestamp}</span>
                </ul>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DebateRecent;
