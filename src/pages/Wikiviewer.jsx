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
import minilike from '../img/minilike.png'
import WikiBox from '../components/WikiBox';
import Switch from '../components/Switch';
import { useParams } from 'react-router-dom/dist';
import WikiGraph from "../components/Wiki/WikiGraph";
import SpinnerMypage from '../components/SpinnerMypage';


// const Ques = [
//     {
//         'index' : '1.',
//         'number': '1',
//         'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요 ',
//     },
//      {
//         'index' : '2.',
//         'number': '2',
//          'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
         
//      },
//      {
//          'index' : '3.',
//          'number': '3',
//          'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
//      },
//      {
//          'index': '4.',
//          'number': '4',
//          'title': '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
//      },
//  ]


//  const data = [
//     {
//         'index' : '1.',
//         'section': '1',
//         'title': '일번항목',
//         'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
//     },
//      {
//         'index' : '2.',
//         'section': '2',
//          'title': '이번항목',
//          'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
//      },
//      {
//          'index' : '3.',
//          'section': '3',
//          'title': '삼번항목',
//          'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elitdddddd. ostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
//      },
//      {
//          'index': '4.',
//          'section': '4',
//          'title': '사번항목',
//          'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ostrum, odfkjs;fjskdjf;alskdjf;sdlkfj;alsdkjf;alskdjf;laksssumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!'    
//      },
//  ]


