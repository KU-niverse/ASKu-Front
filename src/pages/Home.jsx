import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { Link } from 'react-router-dom';
import logo from '../img/logo_big.png';
import styles from './Home.module.css';
import searchIcon from '../img/search_icon.png';


function Home() {
    return (
        <div className="pageWrap">
            <Header />
            <div className={styles.homeWrap}>
                <img src={logo} className={styles.logo} alt="logo" />
                <div className={styles.inputContainer}>
                    <input className={styles.searchInput} placeholder='검색어를 입력하세요.' />
                    <img src={searchIcon} alt='icon' className={styles.searchIcon} />
                </div>
                <div className={styles.chatBotContainer}>
                    <Chatbot />
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