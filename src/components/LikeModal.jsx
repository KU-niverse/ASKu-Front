import styles from './LikeModal.module.css';
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import like from '../img/like.png';

function LikeModal({ isOpen, onClose }) {
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

    // const sendMessage = () => {
    //     if (inputValue.trim() !== '') {
    //         axios.post('https://asku.wiki/ai/chatbot/', {
    //             q_content: inputValue,
    //             user_id: "1",
    //             // reference: "1"
    //         })
    //         .then(response => {
    //             inputRef.current.blur();
    
    //             const newChatResponse = [
    //             ...chatResponse,
    //             { content: inputValue }, // 사용자의 질문 추가
    //             { content: response.data.a_content, reference: response.data.reference } // 서버 응답 추가
    //             ];
    
    //             setChatResponse(newChatResponse);
    //             setInputValue('');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //     }

    return (
        <>
        {isOpen && (
            <div className={styles.modal_overlay}>
                <div ref={modalRef} className={styles.modal_wrapper}>
                    <div className={styles.modal_inside}>
                        <div className={styles.modal_close}>
                            <img 
                            src={closeBtn} 
                            alt='close' 
                            className={styles.close_btn} 
                            onClick={onClose} />
                        </div>
                        <div className={styles.modal_content}>
                            <div className={styles.modal_title}>
                                <img id={styles.feedback_icon} src={like}/>
                                <div className={styles.feedback_title}>
                                    <h1 id={styles.red_title}>이번 답변은 어떠셨나요?</h1>
                                    <p id={styles.gray_title}>피드백을 작성해 주시면 서비스 발전에 큰 도움이 됩니다.</p>
                                </div>
                            </div>
                            <textarea className={styles.feedback_text}/>
                            <button className={styles.feedback_btn}>작성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default LikeModal;