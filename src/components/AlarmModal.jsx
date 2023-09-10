import styles from './AlarmModal.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import closeBtn from '../img/close_btn.png';
import { Link } from 'react-router-dom';

const patterns = {
    1: /\[즐겨찾기\] (.+?) 문서에 질문이 있습니다\./,
    2: /\[좋아요\] (.+?) 문서의 (.+?) 질문\((.+?)\)에 답변이 있습니다\./,
    3: /\[질문\] (.+?) 문서의 (.+?) 질문\((.+?)\)에 답변이 있습니다\./,
    4: /\[뱃지\] (.+?)를 획득했습니다\./,
    // 5: /\[관리자\] 100자 이상의 문서 수정 발생: (.+?) 문서의 (.+?)$/,
    // 6: /\[관리자\] 새로운 문서 생성: (.+?)$/,
    // 7: /\[관리자\] 새로운 신고 발생: (.+?)$/,
    // 8: /\[관리자\] 비정상\/반복적 글 수정 발생: (.+?) 문서의 (.+?)$/
};

const dummyData = [
    {
        "id": 1,
        "user_id": 1,
        "type_id": 1,
        "read_or_not": 0,
        "message": "[즐겨찾기] 멀틱스 문서에 질문이 있습니다.",
        "created_at": "2023-08-25T00:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 2,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "[좋아요] 멀틱스 문서의 예시질문 질문(1)에 답변이 있습니다.",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 3,
        "user_id": 1,
        "type_id": 3,
        "read_or_not": 0,
        "message": "[질문] 멀틱스 문서의 예시질문 질문(2)에 답변이 있습니다.",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 4,
        "read_or_not": 0,
        "message": "[뱃지] 건국신화 뱃지를 획득했습니다.",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    }
];

const AlarmModal = ({ isAlarmVisible, handleAlarm }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // 화면 크기 변화 이벤트 리스너를 추가
        window.addEventListener('resize', handleWindowResize);
        
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    
    // 창 크기 변화 이벤트 핸들러
    const handleWindowResize = () => {
        if (isAlarmVisible) {
            handleAlarm(); 
        } else {
            return;
        }
    };

    // useEffect(() => {
    //     if (isAlarmVisible) {
    //         // API 호출 대신 더미 데이터 사용
    //         setNotifications(dummyData);
    //     }
    // }, [isAlarmVisible]);

    useEffect(() => {
        if (isAlarmVisible) {
            // Axios를 사용하여 데이터 가져오기
            axios.get('https://asku.wiki/api/notification/user') // API 엔드포인트를 적절히 수정하세요
                .then((response) => {
                    setNotifications(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching notifications:', error);
                });
        }
    }, [isAlarmVisible]);

    const removeIdFromMessage = (message) => {
        return message.replace(/\(\d+\)/g, "");
    }

    const extractInfo = (type_id, message) => {
        const pattern = patterns[type_id];
        if (!pattern) {
            return null;
        }

        const match = message.match(pattern);
        if (!match) {
            return null;
        }

        let info = {};

        switch (type_id) {
            case 1:
                info = { result: match[1] };
                break;
            case 2:
                info = { title: match[1], result: match[2], id: match[3] };
                break;
            case 3:
                info = { title: match[1], result: match[2], id: match[3] };
                break;
            case 4:
                info = { result: match[1] };
                break;
            default:
                return null;
        }

        return info;
    };

    const extractInfoAndRefineMessage = (type_id, message) => {
        const info = extractInfo(type_id, message);
        if (!info) {
            return { info: null, refinedMessage: message };
        }

        let refinedMessage = removeIdFromMessage(message);
        return { info, refinedMessage };
    };

    const generateLink = (notification) => {
        const { message } = notification;
        const type_id = parseInt(Object.keys(patterns).find((key) => {
            const pattern = patterns[key];
            return message.match(pattern) !== null;
        }));
        
        const { info } = extractInfoAndRefineMessage(type_id, message);
        
        const link = (() => {
            switch (type_id) {
                case 1:
                    return `/wiki/morequestions/${info.result}`;
                case 2:
                    return `/wiki/morequestions/${info.title}/${info.id}`;
                case 3:
                    return `/wiki/morequestions/${info.title}/${info.id}`;
                case 4:
                    return '/mypage/mybadge';
                default:
                    return '/';
            }
        })();
        
        return link;
    };
    
    

    return (
        <>
        {isAlarmVisible && (
            <div className={styles.alarmContainer}>
                <div className={styles.alarmTitleWrap}>
                    <span id={styles.alarmTitle}>내 알림</span>
                    <img src={closeBtn} alt='close' className={styles.close_btn} onClick={handleAlarm} />
                </div>
                <div className={styles.alarmContent}>
                    {notifications.map((notification, index) => (
                        <div key={index}>
                            <Link to={generateLink(notification)} className={styles.alarmLink}>
                                <p className={styles.alarmText}>{notification.message}</p>
                            </Link>
                            {index < notifications.length - 1 && <hr style={{ height: '0.3px', opacity: '0.7', backgroundColor: '#D5D5D5', width: '100%' }} />}
                        </div>
                    ))}
                </div>
            </div>
        )}
        </>
    );
}

export default AlarmModal
