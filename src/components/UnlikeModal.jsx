import styles from './UnlikeModal.module.css';
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import unlike from '../img/unlike.png';
import axios from 'axios';

function UnlikeModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const inputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
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

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            axios.post('https://asku.wiki/ai/feedback/comment', {
                feedback_id: 1,
                content: inputValue,
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }
}
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target === inputRef.current) {
            sendMessage();
        }
    };
    
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
                                <img id={styles.feedback_icon} src={unlike}/>
                                <div className={styles.feedback_title}>
                                    <h1 id={styles.red_title}>이번 답변은 어떠셨나요?</h1>
                                    <p id={styles.gray_title}>피드백을 작성해 주시면 서비스 발전에 큰 도움이 됩니다.</p>
                                </div>
                            </div>
                            <textarea
                                className={styles.feedback_text}
                                value={inputValue}
                                onChange={inputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button className={styles.feedback_btn} onClick={sendMessage}>작성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}


export default UnlikeModal;