import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginModal.module.css'
import closeBtn from '../img/close_btn.png'
import haho_login from '../img/haho_login.png'
import complete from '../img/Complete.png'

function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal()
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
    <>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div ref={modalRef} className={styles.modal_wrapper}>
            <div className={styles.modal_inside}>
              <div className={styles.modal_close}>
                <img src={closeBtn} alt={'close'} className={styles.close_btn} onClick={closeModal} />
              </div>
              <div className={styles.modal_content}>
                <p className={styles.modal_text}>{'신고가 완료되었습니다!'}</p>
                <img className={styles.haho_login} src={complete} alt={'complete'} />
              </div>
            </div>
          </div>
        </div>
      )}
      <button className={styles.openModalBtn} onClick={openModal}>
        {'모달 열기\r'}
      </button>
    </>
  )
}

export default LoginModal
