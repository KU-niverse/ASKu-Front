import ChatAnswer from './ChatAnswer';
import ChatQuestion from './ChatQuestion';
import styles from './Chatbot.module.css';
import arrow from '../img/arrow.png';
import axios from 'axios';
import { useState, useEffect, useRef, Fragment } from 'react';
import Spinner from "./Spinner";
import LoginModal from './LoginModal';
import ClearModal from './ClearModal';
import { Link } from 'react-router-dom';

function Chatbot ({isLoggedIn, setIsLoggedIn}) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuggest, setShowSuggest] = useState(true);
    const inputRef = useRef(null);
    const [chatResponse, setChatResponse] = useState([]);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [previousChatHistory, setPreviousChatHistory] = useState([]);
    const blockIconZip = true;
    const [ClearModalOpen, setClearModalOpen] = useState(false);
    const closeLoginModal = () => {
        setLoginModalVisible(false);
    };
    const [userId, setUserId] = useState('');
    
    const inputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleClearModal = () => {
        if (!ClearModalOpen) {
            setClearModalOpen(true);
        } else {
            setClearModalOpen(false);
        }
    }


    // const checkLoginStatus = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:8080/user/auth/issignedin", {
    //             withCredentials: true
    //         });
    //         if (res.status === 201 && res.data.success === true) {
    //             setIsLoggedIn(true);
    //         } else if (res.status === 401) {
    //             setIsLoggedIn(false);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setIsLoggedIn(false);
    //     }
    // };
    
    const getUserInfo = async () => {
        try {
            const res = await axios.get("http://localhost:8080/user/mypage/info", {
                withCredentials: true
            });
            if (res.status === 201 && res.data.success === true) {
                // 사용자 정보에서 id를 가져옴
                setUserId(res.data);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
        }
    };

    // getUserInfo 함수를 useEffect 내에서 호출
    useEffect(() => {
        getUserInfo();
    }, []);


    const sendMessage = async () => {
        if (!isLoggedIn) {
            setLoginModalVisible(true);
            return;
        }
    
        if (inputValue.trim() !== '') {
            setLoading(true);
    
            try {
                const response = await axios.post(`https://asku.wiki/ai/chatbot/`, {
                    q_content: inputValue,
                    user_id: userId.data[0].id
                });
    
                setShowSuggest(false);
                inputRef.current.blur();
    
                const newChatResponse = [
                    ...chatResponse,
                    { content: inputValue }, // 사용자의 질문 추가
                    { content: response.data.a_content, reference: response.data.reference } // 서버 응답 추가
                ];
    
                setChatResponse(newChatResponse);
                setInputValue('');

                // axios 요청 완료 후 로딩 스피너를 비활성화
                setLoading(false); // 로딩 스피너 숨기기
            } catch (error) {
                console.error(error);

                // axios 요청 실패 시에도 로딩 스피너를 비활성화
                setLoading(false);
            }
        }
    };

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
            { content, isQuestion: true, blockIconZip: true }, // 사용자의 질문 추가
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
                { content: answer, blockIconZip: true } // 더미 데이터에서 가져온 답변 추가
            ];
            setChatResponse(updatedChatResponse);
            setInputValue('');
            setShowSuggest(true);
        }, 5000); // 5초 후에 실행
    };

    const chatBottomRef = useRef(null);
    const scrollToBottom = () => {
        chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // chatResponse 배열이 업데이트될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        scrollToBottom();
    }, [chatResponse]);

    useEffect(() => {
        scrollToBottom();
      }, [previousChatHistory]);

    //   useEffect(() => {
    //     chatBottomRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    // }, [previousChatHistory]);

    useEffect(() => {
        if (!isLoggedIn) {
            setPreviousChatHistory([]); // isLoggedIn이 false일 때 previousChatHistory 초기화
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const getMessage = async() => {
        inputRef.current.focus();
            try {
                const response = await axios.get(`https://asku.wiki/ai/chatbot/${userId.data[0].id}`);
                const previousHistory = response.data;
                setPreviousChatHistory(previousHistory);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        } 
        getMessage();
    }, [userId]);

    return (
        <div className={styles.chatBot}>
            <div className={styles.sideBar}>
                <div className={styles.textWrap}>
                    <button id={styles.title}>AI 하호</button>
                    <button className={styles.button} onClick={handleClearModal}>채팅 비우기</button>
                    <Link to='https://034179.notion.site/AI-b72545cea3ef421cbfc59ad6ed89fced?pvs=4' target="_blank" >
                        <button className={styles.button}>도움말</button>
                    </Link>
                </div>
            </div>
            <div className={styles.chat}>
                <ChatAnswer 
                    content="안녕하세요! 무엇이든 제게 질문해주세요!"
                    blockIconZip={blockIconZip}
                />
                {previousChatHistory.length !== 0 && (
                    <>
                        {previousChatHistory.map((item, index) => (
                            <Fragment key={item.id}>
                                <ChatQuestion content={item.q_content} />
                                <ChatAnswer content={item.a_content} reference={item.reference} />
                            </Fragment>
                        ))}
                    </>
                )}
                {chatResponse.map((item, index) => {
                    if (index % 2 === 0) {
                    return <ChatQuestion key={index} content={item.content} />;
                    } else {
                    return <ChatAnswer key={index} content={item.content} reference={item.reference} blockIconZip={!blockIconZip}/>;
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
                <div ref={chatBottomRef}></div> {/* 스크롤 최하단 이동을 위한 빈 div */}
                {loading && (
                        <Spinner/>
                    )}

            </div>
            {isLoginModalVisible && <LoginModal isOpen={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />}
            {ClearModalOpen && <ClearModal isOpen={ClearModalOpen} onClose={() => setClearModalOpen(false)}/>}
            <div className={styles.promptWrap}>
                <textarea
                    className={styles.prompt}
                    placeholder="AI에게 무엇이든 물어보세요! (프롬프트 입력)"
                    value={inputValue}
                    onChange={inputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    disabled={loading}
                />
                <div className={styles.sendBtn} onClick={sendMessage}>
                    <img src={arrow} /> 
                </div>
            </div>
        </div>
        );
    }

export default Chatbot;