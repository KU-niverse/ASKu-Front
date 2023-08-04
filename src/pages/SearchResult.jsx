import React from 'react'
import Header from '../components/Header'
import search from '../img/search_icon.png'
import styles from './SearchResult.module.css'
import ResultBox from '../components/ResultBox'
import { useState, useEffect } from 'react'
import QuestionFor from '../components/QuestionFor'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'




const data = [
    {
        'title': '입실렌티',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    },
    {
        'title': '입실렌티',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    },
    {
        'title': '입실렌티',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    },
    {
        'title': '입실렌티',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    },
]
const lists = [
    {
        'title': '대동제',
        'timestamp': '18:06',
    },
    {
        'title': '대동제',
        'timestamp': '18:06',
    },
    {
        'title': '대동제',
        'timestamp': '18:06',
    },
    {
        'title': '대동제',
        'timestamp': '18:06',
    },
]


const SearchResearch = () => {

    const [isClicked, setIsClicked] = useState(true); //true: 문서 false: 질문

    const {title} = useParams();
    const [docs, setDocs] = useState([]);
    const [ques, setQues] = useState([]);

    const handleButtonClick = () => {
        setIsClicked(!isClicked);
      };


      const getDocs = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/wiki/query/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                setDocs(result.data);
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    };

    const getQues = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/question/query/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                setQues(result.data);
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    };

    

    useEffect(() => {

        getDocs();
        getQues();

    }, []);
    
    
  return (
    <div>
        <Header/>
        <div className={styles.results}>
            <div className={styles.header}>
                <img src={search}/>
                <h4>"입실렌티" 검색결과</h4>
            </div>
            <div className={styles.typeWrap}>
                <p className={styles.type}>
                    <button onClick={handleButtonClick} className={isClicked ? styles.btnRed: styles.btnGray}>문서<div className={isClicked ? styles.numberRed : styles.numberGray}>12</div></button>
                    <button onClick={handleButtonClick} className={isClicked ? styles.btnGray : styles.btnRed}>질문<div className={isClicked ? styles.numberGray : styles.numberRed}>12</div></button>
                </p>
                <p className={styles.title}>최근 변경</p>
            </div>
            <div className={styles.contents}>
                <div className={styles.boxes}>
                    <div className={isClicked ? 'default': styles.hidden}>
                        {docs.map((item) => {
                            return(
                                <div key={item.title}>
                                    <ResultBox
                                    title={item.title} 
                                    // content={item.content} bookmark={item.bookmark}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={isClicked ? styles.hidden : 'default'}>
                        {ques.map((item) => {
                            return(
                                <div key={item.id}>
                                    <QuestionFor
                                    content={item.content}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.linkToNew}><Link to='/newwiki' className={styles.link}>원하시는 질문이 없으신가요? 새로운 질문을 생성해보세요</Link></div>
                </div>
                <div className={styles.recents}>
                    <div className={styles.recentWrap}>
                    {lists.map((item) => {
                            return(
                                <ul key={item.title}>
                                    <span className={styles.listTitle}>{item.title}</span>
                                    <span className={styles.listTimestamp}>{item.timestamp}</span>
                                </ul>
                            );
                        })}

                    </div>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default SearchResearch