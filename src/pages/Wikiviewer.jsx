import Header from '../components/Header';
import { Link } from "react-router-dom/dist";
import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom/dist';
import styles from './Wikiviewer.module.css';
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { GrDocumentText } from "react-icons/gr";
import WikiBox from '../components/WikiBox';
import Switch from '../components/Switch';

function WikiViewer() {
    const myDivRef = useRef([]);
    const nav = useNavigate();
    const [isToggled, setIsToggled] = useState(false);

    const data = [
        {
            'index' : '1.',
            'section': '1',
            'title': '일번항목',
            'content': "Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddddddddddddddddddddddddddNostrum, optio, assumenda distinctio autem, nimi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt! " 
        },
         {
            'index' : '2.',
            'section': '2',
             'title': '이번항목',
             'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddddddddddddddddddddddddddddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
         },
         {
             'index' : '3.',
             'section': '3',
             'title': '삼번항목',
             'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elitddddddddddddddddddddddddddddd. ostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
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

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wikiviewer}>
               <div className={styles.wikititle}>
                  <h1>입실렌티<BsBookmark/><BsBookmarkFill/></h1>
                  <div className={styles.wikititle_btn}>
                    <button><IoIosPeople/>토론하기</button>
                    <button><GrDocumentText/>히스토리</button>
                  </div>
               </div>
               <div className={styles.wikiBoxLists}>
                <div className={styles.wikilist}>
                    <div className={styles.wikilistTitle}>
                        <h2>목차</h2>
                        <button>전체편집</button>
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
                    <Switch  isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
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