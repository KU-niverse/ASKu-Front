// @ts-expect-error TS(2307): Cannot find module './LikeModal.module.css' or its... Remove this comment to see the full error message
import styles from './LikeModal.module.css';
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// @ts-expect-error TS(2307): Cannot find module '../img/chatbot_like.svg' or it... Remove this comment to see the full error message
import like from '../img/chatbot_like.svg';

function LikeModal({
    isOpen,
    onClose,
    feedbackId
}: any) {
    const modalRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const inputChange = (e: any) => {
        setInputValue(e.target.value);
    }

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

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            axios.post(process.env.REACT_APP_AI+'/chatbot/feedback/comment', {
                feedback_id: feedbackId,
                content: inputValue
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
        onClose();
    }
    
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target === inputRef.current) {
            sendMessage();
        }
    };

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
                            <div className={styles.modal_title}>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <img id={styles.feedback_icon} src={like}/>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <div className={styles.feedback_title}>
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <h1 id={styles.red_title}>이번 답변은 어떠셨나요?</h1>
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <p id={styles.gray_title}>피드백을 작성해 주시면 서비스 발전에 큰 도움이 됩니다.</p>
                                </div>
                            </div>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <textarea
                                className={styles.feedback_text}
                                value={inputValue}
                                onChange={inputChange}
                                onKeyDown={handleKeyDown}/>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button className={styles.feedback_btn} onClick={sendMessage}>작성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default LikeModal;