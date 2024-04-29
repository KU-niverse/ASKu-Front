import React, { useState, useEffect } from "react";
import styles from "./DebateRecent.module.css";
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
        <div>
            <p className={styles.recentTitle}>최근 토론</p>
            <div className={styles.recentLists}>
        {recentListData === null ? (
                    <p className={styles.none}>데이터를 불러오는 중입니다.</p>
                ) : recentListData.data.length === 0 ? (
                    <p className={styles.none}>최근 변경된 토론이 없습니다.</p>
        ) : (
                    recentListData.data.slice(0, 4).map((item: any) => {
            const timestamp = FormatTimeAgo(item.recent_edited_at);
            return (
                            <Link
                to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
                state={{
                  title: item.title,
                  subject: item.subject,
                  id: item.id,
                }}
                className={styles.linkTo}
              >
                                <ul key={item.title}>
                                    <span className={styles.listTitle}>{item.subject}</span>
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
