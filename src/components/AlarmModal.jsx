import styles from './AlarmModal.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import closeBtn from '../img/close_btn.png';
import { Link } from 'react-router-dom';

const dummyData = [
    {
        "id": 1,
        "user_id": 1,
        "type_id": 1,
        "read_or_not": 0,
        "message": "알림  메시지11 1111 111111111 11111111  11111 11111111111 1",
        "created_at": "2023-08-25T00:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 2,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지111111111111111111111 2",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 3,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지1111111111111111111111111111111111111111111 3",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지 4222222222222222222222222222222222",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지 4222222222222222222222",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지 42222222222222222222222222222222222222222222222",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지 422222222222222222222",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지 4222222222222222222222222222222",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
    {
        "id": 4,
        "user_id": 1,
        "type_id": 2,
        "read_or_not": 0,
        "message": "알림 메시지 4222222222222222222222",
        "created_at": "2023-08-25T01:00:00.000Z",
        "is_admin": 0
    },
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

    
    useEffect(() => {
    // if (isAlarmVisible) {
    //         //API 호출 대신 더미 데이터 사용
    //         setNotifications(dummyData);
    //     }
    // }, [isAlarmVisible]);
        if (isAlarmVisible) {
            fetchNotifications();
        }
    }, [isAlarmVisible]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get("http://localhost:8080/notification/user");
            setNotifications(response.data.data);
        } catch (error) {
            console.error(error);
        }
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
                        <div>
                        <Link className={styles.alarmLink}>
                            <p className={styles.alarmText} key={index}>{notification.message}</p>
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

export default AlarmModal;