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
    
    const getUserInfo = async () => {
        try {
            const res = await axios.get("https://asku.wiki/api/user/mypage/info", {
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

    const scrollToBottom = () => {
        chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

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
                scrollToBottom();
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
                "강의 최소 출석 일수에 대해 알려줘.": "제1조 (목적) 이 규정은 고려대학교 학칙 제45조제1항 및 제46조제1항에 근거하여 출석인 정에 관한 세부사항을 정함을 목적으로 한다. 제2조 (출석 및 성적 처리 기준) (1) 총 수업시간의 1/3 이상을 결석한 학생에 대해서는 성적을 부여하지 않습니다. 따라서, 고려대학교에서는 수업시간의 1/3 이상을 결석하면 성적을 받을 수 없습니다. 추가적인 출석 요건은 학칙에 명시되어 있지 않으므로, 이 학칙에 따라 출석 인정 기준이 정해져 있다고 볼 수 있습니다.",
                "너는 누구야?": "AI 하호입니다. 저는 고려대학교 학생들의 고려대학교 학칙에 대한 질문에 대답하는 AI Chatbot입니다. 질문이 있으신가요?",
                "중도휴학은 어떻게 해?": "중도휴학에 대한 절차와 관련된 정보는 고려대학교 학칙에 상세히 명시되어 있습니다. 중도휴학을 원하는 학생은 본인의 휴학 사유와 일정을 학과에 알려야 합니다. 학과 내규에 따라 중도휴학 신청서를 작성하고 학과 사무실에 제출해야 합니다. 또한, 휴학기간 중에는 복학 신청 기간에 휴학을 중도 종료하고 복학할 의향을 학과에 통보해야 합니다. 중도휴학과 관련된 상세한 사항 및 절차는 학과와 학교의 규정을 반드시 확인하시기 바랍니다.",
                '이중전공은 어떻게 해?': '고려대학교에서 이중전공을 신청하려면 다음과 같은 절차를 따라야 합니다. 1. 이중전공을 원하는 학과(부)의 학칙을 참고하여 신청 자격과 절차를 확인하세요. 2. 학교에서 제공하는 이중전공 신청 관련 양식을 작성하여 제출해야 합니다. 이에는 이중전공 신청서, 이수계획서, 성적증명서 등이 포함될 수 있습니다. 3. 이중전공 신청서에는 제1지망과 제2지망으로 지원할 학과(부)를 기재해야 합니다. 4. 이중전공 신청서와 다른 서류들을 정해진 기간 내에 학과(부) 사무실에 제출하세요. 5. 이중전공 신청자들은 소정의 선발전형(학업성적 등에 기초한 선발 방식)을 거쳐 총장의 허가를 받아야 합니다. 6. 합격 여부는 학과(부)에서 통보해줄 것입니다. 학과(부)마다 선발 기준과 절차가 다를 수 있으므로 해당 학과(부)의 내규를 확인하세요. 7. 이중전공 학생으로서 교육과정표에서 정해진 최소학점 이상의 전공과목을 이수해야 합니다. 8. 이중전공을 포기하고 심화전공 또는 다른 제2전공으로 변경하려면 해당되는 기간 내에 소정의 절차를 따라 포기신청을 해야 합니다. 위의 내용은 고려대학교 학칙 제106조~제108조에서 언급된 내용을 요약한 것입니다. 학교의 학칙과 부서별 규정을 확인하여 상세한 내용을 파악하고 절차를 따르시기 바랍니다.',
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
        }, 3000); // 3초 후에 실행
    };

    const chatBottomRef = useRef(null);


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

                } catch (error) {
                    console.error(error);
                }
            } 
        getMessage();
    }, [userId]);

    const scrollToBottomOnLoadingChange = () => {
        if (loading) {
            scrollToBottom();
        }
    };
    
    useEffect(() => {
        scrollToBottomOnLoadingChange();
    }, [loading]);
    

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
                    <p id={styles.ref}>추천 질문</p>
                    <span id='ref_res_1' className={styles.textBox}
                        onClick={() => handleSuggestClick('너는 누구야?')}>
                        너는 누구야?
                    </span>
                    <span id='ref_res_2' className={styles.textBox}
                        onClick={() => handleSuggestClick('중도휴학은 어떻게 해?')}>
                        중도휴학은 어떻게 해?
                    </span>
                    <span id='ref_res_3' className={styles.textBox}
                        onClick={() => handleSuggestClick('강의 최소 출석 일수에 대해 알려줘.')}>
                        강의 최소 출석 일수에 대해 알려줘.
                    </span>
                    <span id='ref_res_4' className={styles.textBox}
                        onClick={() => handleSuggestClick('이중전공은 어떻게 해?')}>
                        이중전공은 어떻게 해?
                    </span>
                </div>
                <div ref={chatBottomRef}></div> {/* 스크롤 최하단 이동을 위한 빈 div */}
                {loading && (
                        <Spinner/>
                    )}

            </div>
            {isLoginModalVisible && <LoginModal isOpen={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />}
            {ClearModalOpen && <ClearModal isOpen={ClearModalOpen} onClose={() => setClearModalOpen(false)} userId={userId} />}
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