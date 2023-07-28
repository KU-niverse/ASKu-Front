import ChatAnswer from './ChatAnswer';
import ChatQuestion from './ChatQuestion';
import styles from './Chatbot.module.css';
import arrow from '../img/arrow.png';
import axios from 'axios';
import { useState, useEffect, useRef, Fragment} from 'react';
import Modal from "./Modal";
import haho from "../img/3d_haho.png";
import Spinner from "./Spinner";

function Chatbot () {
    const [inputValue, setInputValue] = useState("");
    const [responseContent, setResponseContent] = useState('');
    const [responseReference, setResponseReference] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuggest, setShowSuggest] = useState(true);
    const inputRef = useRef(null);
    const [chatResponse, setChatResponse] = useState([
        // {
        //   index: '0',
        //   content: '일번항목',
        //   reference: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        // },
        // {
        //   index: '1',
        //   content: '이번항목',
        //   reference: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        // },
      ]);
    
    const inputChange = (e) => {
        setInputValue(e.target.value);
    }

    const sendMessage = () => {
    if (inputValue.trim() !== '') {
        setLoading(true);
        //content 대신 q_content, user_id 반드시 보내야 함
        axios.post('http://223.130.135.214:8080/chatbot/', {
            q_content: inputValue,
            user_id: "1",
            // reference: "1"
        })
        .then(response => {
            setShowSuggest(false);
            inputRef.current.blur();
            const newChatResponse = [
            ...chatResponse,
            { content: inputValue }, // 사용자의 질문 추가
            { content: response.data.a_content, reference: response.data.reference } // 서버 응답 추가
            ];
            setChatResponse(newChatResponse);
            setLoading(false);
            setInputValue('');
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
        axios.get('http://223.130.135.214:8080/chatbot/')
            .then(response => {
                console.log(response.data);
                const { content, reference } = response.data;
                if (content && reference) {
                    setChatResponse([...chatResponse, { content, reference }]);
                }
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
            <ChatAnswer content="안녕하세요! 무엇이든 제게 질문해주세요!" />
            {chatResponse.map((item, index) => {
                if (index % 2 === 0) {
                return <ChatQuestion key={index} content={item.content} />;
                } else {
                return <ChatAnswer key={index} content={item.content} reference={item.reference} />;
                }
            })}
            <div
            className={styles.suggest}
            style={{ display: showSuggest ? 'block' : 'none' }}>
                <p id={styles.ref}>추천 검색어</p>
                <span id='ref_res_1' className={styles.textBox}>중도휴학 하는 방법 알려줘!</span>
                <span id='ref_res_2' className={styles.textBox}>천원학식에 대해 알려줘!</span>
                <span id='ref_res_3' className={styles.textBox}>2024년 신입생 수시 모집 기간 알려줘!</span>
                <span id='ref_res_4' className={styles.textBox}>디자인조형학부 홈페이지 주소 보내줘!</span>
            </div>
            {loading && (
                    <Spinner/>
                )}
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