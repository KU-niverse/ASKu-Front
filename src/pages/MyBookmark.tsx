import React from "react";
// @ts-expect-error TS(6142): Module '../components/BookmarkBox' was resolved to... Remove this comment to see the full error message
import BookmarkBox from "../components/BookmarkBox";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(2307): Cannot find module './MyBookmark.module.css' or it... Remove this comment to see the full error message
import styles from "./MyBookmark.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";



const MyBookmark = ({
  loggedIn,
  setLoggedIn
}: any) => {
  const [lists, setLists] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  //yconsole.log(from)

  //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
        return nav(from);
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoggedIn(false);
        //alert("로그인이 필요한 서비스 입니다.");
        return nav(from);
      }else{
        alert("에러가 발생하였습니다");
        return nav(from);
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const getBookmarks = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/favorite`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setLists(result.data.message);
        setBookCount(result.data.message.length);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.content}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.header}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h3>즐겨찾기 한 문서</h3>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.texts}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>문서</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.number}>{bookCount}</div>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
          {lists.map((item) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div key={item.title}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <BookmarkBox
                  // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                  title={item.title}
                  // @ts-expect-error TS(2339): Property 'recent_filtered_content' does not exist ... Remove this comment to see the full error message
                  content={item.recent_filtered_content}
                  is_favorite={true}
                />
              </div>
            );
          })}
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer/>
    </div>
  );
};

export default MyBookmark;
