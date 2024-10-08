import { useState, useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import closeBtn from '../img/close_btn.png'

function Modal() {
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
                <img
                  role={'presentation'}
                  src={closeBtn}
                  alt={'close'}
                  className={styles.close_btn}
                  onClick={closeModal}
                />
              </div>
              <div className={styles.modal_content}>{/* 모달 컨텐츠 내용 */}</div>
            </div>
          </div>
        </div>
      )}
      <button type={'button'} className={styles.openModalBtn} onClick={openModal}>
        {'모달 열기\r'}
      </button>
    </>
  )
}

export default Modal
