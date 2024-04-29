// @ts-expect-error TS(2307): Cannot find module './ClearModal.module.css' or it... Remove this comment to see the full error message
import styles from './ClearModal.module.css';
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
// @ts-expect-error TS(2307): Cannot find module '../img/haho_login.png' or its ... Remove this comment to see the full error message
import haho_login from '../img/haho_login.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClearModal({
    isOpen,
    onClose,
    userId
}: any) {

    const handleClearChat = () => {
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    axios.patch(process.env.REACT_APP_AI+`/chatbot/${userId.data[0].id}`, {}, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then(response => {
            alert('채팅 내역이 비워졌습니다!');
            window.location.reload();
        })
        .catch(error => {
            console.error('채팅 내역을 비우는 중에 오류가 발생했습니다.', error);
        });
};



    const modalRef = useRef(null);

    const handleOutsideClick = (event: any) => {
        // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
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

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
        {isOpen && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.modal_overlay}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div ref={modalRef} className={styles.modal_wrapper}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.modal_inside}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={styles.modal_close}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={onClose} />
                        </div>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={styles.modal_content}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <p className={styles.modal_text}>지우신 채팅 내역은 복구가 어렵습니다!</p>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <img className={styles.haho_login} src={haho_login} alt="character" />
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={styles.signin} onClick={handleClearChat}>채팅 비우기</button>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={styles.signup} onClick={onClose}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default ClearModal;