import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './ClearModal.module.css'
import closeBtn from '../img/close_btn.png'
import haho_login from '../img/haho_login.png'

function ClearModal({ isOpen, onClose, userId }) {
  const handleClearChat = () => {
    axios
      .patch(
        `${process.env.REACT_APP_AI}/chatbot/${userId.data[0].id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((response) => {
        alert('채팅 내역이 비워졌습니다!')
        window.location.reload()
      })
      .catch((error) => {
        console.error('채팅 내역을 비우는 중에 오류가 발생했습니다.', error)
      })
  }

  const modalRef = useRef(null)

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div ref={modalRef} className={styles.modal_wrapper}>
            <div className={styles.modal_inside}>
              <div className={styles.modal_close}>
                <img
                  role={'presentation'}
                  src={closeBtn}
                  alt={'close'}
                  className={styles.close_btn}
                  onClick={onClose}
                />
              </div>
              <div className={styles.modal_content}>
                <p className={styles.modal_text}>{'지우신 채팅 내역은 복구가 어렵습니다!'}</p>
                <img className={styles.haho_login} src={haho_login} alt={'character'} />
                <button type={'button'} className={styles.signin} onClick={handleClearChat}>
                  {'채팅 비우기\r'}
                </button>
                <button type={'button'} className={styles.signup} onClick={onClose}>
                  {'취소\r'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClearModal
