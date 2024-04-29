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
// @ts-expect-error TS(6142): Module '../components/Wiki/WikiToHtml' was resolve... Remove this comment to see the full error message
import WikiToHtml from "../components/Wiki/WikiToHtml";

function WikiViewer() {
  const { title, ver } = useParams();
  const myDivRef = useRef([]);
  const nav = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [allText, setAllText] = useState("");
  const [allContent, setAllContent] = useState([]);

  function handleClick(index: any) {
    // @ts-expect-error TS(2339): Property 'scrollIntoView' does not exist on type '... Remove this comment to see the full error message
    myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
  }

  const getWiki = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/historys/${title}/version/${ver}`
      );
      setAllText(
        WikiToHtml(result.data.jsonData.text).replace(
          /<img/g,
          '<img style="max-width: 100%; height: auto;"'
        )
      );

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
          <h1>{title}</h1>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikititleBtn}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div></div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button onClick={() => {
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              const encodedTitle = encodeURIComponent(title);
              nav(`/history/${encodedTitle}`)
            }}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img src={his} alt="" />
              &nbsp;히스토리
            </button>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikiBoxLists}>
          {/* <div className={styles.wikilist}>
                    <div className={styles.wikilistTitle}>
                        <h2>목차</h2>
                        <button>전체 편집</button>
                    </div>
                    <div>
                        {/* {allContent.map((item) => {
                            return(
                                <li onClick={() => handleClick(item.section)} key={item.section}>
                                    <span className={styles.wikiIndex}>{item.index}</span> {item.title}
                                </li>
                            );
                        })} 
                    </div>
                    
                </div> */}
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikicontent}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div dangerouslySetInnerHTML={{ __html: allText }} />
        </div>
      </div>
    </div>
  );
}

export default WikiViewer;