function WikiViewer() {
    const myDivRef = useRef([]);
    const nav = useNavigate();
    const [isToggled, setIsToggled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isBookmark, setIsBookmark] = useState(false);
    const {title} = useParams();
    const [allText, setAllText] = useState('');
    const [allContent, setAllContent] = useState([]);
    const [ques, setQues] = useState([]);
    const [contribute, setContribute] = useState([]);
    const [totalPoint, setTotalPoint] = useState(null);
    const [flag, setFlag] = useState(0);
    const [blank, setBlank] = useState(false); 
//문서: 아직 내용이 없습니다. 전체 편집에서 작성해보세요!
//기여도: 문서를 편집한 회원이 없습니다. 전체 편집으로 기여해보세요!
// 질문: 해당 문서에 대한 질문이 없습니다. 
    const [favorite, setFavorite] = useState(false);
    const [imageSource, setImageSource] = useState(falseBk);
    // const [isZero, setIsZero] = useState(false);

    const flagToggle = () =>{
        if (isToggled === false) {
            setFlag(0);
        } else {
            setFlag(1);
        }
    }

    useEffect(() => {
        flagToggle();
        
    }, [isToggled]);

    useEffect(() => {
        getQues();
        
    }, [flag]);


     function handleClick(index) {
        myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
        
    }
 
//
    

    //북마크 추가
    const addBookmark = async () => {
        try{
            const result = await axios.post(`http://localhost:8080/wiki/favorite/${title}`, {
                
            }, {
                withCredentials: true
            });
            if(result.data.success === true){
                setFavorite(true);
                alert('즐겨찾기에 추가되었습니다');
            } else {
              alert('문제가 발생하였습니다');
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
  
      //북마크 해제
      const deleteBookmark = async () => {
        try{
            const result = await axios.delete(`http://localhost:8080/wiki/favorite/${title}`, {
                withCredentials: true
            });
            if(result.data.success === true){
                setFavorite(false);
                alert('즐겨찾기에서 삭제되었습니다');
            } else {
              alert('문제가 발생하였습니다');
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
      };

    // 북마크 이미지 변경
   // 북마크 이미지 변경
// function handleClickBookmark() {
//     // 이미지가 변경되었을 때 다른 이미지 경로로 바꾸어줍니다.
//     if(deleted === false){
//         deleteBookmark();
//         setImageSource(falseBk);

//       } else if (deleted === true){
//         addBookmark();
//         setImageSource(trueBk);

//       }
// }

async function handleClickBookmark() {
    try {
      if (favorite === true) {
        await deleteBookmark();
        setFavorite(false); // Update the state first
        setImageSource(falseBk);
      } else if (favorite === false) {
        await addBookmark();
        setFavorite(true); // Update the state first
        setImageSource(trueBk);
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }

useEffect(() => {
    if( favorite === true){
        setImageSource(trueBk);

    } else if (favorite === false){
        setImageSource(falseBk);

    }
    
}, [favorite]);

    //버튼 링크 연결 함수들
    const linkToHistory = () => {
        nav(`/history/${title}`)
    }

    const linkToAllEdit = () => {
        nav(`/wikiedit/${title}/all`)
    }

    const linkToDebate = () =>{
        nav(`/debate/${title}`)
    }

    //contents가 비었으면 글이라도 띄우도록. 
    //위키 데이터 가져오기
    const getWiki = async () => {
        console.log('나중');
        try{
            const result = await axios.get(`http://localhost:8080/wiki/contents/${title}`);
            setAllContent(result.data.contents);
            // setDeleted((prevDeleted) => result.data.is_favorite);
            console.log(result.data);
            console.log(result.data.is_favorite);
            
            setFavorite(result.data.is_favorite);
            console.log(favorite);

            if( result.data.is_favorite === true){
                setImageSource(trueBk);
        
            } else if (result.data.is_favorite === false){
                setImageSource(falseBk);
        
            }
            
           

        } catch (error) {
            console.error(error);
            //alert(result.data.message);
        }
    };


   
    //질문 데이터 가져오기
    const getQues = async () => {
        console.log('실행')
        try{
            const result = await axios.get(`http://localhost:8080/question/view/${flag}/${title}`);
            setQues(result.data.data);
            console.log('성공');
            if (result.data.data.length===0) {
                setBlank(true); //어차피 문서 내용 없으나 질문 없으나 다 이거 띄워야 되니까 최적화 코드로 하자. 

            }else{
                setBlank(false);
            }

        } catch (error) {
            console.error(error);
            //alert(result.data.message);
        }

    };
    //질문 데이터 가져오기
    const getContribute = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/wiki/contributions/${title}`);
            console.log('기여도');
            setContribute(result.data.message);
            console.log(contribute);
            console.log('성공');

            if(contribute.length !== 0){
                console.log(contribute);
                const total = contribute.reduce((acc, item) => acc + parseInt(item.point), 0);
                setTotalPoint(total);
            } else{
                console.log('기여도 없음');
            }

            if (!contribute) {
                setBlank(true); //어차피 문서 내용 없으나 질문 없으나 다 이거 띄워야 되니까 최적화 코드로 하자. 

            }else{
                setBlank(false);
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            //alert(result.data.message);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            getWiki();
            getQues();
    
            
        };
        fetchData();
    }, []);

    useEffect(() => {
        
        if(!totalPoint){
            getContribute();
        }
        
    
    }, [totalPoint, contribute]);
    
       // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return <div><SpinnerMypage/></div>; 
  }
    

    

    //데이터 불러오기

  



    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wikiviewer}>
               <div className={styles.wikititle}>
                  <h1>{title}<img src={imageSource} alt="Image" onClick={handleClickBookmark} className={styles.bookmarkImg}/>
                  </h1>
                  <div className={styles.wikititleBtn}>
                    <button onClick={linkToDebate}><img src={debate}/>&nbsp;토론하기</button>

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
                            const tabCount = item.index.split('.').length - 1;
                            const tabs = '\u00a0\u00a0\u00a0'.repeat(tabCount); // 탭은 유니코드 공백 문자 사용
                        
                            return (
                                <li onClick={() => handleClick(item.section)} key={item.section}>
                                    <span className={styles.wikiIndex}>{tabs}{item.index}.</span> {item.title}
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
                    <div className={blank === false ? styles.quesWrap : styles.hidden}>
                            {ques.map((item, index) => {
                                if (index >= 5) {
                                  return null; // 패스 (무시)
                                }
                                return(
                                    <div className={styles.queslist}>
                                     <hr className={styles.customHr}></hr>
                                     <ul key={item.id} 
                                        onClick={() => nav(`/wiki/morequestion/${title}/${item.id}`, 
                                        {state:{
                                            question_id : item.id,
                                            user_id: item.user_id,
                                            content: item.content,
                                            created_at: item.created_at,
                                            like_count: item.like_count,
                                            nick: item.nick,
                                            index_title: item.index_title,
                                            answer_count: item.answer_count,
                                            title : title
                                          }}
                                     )} 
                                     className={styles.quesul}>
                                        <span className={styles.quesTitle}>Q.&nbsp;{item.content}</span>
                                        <span className={styles.quesNum}><span>{item.like_count}</span><img src={minilike}/></span>
                                     </ul>
                                    </div>
                                );
                            })}
                            <div className={blank === true ? styles.default : styles.hidden}>아직 질문이 없습니다. 질문을 생성해 주세요</div>
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
                <div className={styles.wikigraph}>
                    {contribute && totalPoint && (
                       <WikiGraph 
                         total_point={totalPoint}
                         users={contribute}
                       />
                     )}              
                </div>
               </div>
               <div className={styles.wikicontent}>
                    {allContent.map((item) => {
                        //0. 들어가며 일시 질문 및 편집 막기 위해 판단
                        let isZero;

                        if(item.index === '0'){
                            isZero = true;
                        } else{
                            isZero = false;
                        }

                        return(
                            <div ref={(el) => (myDivRef.current[item.section] = el)} key={item.section}>
                                <WikiBox 
                                title={item.title} content={item.content} index={item.index} section={item.section} main={title} isZero={isZero}
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