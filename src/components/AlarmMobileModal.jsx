import styles from './AlarmMobileModal.module.css';
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AlarmMobileModal({ isOpen, handleMobileAlarmModal }) {
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
    const modalRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleMobileAlarmModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get("https://asku.wiki/api/notification/user");
            setNotifications(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // if (isOpen) {
        //         //API 호출 대신 더미 데이터 사용
        //         setNotifications(dummyData);
        //     }
        // }, [isOpen]);
            if (isOpen) {
                fetchNotifications();
            }
        }, [isOpen]);
    return (
        <>
        {isOpen && (
            <div className={styles.modal_overlay}>
                <div ref={modalRef} className={styles.modal_wrapper}>
                    <div className={styles.modal_inside}>
                        <div className={styles.modal_close}>
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={handleMobileAlarmModal} />
                        </div>
                        <div className={styles.modal_content}>
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
                </div>
            </div>
        )}
        </>
    );
}

export default AlarmMobileModal;