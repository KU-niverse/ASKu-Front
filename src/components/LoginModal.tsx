import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginModal.module.css'
import closeBtn from '../img/close_btn.png'
import haho_login from '../img/haho_login.png'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
                <p className={styles.modal_text}>{'로그인 후 ASKU를 이용해주세요!'}</p>
                <img className={styles.haho_login} src={haho_login} alt={'character'} />
                <Link to={'/signin'}>
                  <button type={'button'} className={styles.signin} onClick={onClose}>
                    {'로그인'}
                  </button>
                </Link>
                <a href={'https://www.koreapas.com/m/member_join_new.php'}>
                  <button type={'button'} className={styles.signup} onClick={onClose}>
                    {'회원가입'}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginModal
