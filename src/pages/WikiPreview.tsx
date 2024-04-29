// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
import { Link } from "react-router-dom/dist";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
// @ts-expect-error TS(2307): Cannot find module './Wikiviewer.module.css' or it... Remove this comment to see the full error message
import styles from "./Wikiviewer.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmark.png' or its co... Remove this comment to see the full error message
import bookmark from "../img/bookmark.png";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmarkFill.png' or it... Remove this comment to see the full error message
import bookmarkFill from "../img/bookmarkFill.png";
// @ts-expect-error TS(2307): Cannot find module '../img/debate.png' or its corr... Remove this comment to see the full error message
import debate from "../img/debate.png";
// @ts-expect-error TS(2307): Cannot find module '../img/his.png' or its corresp... Remove this comment to see the full error message
import his from "../img/his.png";
// @ts-expect-error TS(2307): Cannot find module '../img/answ.png' or its corres... Remove this comment to see the full error message
import answ from "../img/answ.png";
// @ts-expect-error TS(6142): Module '../components/WikiBox' was resolved to 'C:... Remove this comment to see the full error message
import WikiBox from "../components/WikiBox";
// @ts-expect-error TS(6142): Module '../components/Switch' was resolved to 'C:/... Remove this comment to see the full error message
import Switch from "../components/Switch";
import { useParams } from "react-router-dom/dist";

function WikiViewer() {
  const { title, ver } = useParams();
  const myDivRef = useRef([]);
  const nav = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [allText, setAllText] = useState("");
  const [allContent, setAllContent] = useState([]);

  const Ques = [
    {
      index: "1.",
      number: "1",
      title: "여기 질문있는데 봐주세요 여기 질문있는데 봐주세요 ",
    },
    {
      index: "2.",
      number: "2",
      title: "여기 질문있는데 봐주세요 여기 질문있는데 봐주세요",
    },
    {
      index: "3.",
      number: "3",
      title: "여기 질문있는데 봐주세요 여기 질문있는데 봐주세요",
    },
    {
      index: "4.",
      number: "4",
      title: "여기 질문있는데 봐주세요 여기 질문있는데 봐주세요",
    },
  ];

  const data = [
    {
      index: "1.",
      section: "1",
      title: "일번항목",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!",
    },
    {
      index: "2.",
      section: "2",
      title: "이번항목",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!",
    },
    {
      index: "3.",
      section: "3",
      title: "삼번항목",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitdddddd. ostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!",
    },
    {
      index: "4.",
      section: "4",
      title: "사번항목",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ostrum, odfkjs;fjskdjf;alskdjf;sdlkfj;alsdkjf;alskdjf;laksssumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!",
    },
  ];

  function handleClick(index: any) {
    // @ts-expect-error TS(2339): Property 'scrollIntoView' does not exist on type '... Remove this comment to see the full error message
    myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
  }

  function handleClickBookmark() {
    setIsBookmark(!isBookmark);
  }

  const getWiki = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/historys/${title}/version/${ver}`
      );
      setAllText(result.data.text);
      setAllContent(result.data.contents);
    } catch (error) {
      console.error(error);
      //alert(result.data.message);
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
      <div className={styles.wikiviewer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikititle}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h1>
            {title}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img
              src={bookmark}
              className={
                isBookmark ? `${styles.hidden}` : `${styles.bookmarkImg}`
              }
              onClick={handleClickBookmark}
              alt=""
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img
              src={bookmarkFill}
              className={
                isBookmark ? `${styles.bookmarkImg}` : `${styles.hidden}`
              }
              onClick={handleClickBookmark}
            />
          </h1>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikititleBtn}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img src={debate} />
              &nbsp;토론하기
            </button>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img src={his} />
              &nbsp;히스토리
            </button>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikiBoxLists}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikilist}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.wikilistTitle}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h2>목차</h2>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button>전체 편집</button>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              {allContent.map((item) => {
                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <li
                    // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                    onClick={() => handleClick(item.section)}
                    // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                    key={item.section}
                  >
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={styles.wikiIndex}>{item.index}</span>{" "}
                    // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                    {item.title}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikicontent}>
          {allContent.map((item) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div
                // @ts-expect-error TS(2322): Type 'HTMLDivElement | null' is not assignable to ... Remove this comment to see the full error message
                ref={(el) => (myDivRef.current[item.section] = el)}
                // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                key={item.section}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <WikiBox
                  // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                  title={item.title}
                  // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                  content={item.content}
                  // @ts-expect-error TS(2339): Property 'index' does not exist on type 'never'.
                  index={item.index}
                  // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                  section={item.section}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WikiViewer;
