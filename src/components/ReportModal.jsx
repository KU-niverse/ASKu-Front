import styles from './LoginModal.module.css';
import closeBtn from '../img/close_btn.png';
import {  useState, useEffect, useRef } from 'react';
import haho_login from '../img/haho_login.png';
import { Link } from 'react-router-dom';

function ReportModal({isOpen, closeModal}) {
    const modalRef = useRef(null);

    const handlereportType = () => {

    }

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        }
    };

    useEffect(() => {
        if (!isOpen) {
            return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
          }
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
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={() => closeModal()} />
                        </div>
                        <div className={styles.modal_content}>
                            <p className={styles.modal_text}>로그인 후 ASKU를 이용해주세요!</p>
                            <p onClick={handlereportType}>상업적 광고 및 판매</p>
                            <p onClick={handlereportType}>정치인 비하 및 선거운동</p>
                            <p onClick={handlereportType}>게시판 성격에 부적절함</p>
                            <p onClick={handlereportType}>음란물</p>
                            <p onClick={handlereportType}>낚시/놀람/도배</p>
                            <p onClick={handlereportType}>사칭사기</p>
                            <p onClick={handlereportType}>욕설비하</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default ReportModal;