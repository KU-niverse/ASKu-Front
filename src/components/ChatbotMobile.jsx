import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from './ChatbotMobile.module.css';
import arrow from '../img/arrow.png';
import axios from 'axios';
import Spinner from "./Spinner";
import LoginModal from './LoginModal';
import { useState, useEffect, useRef, Fragment} from 'react';
import ChatAnswer from './ChatAnswer';
import ChatQuestion from './ChatQuestion';


function ChatbotMobile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuggest, setShowSuggest] = useState(true);
    const inputRef = useRef(null);
    const [chatResponse, setChatResponse] = useState([]);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const navigate = useNavigate();

    const inputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleWindowResize = () => {
        const width = window.innerWidth;
        if (width >= 768) {
            navigate('/');
        } else {
            navigate('/chatbot');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("https://asku.wiki/api/user/auth/issignedin", {
                    withCredentials: true
                });
                if (res.status === 201 && res.data.success === true) {
                    setIsLoggedIn(true);
                } else if (res.status === 401) {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error(error);
                setIsLoggedIn(false);
            }
        };
        checkLoginStatus();
    }, []);

    const sendMessage = () => {
        if (!isLoggedIn) {
            setLoginModalVisible(true);
            return;
        }
        if (inputValue.trim() !== '') {
            setLoading(true);
            //content 대신 q_content, user_id 반드시 보내야 함
            axios.post('https://asku.wiki/ai/chatbot/', {
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
                setInputValue('');
    
                setTimeout(() => {
                    setLoading(false); // 로딩 스피너 숨기기
                }, 10000);
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
                if (!isLoggedIn) {
                    setLoginModalVisible(true);
                    return;
                }
                sendMessage();
            }
        };
    
        const handleSuggestClick = (content) => {
            setShowSuggest(false);
    
            const newChatResponse = [
                ...chatResponse,
                { content, isQuestion: true }, // 사용자의 질문 추가
            ];
            setChatResponse(newChatResponse);
        
            setLoading(true); // 로딩 시작
        
            setTimeout(() => {
                setLoading(false); // 로딩 스피너 숨기기
        
                // 더미 데이터에서 해당 추천 검색어에 대한 미리 저장한 답변을 가져와서 사용합니다.
                const dummyAnswers = {
                    '중도휴학 하는 방법 알려줘!': '이것은 더미데이터다.',
                    '천원학식에 대해 알려줘!': '이것은 더미데이터다.',
                    '2024년 신입생 수시 모집 기간 알려줘!': '이것은 더미데이터다.',
                    '디자인조형학부 홈페이지 주소 보내줘!': '이것은 더미데이터다.',
                    // 다른 추천 검색어에 대한 답변도 추가합니다.
                };
        
                const answer = dummyAnswers[content] || '미리 저장된 답변이 없습니다.';
        
                // 답변 컴포넌트를 생성하고 더미 데이터의 답변을 추가합니다.
                const updatedChatResponse = [
                    ...newChatResponse,
                    { content: answer } // 더미 데이터에서 가져온 답변 추가
                ];
                setChatResponse(updatedChatResponse);
                setInputValue('');
                setShowSuggest(true);
            }, 5000); // 5초 후에 실행
        };
        
        
        useEffect(() => {
            inputRef.current.focus();
            axios.get('https://asku.wiki/ai/chatbot/')
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
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
            <Header />
            <div className={styles.mobileChatbotWrap}>
                <div className={styles.topBar}>
                    <p id={styles.title}>AI 챗봇</p>
                    <button className={styles.button}>채팅 비우기</button>
                    <button className={styles.button}>도움말</button>
                </div>
                <div>
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
                        <span id='ref_res_1' className={styles.textBox}
                            onClick={() => handleSuggestClick('중도휴학 하는 방법 알려줘!')}>
                            중도휴학 하는 방법 알려줘!
                        </span>
                        <span id='ref_res_2' className={styles.textBox}
                            onClick={() => handleSuggestClick('천원학식에 대해 알려줘!')}>
                            천원학식에 대해 알려줘!
                        </span>
                        <span id='ref_res_3' className={styles.textBox}
                            onClick={() => handleSuggestClick('2024년 신입생 수시 모집 기간 알려줘!')}>
                            2024년 신입생 수시 모집 기간 알려줘!
                        </span>
                        <span id='ref_res_4' className={styles.textBox}
                            onClick={() => handleSuggestClick('디자인조형학부 홈페이지 주소 보내줘!')}>
                            디자인조형학부 홈페이지 주소 보내줘!
                        </span>
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
                {isLoginModalVisible && <LoginModal isOpen={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />}
                </div>
            </div>
        </div>
    );
}

export default ChatbotMobile;