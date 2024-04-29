import Header from "../components/Header";
import { Link } from "react-router-dom/dist";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import styles from "./Wikiviewer.module.css";
import bookmark from "../img/bookmark.png";
import bookmarkFill from "../img/bookmarkFill.png";
import debate from "../img/debate.png";
import his from "../img/his.png";
import answ from "../img/answ.png";
import WikiBox from "../components/WikiBox";
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
        myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
  }

  function handleClickBookmark() {
    setIsBookmark(!isBookmark);
  }

  const getWiki = async () => {
    try {
      const result = await axios.get(
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
        <div className={styles.container}>
            <Header />
            <div className={styles.wikiviewer}>
                <div className={styles.wikititle}>
                    <h1>
            {title}
                        <img
              src={bookmark}
              className={
                isBookmark ? `${styles.hidden}` : `${styles.bookmarkImg}`
              }
              onClick={handleClickBookmark}
              alt=""
            />
                        <img
              src={bookmarkFill}
              className={
                isBookmark ? `${styles.bookmarkImg}` : `${styles.hidden}`
              }
              onClick={handleClickBookmark}
            />
          </h1>
                    <div className={styles.wikititleBtn}>
                        <button>
                            <img src={debate} />
              &nbsp;토론하기
            </button>
                        <button>
                            <img src={his} />
              &nbsp;히스토리
            </button>
          </div>
        </div>
                <div className={styles.wikiBoxLists}>
                    <div className={styles.wikilist}>
                        <div className={styles.wikilistTitle}>
                            <h2>목차</h2>
                            <button>전체 편집</button>
            </div>
                        <div>
              {allContent.map((item) => {
                return (
                                    <li
                                        onClick={() => handleClick(item.section)}
                                        key={item.section}
                  >
                                        <span className={styles.wikiIndex}>{item.index}</span>{" "}
                                        {item.title}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
                <div className={styles.wikicontent}>
          {allContent.map((item) => {
            return (
                            <div
                                ref={(el) => (myDivRef.current[item.section] = el)}
                                key={item.section}
              >
                                <WikiBox
                                    title={item.title}
                                    content={item.content}
                                    index={item.index}
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
