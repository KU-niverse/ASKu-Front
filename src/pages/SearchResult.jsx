import React from 'react'
import Header from '../components/Header'
import search from '../img/search_icon.png'
import styles from './SearchResult.module.css'
import ResultBox from '../components/ResultBox'
import { useState, useEffect } from 'react'
import Question from '../components/Question'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ResultQues from '../components/ResultQues';
import FormatTimeAgo from '../components/FormatTimeAgo';
import BookmarkBox from '../components/ResultBox';




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
    const nav = useNavigate();
    const [isClicked, setIsClicked] = useState(true); //true: 문서 false: 질문

    const {title} = useParams();
    const [docs, setDocs] = useState([]);
    const [historys, setHistorys] = useState([]);
    const [type, setType] = useState('all');
    const [docsCount, setDocsCount] = useState(0);
    const [quesCount, setQuesCount] = useState(0);    
    const [ques, setQues] = useState([]);

    const handleButtonClick = () => {
        setIsClicked(!isClicked);
      };
    
    const handleDocsClick = (title) => {
        nav(`/wiki/${title}`)
    }


      const getDocs = async () => {
        try{
            const result = await axios.get(`https://asku.wiki/api/wiki/query/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                setDocs(result.data.message);
                setDocsCount(result.data.message.length);
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    };

    const getQues = async () => {
        try{
            const result = await axios.get(`https://asku.wiki/api/question/query/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                    setQues(result.data.data);
<<<<<<< HEAD
=======
                    setQuesCount(result.data.data.length);
>>>>>>> 700d8676fc0fcb339ab72fcc0bb4281b17ce0182
                
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.message);
        }
    };
    
    //최근변경 리스트
    const getHistory = async () => {
        try{
            const result = await axios.get(`https://asku.wiki/api/wiki/historys?type=${type}`);
            setHistorys(result.data.message);
        } catch (error) {
            console.error(error);
            //alert(result.data.message);
        }
    };
    

    useEffect(() => {

        getDocs();
        getQues();
        getHistory();
        
        

    }, []);
    
    
  return (
    <div>
        <Header/>
        <div className={styles.results}>
            <div className={styles.header}>
                <img src={search}/>
                <h4>"{title}" 검색결과</h4>
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
<<<<<<< HEAD
                                <div key={item.title} onClick={handleDocsClick(item.title)}>
                                    <ResultBox
=======
                                <div key={item.title} onClick={() => handleDocsClick(item.title)}>
                                    <BookmarkBox
>>>>>>> 700d8676fc0fcb339ab72fcc0bb4281b17ce0182
                                    title={item.title} 
                                    content={item.recent_filtered_content} bookmark={item.bookmark}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={isClicked ? styles.hidden : 'default'}>
                        {ques.map((item) => {
                            return(
<<<<<<< HEAD
                                <Question
=======
                            <ResultQues
>>>>>>> 700d8676fc0fcb339ab72fcc0bb4281b17ce0182
                                key={item.id}
                                id={item.id}
                                doc_id={item.doc_id}
                                user_id={item.user_id}
                                index_title={item.index_title}
                                content={item.content}
                                created_at={item.created_at}
                                answer_or_not={item.answer_or_not}
                                is_bad={item.is_bad}
                                nick={item.nickname}
                                like_count={item.like_count}
                                title={title}
<<<<<<< HEAD
                              />
=======
                            />
>>>>>>> 700d8676fc0fcb339ab72fcc0bb4281b17ce0182
                            );
                        })}
                    </div>
                    <div className={styles.linkToNew}><Link to='/newwiki' className={styles.link}>원하시는 질문이 없으신가요? 새로운 질문을 생성해보세요</Link></div>
                    
                </div>
                <div className={styles.recents}>
                    <div className={styles.recentWrap}>

                    {historys.slice(0,8).map((item) => {
                        const timestamp = FormatTimeAgo(item.created_at);
                            return(
                                
                                <ul key={item.title}>
                                    <Link to={`/wiki/${item.doc_title}`} className={styles.linkTo}>
                                        <span className={styles.listTitle}>{item.doc_title}</span>
                                    </Link>
                                    <span className={styles.listTimestamp}>{timestamp}</span>
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