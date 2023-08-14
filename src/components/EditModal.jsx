import styles from './EditModal.module.css';
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditModal({ isOpen, onClose, questionId }) {
    const modalRef = useRef(null);
    const [questionContent, setQuestionContent] = useState('');
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


    const handleChange = (e) => {
      const value = e.target.value;
      if(value.length<=200) {
        setQuestionContent(value);
      }
    };

    const editData = {
      new_content:questionContent,
    };

    const handleQuestionEdit = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_HOST}/question/edit/${questionId}`, editData, {withCredentials: true});
        if(response.status===200){
          console.log(response.data);
          alert(response.data.message);
          window.location.reload();
        }
      }
      catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          alert("이미 답변이 달렸거나, 다른 회원의 질문입니다.");
          window.location.reload();
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    };//질문 수정하기


    const handleSubmit= () => {
      if(questionContent.trim()===''){
        alert('질문을 입력해주세요.');
        return;
      }
      handleQuestionEdit(editData);
    };
  
    const countCharacters = () =>{
      return `${questionContent.length}/200`;
    }

    
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
                            <p className={styles.modal_text}>질문 수정하기</p>
                            <div className={styles.q_cbox}>
                              <textarea
                                rows="7"
                                className={styles.q_ctextarea}
                                placeholder="질문을 입력해주세요."
                                value={questionContent}
                                maxLength={200}
                                onChange={handleChange}
                              />                            
                              <div className={styles.q_clastheader}>
                                <span className={styles.textnum}>{countCharacters()}</span>
                              </div>

                            </div>
                            <button className={styles.q_csubmit} onClick={handleSubmit}>
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

export default EditModal;