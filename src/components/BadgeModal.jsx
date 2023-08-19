import styles from './BadgeModal.module.css';
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BadgeModal({  isOpen, onClose }) {
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

    const [myBadge, setMyBadge] = useState([]);
    useEffect(()=>{
      const takeMyBadge = async() => {
        try{
          const res= await axios.get(`https://localhost:8080/user/mypage/badgehistory`, {withCredentials:true})
          if (res.status===200){
            setMyBadge(res.data)
            console.log(res.data.message)
          }
        }catch(error){
          console.log(error);
          if(error.response && error.response.status===401){
          alert("로그인이 필요합니다.")
        } else {
          alert("알 수 없는 오류가 발생했습니다.")
        }}
      }
      takeMyBadge();
    }, []);

    const handleRepBadge = async () => {
      try {
        const response = await axios.post(`https://localhost:8080/user/mypage/setrepbadge`, {rep_badge_id : myBadge.data.badge_id}, {withCredentials: true});
        if(response.status===200){
          console.log(response.data);
          alert("대표뱃지가 변경되었습니다.");
          window.location.reload();
        }
      }
      catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          alert("잘못된 접근입니다. 대표 배지 변경에 실패하였습니다.");
          window.location.reload();
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    };//대표뱃지 설정하기

  
 
    
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
                            <p className={styles.modal_text}>대표 뱃지 설정하기</p>
                            <div className={styles.badgegrid}>
                              {myBadge && myBadge.data &&myBadge.data.length === 0 ? (
                              <p>아직 획득한 뱃지가 없습니다.</p>
                              ) : (
                                myBadge && myBadge.data && myBadge.data.slice(0,12).map((badge) => (
                                  <img key={badge.id} src={badge.image} alt={badge.name}/>
                                ))
                              )}

              
                            </div>
                            <button className={styles.q_csubmit} onClick={handleRepBadge}>
                                  수정하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default BadgeModal;