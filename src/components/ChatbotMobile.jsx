import Header from '../components/Header';
import styles from './ChatbotMobile.module.css';
import like from '../img/like.png';
import unlike from '../img/unlike.png';
import reference from '../img/reference.png';
import dots from '../img/dots.png';
import haho from '../img/3d_haho.png';
import arrow from '../img/arrow.png';
import axios from 'axios';

function ChatbotMobile() {
    return (
    <div>
        <Header />
        <div>
            <div className={styles.topBar}>
                <p id={styles.title}>AI 챗봇</p>
                <button className={styles.button}>채팅 비우기</button>
                <button className={styles.button}>도움말</button>
            </div>
            <div>
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
                        <p id={styles.ref}>추천 검색어</p>
                        <div className={styles.textBox}>중도휴학 하는 방법 알려줘!</div>
                        <div className={styles.textBox}>천원학식에 대해 알려줘!</div>
                        <div className={styles.textBox}>2024년 신입생 수시 모집 기간 알려줘!</div>
                        <div className={styles.textBox}>디자인조형학부 홈페이지 주소 보내줘!</div>
                    </div>
                    <div className={styles.promptWrap}>
                        <textarea className={styles.prompt} placeholder="AI에게 무엇이든 물어보세요! (프롬프트 입력)"/>
                        <div className={styles.sendBtn}>
                            <img src={arrow} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ChatbotMobile;