import styles from './LoginModal.module.css';
import closeBtn from '../img/close_btn.png';
import {  useState, useEffect, useRef } from 'react';
import haho_login from '../img/haho_login.png';
import { Link } from 'react-router-dom';

function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
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
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={closeModal} />
                        </div>
                        <div className={styles.modal_content}>
                            <p className={styles.modal_text}>로그인 후 ASKU를 이용해주세요!</p>
                            <img className={styles.haho_login} src={haho_login} alt="character" />
                            <Link to='/signin'>
                                <button className={styles.signin}>로그인</button>
                            </Link>
                            <Link to='/signup'>
                                <button className={styles.signup}>회원가입</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <button className={styles.openModalBtn} onClick={openModal}>
            모달 열기
        </button>
        </>
    );
}

export default LoginModal;