import { useEffect, useRef } from 'react'
import styles from './RefreshModal.module.css'
import closeBtn from '../img/close_btn.png'
import haho_login from '../img/haho_login.png'

interface RefreshModalProps {
  isOpen: boolean
  onClose: () => void
}
function RefreshModal({ isOpen, onClose }: RefreshModalProps) {
  const modalRef = useRef(null)

  const handleOutsideClick = (event: MouseEvent) => {
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

  const refresh = () => {
    window.location.reload()
    onClose()
  }

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
                <p className={styles.modal_text}>{'이미 처리중인 질문이 있습니다! '}</p>
                <img className={styles.haho_login} src={haho_login} alt={'character'} />
                <button type={'button'} onClick={refresh} className={styles.signin}>
                  {'새로고침\r'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RefreshModal
