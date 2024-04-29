import React from "react";
// @ts-expect-error TS(2307): Cannot find module './DebateSearch.module.css' or ... Remove this comment to see the full error message
import styles from "./DebateSearch.module.css";
// @ts-expect-error TS(2307): Cannot find module '../../img/search_icon.svg' or ... Remove this comment to see the full error message
import searchIcon from "../../img/search_icon.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DebateAllSearch = () => {
  const [word, setWord] = useState("");
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [onClick, setOnClick] = useState(false);

  const nav = useNavigate();

  const searchDebate = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/debate/searchall/${word}`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setResults(result.data.data);
        setResultCount(result.data.data.length);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.message);
    }
  };

  const handleDebateSearch = () => {
    searchDebate();
    setOnClick(true);
  };

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handleDebateSearch();
    }
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <p className={styles.searchTitle}>토론 검색</p>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.inputContainer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className={styles.headerInput}
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="검색어를 입력하세요."
          onKeyDown={handleKeyDown} // Use onKeyDown instead
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img
          src={searchIcon}
          alt="icon"
          className={styles.searchIcon}
          onClick={handleDebateSearch}
        />
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={onClick ? styles.resultContainer : styles.hidden}>
        {resultCount === 0 ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p>"검색결과가 없습니다."</p>
        ) : (
          results.map((item) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link
                // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
                state={{
                  // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                  title: item.title,
                  // @ts-expect-error TS(2339): Property 'subject' does not exist on type 'never'.
                  subject: item.subject,
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  id: item.id,
                }}
                className={styles.linkTo}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <ul key={item.id} className={styles.resultList}>
                  // @ts-expect-error TS(2339): Property 'subject' does not exist on type 'never'.
                  {item.subject}
                </ul>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DebateAllSearch;
