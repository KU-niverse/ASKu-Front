import Header from '../components/Header';
import { Link } from "react-router-dom/dist";
import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom/dist';
import styles from './Wikiviewer.module.css';
import bookmark from '../img/bookmark.png';
import bookmarkFill from '../img/bookmarkFill.png';
import debate from '../img/debate.png'
import his from '../img/his.png'
import WikiBox from '../components/WikiBox';
import Switch from '../components/Switch';
import { useParams } from 'react-router-dom/dist';

function WikiViewer() {
    const myDivRef = useRef([]);
    const nav = useNavigate();
    const [isToggled, setIsToggled] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const {title} = useParams();

    const data = [
        {
            'index' : '1.',
            'section': '1',
            'title': '일번항목',
            'content': "Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddNostrum, optio, assumenda distinctio autem, nimi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt! " 
        },
         {
            'index' : '2.',
            'section': '2',
             'title': '이번항목',
             'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
         },
         {
             'index' : '3.',
             'section': '3',
             'title': '삼번항목',
             'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elitdddddd. ostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
         },
         {
             'index': '4.',
             'section': '4',
             'title': '사번항목',
             'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ostrum, odfkjs;fjskdjf;alskdjf;sdlkfj;alsdkjf;alskdjf;laksssumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
         },
     ]

     function handleClick(index) {
        myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
        
    }

    function handleClickBookmark() {
        setIsBookmark(!isBookmark);
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wikiviewer}>
               <div className={styles.wikititle}>
                  <h1>입실렌티<img src={bookmark} className={isBookmark ? `${styles.hidden}` : `${styles.bookmarkImg}`} onClick={handleClickBookmark}/>
                    <img src={bookmarkFill} className={isBookmark ? `${styles.bookmarkImg}`: `${styles.hidden}`} onClick={handleClickBookmark}/>
                  </h1>
                  <div className={styles.wikititleBtn}>
                    <button><img src={debate}/>&nbsp;토론하기</button>
                    <button><img src={his}/>&nbsp;히스토리</button>
                  </div>
               </div>
               <div className={styles.wikiBoxLists}>
                <div className={styles.wikilist}>
                    <div className={styles.wikilistTitle}>
                        <h2>목차</h2>
                        <button>전체 편집</button>
                    </div>
                    <div>
                        {data.map((item) => {
                            return(
                                <li onClick={() => handleClick(item.index)} key={item.index}>
                                    <span className={styles.wikiIndex}>{item.index}</span> {item.title}
                                </li>
                            );
                        })} 
                    </div>
                    
                </div>
                <div className={styles.wikiask}>
                    <div className={styles.wikiaskTitle}>
                        <h2>질문</h2>
                        <Switch  isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
                    </div>
                    <Link to={`/wikiviewer/morequestion/${title}`}>
                        <button>질문 더보기</button>
                    </Link>
                </div>
                <div className={styles.wikiwrite}></div>
               </div>
               <div className={styles.wikicontent}>
                    {data.map((item) => {
                        return(
                            <div ref={(el) => (myDivRef.current[item.index] = el)} key={item.index}>
                                <WikiBox 
                                title={item.title} content={item.content} index={item.index} section={item.section}
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