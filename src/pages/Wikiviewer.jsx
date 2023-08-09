import Header from '../components/Header';
import { Link } from "react-router-dom/dist";
import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';
import styles from './Wikiviewer.module.css';
import falseBk from '../img/bookmark.png';
import trueBk from '../img/bookmarkFill.png';
import debate from '../img/debate.png'
import his from '../img/his.png'
import answ from '../img/answ.png'
import WikiBox from '../components/WikiBox';
import Switch from '../components/Switch';
import { useParams } from 'react-router-dom/dist';
import WikiToHtml from '../components/Wiki/WikiToHtml';

function WikiViewer() {
    const myDivRef = useRef([]);
    const nav = useNavigate();
    const [isToggled, setIsToggled] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const {title} = useParams();
    const [allText, setAllText] = useState('');
    const [allContent, setAllContent] = useState([]);

    const Ques = [
        {
            'index' : '1.',
            'number': '1',
            'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요 ',
        },
         {
            'index' : '2.',
            'number': '2',
             'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
             
         },
         {
             'index' : '3.',
             'number': '3',
             'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
         },
         {
             'index': '4.',
             'number': '4',
             'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
         },
     ]


     const data = [
        {
            'index' : '1.',
            'section': '1',
            'title': '일번항목',
            'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
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

    const [deleted, setDeleted] = useState(true);
    const [imageSource, setImageSource] = useState(falseBk);

    const addBookmark = async () => {
        try{
            const result = await axios.post(`http://localhost:8080/wiki/favorite/${title}`, {
                
            }, {
                withCredentials: true
            });
            if(result.status === 200){
                setDeleted(false);
                console.log(result.data.status);
            }
            
        } catch (error) {
            console.error(error);
            if(error.response.status === 401){
                alert(error.response.data.message);
                nav('/signin');
            } else {
                alert(error.response.data.message);
            }
        }
      };
  
  
      const deleteBookmark = async () => {
        try{
            const result = await axios.delete(`http://localhost:8080/wiki/favorite/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                setDeleted(true);
                console.log(result.data.status);
            } else {
              alert('문제가 발생하였습니다');
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
      };

    function handleClickBookmark() {
        // 이미지가 변경되었을 때 다른 이미지 경로로 바꾸어줍니다.
      if(deleted === false){
        deleteBookmark();
        setImageSource(falseBk);

      } else if (deleted === true){
        addBookmark();
        setImageSource(trueBk);

      }
    }

    const linkToHistory = () => {
        nav(`/history/${title}`)
    }

    const linkToAllEdit = () => {
        nav(`/wikiedit/${title}/all`)
    }

    //contents가 비었으면 글이라도 띄우도록. 
    const getWiki = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/wiki/contents/${title}`);
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
                  <h1>{title}<img src={imageSource} alt="Image" onClick={handleClickBookmark} className={styles.bookmarkImg}/>
                  </h1>
                  <div className={styles.wikititleBtn}>
                    <button><img src={debate}/>&nbsp;토론하기</button>
                    <button onClick={linkToHistory}><img src={his}/>&nbsp;히스토리</button>
                  </div>
               </div>
               <div className={styles.wikiBoxLists}>
                <div className={styles.wikilist}>
                    <div className={styles.wikilistTitle}>
                        <h2>목차</h2>
                        <button onClick={linkToAllEdit}>전체 편집</button>
                    </div>
                    <div>
                        {allContent.map((item) => {
                            return(
                                <li onClick={() => handleClick(item.section)} key={item.section}>
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
                    <div className={styles.quesWrap}>
                            {Ques.map((item) => {
                                return(
                                    <div>
                                     <hr></hr>
                                     <ul key={item.title}>
                                        <span className={styles.quesTitle}>{item.title}</span>
                                        <span className={styles.quesNum}>{item.number}<img src={answ}/></span>
                                     </ul>
                                    </div>
                                );
                            })}

                    </div>
                    <div className={styles.wikiaskFoot}>
                        <Link to={`/wiki/morequestion/${encodeURIComponent(title)}`}>
                            <button  className={styles.addQues}>나도 질문하기</button>
                        </Link>
                        <Link to={`/wiki/morequestion/${encodeURIComponent(title)}`}>
                            <button   className={styles.moreQues}>더보기</button>
                        </Link>
                    </div>
                    
                </div>
                <div className={styles.wikiwrite}></div>
               </div>
               <div className={styles.wikicontent}>
                    {allContent.map((item) => {
                        return(
                            <div ref={(el) => (myDivRef.current[item.section] = el)} key={item.section}>
                                <WikiBox 
                                title={item.title} content={item.content} index={item.index} section={item.section} main={title}
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