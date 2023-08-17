import styles from './UnlikeModal.module.css';
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import unlike from '../img/unlike.png';

function UnlikeModal({ isOpen, onClose }) {
    const modalRef = useRef(null);

    const handleOutsideClick = (event) => {
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
        <>
        {isOpen && (
            <div className={styles.modal_overlay}>
                <div ref={modalRef} className={styles.modal_wrapper}>
                    <div className={styles.modal_inside}>
                        <div className={styles.modal_close}>
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={onClose} />
                        </div>
                        <div className={styles.modal_content}>
                            <div className={styles.modal_title}>
                                <img src={unlike}/>
                                <div>
                                    <h1>이번 답변은 어떠셨나요?</h1>
                                    <p>피드백을 작성해 주시면 서비스 발전에 큰 도움이 됩니다.</p>
                                </div>
                            </div>
                            <textarea className={styles.feedback_text}/>
                            <button>작성하기</button>
                            </div>
                        </div>
                    </div>
                </div>
        )}
        </>
    );
}

export default UnlikeModal;