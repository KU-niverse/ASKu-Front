import ChatAnswer from './ChatAnswer';
import ChatQuestion from './ChatQuestion';
import styles from './Chatbot.module.css';
import arrow from '../img/arrow.png';
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import Modal from "./Modal";

function Chatbot () {
    const [inputValue, setInputValue] = useState("");
    const [responseContent, setResponseContent] = useState('');
    const [responseReference, setResponseReference] = useState('');
    const [showSuggest, setShowSuggest] = useState(true);
    const inputRef = useRef(null);
    const [chatResponse, setChatResponse] = useState([
        {
          index: '0',
          content: '일번항목',
          reference: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
      ]);

    const inputChange = (e) => {
        setInputValue(e.target.value);
    }

    const sendMessage = () => {
    if (inputValue.trim() !== '') {
        axios.post('http://223.130.135.214:8080/chatbot/', {
            content: inputValue,
            reference: "1"
        })
        .then(response => {
            console.log('답변이 생성중입니다...');
        })
        .catch(error => {
            console.error(error);
        });
        setShowSuggest(false);
        inputRef.current.blur();
        const newChatResponse = [...chatResponse, { content: inputValue }];
        setChatResponse(newChatResponse);
        setInputValue('');
        };
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target === inputRef.current) {
            sendMessage();
        }
    };
    
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    useEffect(() => {
    axios.get('http://223.130.135.214:8080/chatbot/')
        .then(response => {
            console.log(response.data.content);
            setResponseContent(response.data.content);
            setResponseReference(response.data.reference);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
    <div className={styles.chatBot}>
        <div className={styles.sideBar}>
            <div className={styles.textWrap}>
                <button id={styles.title}>AI 챗봇</button>
                <button className={styles.button}>채팅 비우기</button>
                <button className={styles.button}>도움말</button>
            </div>
        </div>
        <div className={styles.chat}>
            <ChatAnswer/>
            {chatResponse.map((item) => {
                return(
                    <ChatQuestion
                    content = {item.content} />
                );
            })}
            {chatResponse.map((item) => {
                return(
                    <ChatAnswer
                    content = {item.content} />
                );
            })}
            <div
            className={styles.suggest}
            style={{'opacity': showSuggest ? '1' : '0'}}>
                <p id={styles.ref}>추천 검색어</p>
                <span className={styles.textBox}>중도휴학 하는 방법 알려줘!</span>
                <span className={styles.textBox}>천원학식에 대해 알려줘!</span>
                <span className={styles.textBox}>2024년 신입생 수시 모집 기간 알려줘!</span>
                <span className={styles.textBox}>디자인조형학부 홈페이지 주소 보내줘!</span>
            </div>
            <div className={styles.promptWrap}>
                <textarea
                    className={styles.prompt}
                    placeholder="AI에게 무엇이든 물어보세요! (프롬프트 입력)"
                    value={inputValue}
                    onChange={inputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <div className={styles.sendBtn} onClick={sendMessage}>
                    <img src={arrow} /> 
                </div>
            </div>
        </div>
        <Modal />
    </div>
    );
}

export default Chatbot;