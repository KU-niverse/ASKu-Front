import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import logo from '../img/logo_big.png';
import styles from './Home.module.css';
import searchIcon from '../img/search_icon.png';
import like from '../img/like.png';
import unlike from '../img/unlike.png';
import reference from '../img/reference.png';
import dots from '../img/dots.png';
import haho from '../img/3d_haho.png';

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
                    <div className={styles.chatBot}>
                        <div className={styles.sideBar}>
                            <div className={styles.textWrap}>
                                <button id={styles.title}>AI 챗봇</button>
                                <button className={styles.button}>채팅 비우기</button>
                                <button className={styles.button}>도움말</button>
                            </div>
                        </div>
                        <div className={styles.chat}>
                            <div className={styles.defaultChat}>
                                <div className={styles.characterContainer}>
                                    <img src={haho} alt="character" className={styles.character} />
                                </div>
                                <p className={styles.chatText}>안녕하세요. 저에게 무엇이든 질문해 주세요.</p>
                                <img src={dots} className={styles.dots} />
                                <div className={styles.iconZip}>
                                    <img className={styles.icon} src={like} alt="like" />
                                    <img className={styles.icon} src={unlike} alt="unlike" />
                                    <img className={styles.icon} src={reference} alt="reference link" />
                                </div>
                            </div>
                            <div className={styles.suggest}>
                                <p>추천 검색어</p>
                                <div>중도휴학 하는 방법 알려줘!</div>
                                <div>천원학식에 대해 알려줘!</div>
                                <div>2024년 신입생 수시 모집 기간 알려줘!</div>
                                <div>디자인조형학부 홈페이지 주소 보내줘!</div>
                            </div>
                            <div className={styles.prompt}>
                                <textarea placeholder="AI에게 무엇이든 물어보세요! (프롬프트 입력)"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.realTime}>
                        <div className={styles.keyWord}>

                        </div>
                        <div className={styles.question}>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;