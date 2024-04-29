import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
// @ts-expect-error TS(6142): Module './Wiki/WikiToHtml' was resolved to 'C:/Use... Remove this comment to see the full error message
import WikiToHtml from './Wiki/WikiToHtml';
// @ts-expect-error TS(2307): Cannot find module './WikiBox.module.css' or its c... Remove this comment to see the full error message
import styles from './WikiBox.module.css'
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

const WikiBox = (props: any) => {
  const main = props.main;
  const title = props.title;
  const content = WikiToHtml(props.content);
  const index = props.index
  const section = props.section;
  const isZero = props.isZero
  const nav = useNavigate();
  const location = useLocation();
  const [isOpen, setView] = useState(true);  // 메뉴의 초기값을 false로 설정
  const contentWithResponsiveImages = content.replace(/<img/g, '<img style="max-width: 100%; height: auto;"');





  const linkToWikiEdit = () => {
    const encodedMain = encodeURIComponent(main);
    nav(`/wikiedit/${encodedMain}/${section}`, {
      state: {
        from: location.pathname,
        index_title: `${index} ${title}`
      }
    });

  }
  const linkToWikiQue = () => {
    const encodedMain = encodeURIComponent(main);
    nav(`/wiki/morequestion/${encodedMain}`, { state: `${index} ${title}` });


  }

  const toggleView = () => {
    setView(isOpen => !isOpen); // on,off 개념 boolean
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.wikiContents} >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <li onClick={toggleView} className={styles.wikiContentlist}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikiContentTitle}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={isOpen ? {} : `${styles.hidden}`} ><FaChevronDown size="16" color="rgba(222, 58, 88, 1)" /></span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={isOpen ? `${styles.hidden}` : {}} ><FaChevronRight size="16" color="rgba(222, 58, 88, 1)" /></span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.wikiIndex}>&nbsp;{index}.&nbsp;</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span>{title}</span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={isZero ? `${styles.hidden}` : `${styles.wikiContentBtns}`}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button onClick={linkToWikiEdit} className={styles.wikiContentBtn}>편집</button>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button onClick={linkToWikiQue} className={styles.wikiContentBtn}>질문</button>
        </div>

      </li>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <hr></hr>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={isOpen ? `${styles.wikiText}` : `${styles.hidden}`} >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div dangerouslySetInnerHTML={{ __html: contentWithResponsiveImages }} />
      </div>
    </div>
  )
}

export default WikiBox