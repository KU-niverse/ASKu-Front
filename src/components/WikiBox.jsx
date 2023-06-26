import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import WikiToHtml from './WikiToHtml';
import styles from './WikiBox.module.css'

const WIkiBox = (props) => {

    const title = props.title;
    const content = WikiToHtml(props.content);
    const index = props.index
    const section = props.section;
    const Navigator = useNavigate();
    const [isOpen, setView] = useState(true);  // 메뉴의 초기값을 false로 설정



    const linkToWikiEdit = () => {
        Navigator(`/wikiedit/${section}`, {state: section});
    
    }
    const linkToWikiQue = () => {
        Navigator(`/wikiedit/${section}`, {state: section});
    
    }
  
    const toggleView = () => {
          setView(isOpen => !isOpen); // on,off 개념 boolean
      }
  
    return (
      <div className={styles.wikiContents} >
        <li onClick={toggleView}>
            <div className={styles.wikiContentTitle}><span className={styles.wikiIndex}>{index}</span><span>{title}</span></div>
            <div className={styles.wikiContentBtns}>
                <button onClick={linkToWikiEdit} className={styles.wikiContentBtn}>편집</button>
                <button onClick={linkToWikiQue} className={styles.wikiContentBtn}>질문</button>
            </div>
            
        </li>
        <hr></hr>
        <div className={isOpen ? `${styles.wikiText}` : `${styles.hidden}`} >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    )
}

export default WIkiBox