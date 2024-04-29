import React from "react";
// @ts-expect-error TS(2307): Cannot find module './MyBadge.module.css' or its c... Remove this comment to see the full error message
import styles from "./MyBadge.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
// @ts-expect-error TS(6142): Module '../components/Badge' was resolved to 'C:/U... Remove this comment to see the full error message
import Badge from "../components/Badge";
// @ts-expect-error TS(6142): Module '../components/SwitchBadge' was resolved to... Remove this comment to see the full error message
import SwitchBadge from "../components/SwitchBadge";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";

function MyBadge() {
  const [loading, setLoading] = useState(true);
  //뱃지 데이터 불러오기
  const [myBadge, setMyBadge] = useState([]);
  useEffect(() => {
    const takeMyBadge = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST+`/user/mypage/badgehistory`,
          { withCredentials: true }
        );
        if (res.status === 201) {
          setMyBadge(res.data);
        }
        if (res.status === 401) {
        }
      } catch (error) {
        console.error(error);
      }
    };
    takeMyBadge();
  }, []);

  //모든 뱃지 데이터 가져오기
  const [allBadge, setAllBadge] = useState([]);
  useEffect(() => {
    const takeAllBadge = async () => {
      try {
        const response = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST+`/user/mypage/badges`,
          { withCredentials: true }
        );
        if (response.status === 201) {
          setAllBadge(response.data);
        }
        if (response.status === 401) {
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    takeAllBadge();
  }, []);

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SpinnerMypage />
      </div>
    );
  }

  const myBadgeIds = new Set(
    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
    myBadge && myBadge.data && myBadge.data.map((badge: any) => badge.badge_id)
  );
  // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
  const sortedBadges = [...allBadge.data].sort((a, b) => {
    const aIsMyBadge = myBadgeIds.has(a.id);
    const bIsMyBadge = myBadgeIds.has(b.id);

    // 먼저 내 뱃지인 경우를 우선 정렬하고, 그 외에는 id 순서로 정렬
    if (aIsMyBadge && !bIsMyBadge) {
      return -1;
    } else if (!aIsMyBadge && bIsMyBadge) {
      return 1;
    } else {
      return a.id - b.id;
    }
  });

 

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
        <p className={styles.mypage}>MYPAGE</p>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.mybadgecontent}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.b_header}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.b_headline}>나의 뱃지 목록</p>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.b_list}>
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
          {allBadge && allBadge.data && allBadge.data.length === 0 ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p></p>
          ) : (
            allBadge &&
            // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
            allBadge.data &&
            sortedBadges &&
            sortedBadges.map((data) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Badge
                key={data.id} // key prop 추가 (반복되는 엘리먼트는 고유한 key prop을 가져야 함)
                id={data.id}
                name={data.name}
                image={data.image}
                description={data.description}
                event={data.event}
                count={data.history_count}
                myBadgeIds={myBadgeIds}
              />
            ))
          )}
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

export default MyBadge;
