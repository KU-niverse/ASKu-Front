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
    const [popularQuestions, setPopularQuestions] = useState([]);

    useEffect(() => {
        const fetchPopularKeywords = async () => {
            try {
                const response = await axios.get('https://asku.wiki/api/search/popular');
                if (response.data.success) {
                    setPopularKeywords(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularKeywords();
    }, []);
    useEffect(() => {
        const fetchPopularQuestions = async () => {
            try {
                const response = await axios.get('https://asku.wiki/api/question/popular');
                if (response.data.success) {
                    setPopularQuestions(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchPopularQuestions();
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
                                    window.location.href = `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`; // 페이지 이동
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
                                    window.location.href = `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`; // 페이지 이동
                                    setInputValue('');
                                }
                            }} />
                </div>
                <div className={styles.chatBotContainer}>
                    <Chatbot isLoggedIn={loggedIn} />
                    <Link to='/chatbot'>
                        <img src={chatBotBtn} alt='button' className={styles.chatBotBtn} />
                    </Link>
                    <div className={styles.realTime}>
                        <div className={styles.keyWord}>
                            <p className={styles.realTimeTitle}>실시간 인기 검색어</p>
                            {popularKeywords.slice(0, 5).map((keyword, index) => (
                                <Link to={`/result/${encodeURIComponent(keyword.keyword).replace(/\./g, '%2E')}`} className={styles.rankWrap} key={index}>
                                    <p className={styles.numberIcon}>{index + 1}.</p>
                                    <p className={styles.rankContent}>{keyword.keyword}</p>
                                </Link>
                            ))}
                        </div>
                        <div className={styles.question}>
                            <p className={styles.realTimeTitle}>실시간 인기 질문</p>
                            {popularQuestions.map((question, index) => (
                                <div className={styles.rankWrap} key={index}>
                                    <p className={styles.numberIcon}>Q.</p>
                                    <p className={styles.rankContent}>{question.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;