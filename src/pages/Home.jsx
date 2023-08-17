import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo_big.png';
import styles from './Home.module.css';
import searchIcon from '../img/search_icon.png';
import chatBotBtn from '../img/chatBotBtn.png';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Home({loggedIn, setLoggedIn}) {
    const [inputValue, setInputValue] = useState('');
    const [popularKeywords, setPopularKeywords] = useState([]);
//     const Navigate = useNavigate();
//     useEffect(() => {
//     const checkLoginStatus = async () => {
//         try {
//         const res = await axios.get("http://118.67.130.57:8080/user/auth/issignedin", {withCredentials: true});
//         if (res.status===201 && res.data.success===true) {
//             setLoggedIn(true);
//         } else if(res.status === 401){
//             setLoggedIn(false);
//             Navigate('/signin');
//         }
//     } catch (error) {
//         console.error(error);
//         setLoggedIn(false);
//         Navigate('/signin');
//     }
// };
//     checkLoginStatus();
// }, [Navigate, setLoggedIn]);
    useEffect(() => {
        const fetchPopularKeywords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/search/popular');
                if (response.data.success) {
                    setPopularKeywords(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularKeywords();
    }, []);
    return (
        <div className="pageWrap">
            <Header />
            <div className={styles.homeWrap}>
                <img src={logo} className={styles.logo} alt="logo" />
                <div className={styles.inputContainer}>
                    <input 
                        className={styles.searchInput} 
                        placeholder='검색어를 입력하세요.' 
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') { // 엔터키를 누를 때
                                e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
                                if (inputValue.trim() !== '') {
                                    window.location.href = `/result/${inputValue}`; // 페이지 이동
                                    setInputValue('');
                                }
                            }
                        }} />
                        <img 
                            src={searchIcon}
                            alt='icon'
                            className={styles.searchIcon}
                            onClick={() => {
                                if (inputValue.trim() !== '') {
                                    window.location.href = `/result/${inputValue}`; // 페이지 이동
                                    setInputValue('');
                                }
                            }} />
                </div>
                <div className={styles.chatBotContainer}>
                    <Chatbot />
                    <Link to='/chatbot'>
                        <img src={chatBotBtn} alt='button' className={styles.chatBotBtn} />
                    </Link>
                    <div className={styles.realTime}>
                        <div className={styles.keyWord}>
                            <p className={styles.realTimeTitle}>실시간 인기 검색어</p>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>1.</p>
                                    <p className={styles.rankContent}>입실렌티</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>2.</p>
                                    <p className={styles.rankContent}>고려대학교</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>3.</p>
                                    <p className={styles.rankContent}>입실렌티 라인업</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>4.</p>
                                    <p className={styles.rankContent}>출입신청</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>5.</p>
                                    <p className={styles.rankContent}>입실렌티</p>
                                </div>
                                {/* <div className={styles.keyWord}>
                                    <p className={styles.realTimeTitle}>실시간 인기 검색어</p>
                                    {popularKeywords.map((keyword, index) => (
                                        <div className={styles.rankWrap} key={index}>
                                            <p className={styles.numberIcon}>{index + 1}.</p>
                                            <p className={styles.rankContent}>{keyword.keyword}</p>
                                        </div>
                                    ))}
                                </div> */}
                        </div>
                        <div className={styles.question}>
                        <p className={styles.realTimeTitle}>실시간 인기 질문</p>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>Q.</p>
                                    <p className={styles.rankContent}>교환학생 1지망 다들 어디로 했어?</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>Q.</p>
                                    <p className={styles.rankContent}>교환학생 1지망 다들 어디로 했어?</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>Q.</p>
                                    <p className={styles.rankContent}>교환학생 1지망 다들 어디로 했어?</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>Q.</p>
                                    <p className={styles.rankContent}>교환학생 1지망 다들 어디로 했어?</p>
                                </div>
                                <div className={styles.rankWrap}>
                                    <p className={styles.numberIcon}>Q.</p>
                                    <p className={styles.rankContent}>교환학생 1지망 다들 어디로 했어?</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;