import styles from './ReportModal.module.css';
import closeBtn from '../img/close_btn.png';
import {  useState, useEffect, useRef } from 'react';
import haho_login from '../img/haho_login.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReportModal({type, target, isOpen, onClose}) {
    const modalRef = useRef(null);



    const handlereportType = async (reasonId) => {
        const requestBody={
            target: target,
            reason_id: reasonId
        };

        try {
            const response = await axios.post(`http://localhost:8080/report/${type}`, requestBody,{withCredentials: true});
            if(response.status===200){
              console.log(response.data);
              alert("신고가 완료되었습니다.");
            }
          }
          catch (error) {
            console.error(error);
            alert("알 수 없는 오류가 발생했습니다.");
          }
    }

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
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
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={onClose} />
                        </div>
                        <div className={styles.modal_content}>
                            <p className={styles.modal_text}>신고 사유 선택</p>
                            <p onClick={() => handlereportType(1)} className={styles.modal_report}>상업적 광고 및 판매</p>
                            <p onClick={() => handlereportType(2)} className={styles.modal_report}>정치인 비하 및 선거운동</p>
                            <p onClick={() => handlereportType(3)} className={styles.modal_report}>게시판 성격에 부적절함</p>
                            <p onClick={() => handlereportType(4)} className={styles.modal_report}>음란물</p>
                            <p onClick={() => handlereportType(5)} className={styles.modal_report}>낚시/놀람/도배</p>
                            <p onClick={() => handlereportType(6)} className={styles.modal_report}>사칭사기</p>
                            <p onClick={() => handlereportType(7)} className={styles.modal_report}>욕설비하</p>
                            <p onClick={() => handlereportType(8)} className={styles.modal_report}>문서훼손</p>

                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default ReportModal;