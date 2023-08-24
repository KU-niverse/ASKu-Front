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
import BookmarkBox from '../components/BookmarkBox';




const data = [
    {
        'title': '입실렌티',
        'recent_filtered_content': '개요 벨 연구소에서 멀틱스 프로젝트에 참여한 바 있던 켄 톰슨, 데니스 리치 등이 멀틱스의 일부 아이디어를 가져와서 소형 컴퓨터에서도 작동할 수 있는 단순한 운영 체제를 만든 후 유닉스(UNIX)라는 이름을 붙였다. 유닉스는 1969년도부터 개발되기 시작하여 1973년 10월에 운영체제 분야의 최상위 학술대회인 ACM Symposium on Operating Systems Principles(SOSP)에서 공개되었다. 하하하하하호호호호호 히히 키키키키키키킼키키키키gggg BSD AT&T에서 학교에 비교적 저렴한 비용으로 연구용 유닉스의 소스 코드를 배포했는데, 이 소스 코드를 확보한 캘리포니아 대학교 버클리 캠퍼스의 대학원생이었던 빌 조이(Bill Joy) 등이 유닉스의 소스 코드를 개선하고 새로운 프로그램을 추가한 BSD를 만들어 1978년에 배포하였다. ​ 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 리눅스 Linux|리눅스는 유닉스의 직접적인 후계자는 아니지만 유닉스의 설계 개념 등에 영향을 받았다. 리눅스는 유닉스의 POSIX 규격을 거의 대부분 따른다. 따라서 리눅스도 그 족보를 거슬러 올라가면 멀틱스로부터 갈라져나온 셈ㄴㅁㅇㄻㄴㅇ. 분류:멀틱스 rhrhrh 고양이 고양이는 정말 귀여워원하시는 질문이 없으신가요? 새로운 질문을 생',
    },
    {
        'title': '입실렌티',
        'recent_filtered_content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    },
    {
        'title': '입실렌티',
        'recent_filtered_content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    },
    {
        'title': '입실렌티',
        'recent_filtered_content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
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
                    setQuesCount(result.data.data.length);
                
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
                    <button onClick={handleButtonClick} className={isClicked ? styles.btnRed: styles.btnGray}>문서<div className={isClicked ? styles.numberRed : styles.numberGray}>{docs.length}</div></button>
                    <button onClick={handleButtonClick} className={isClicked ? styles.btnGray : styles.btnRed}>질문<div className={isClicked ? styles.numberGray : styles.numberRed}>{ques.length}</div></button>
                </p>
                <p className={styles.title}>최근 변경</p>
            </div>
            <div className={styles.contents}>
                <div className={styles.boxes}>
                    <div className={isClicked ? '': styles.hidden}>
                        {docs.map((item) => {
                            return(
                                <div key={item.title} onClick={() => handleDocsClick(item.title)}>
                                    <BookmarkBox
                                    title={item.title} 
                                    content={item.recent_filtered_content} bookmark={item.is_deleted}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={isClicked ? styles.hidden : ''}>
                        {ques.map((item) => {
                            return(
                            <ResultQues
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
                                onClick={()=> nav(`/wiki/morequestion/${item.title}`)}
                            />
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