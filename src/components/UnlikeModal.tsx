import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import styles from './UnlikeModal.module.css'
import closeBtn from '../img/close_btn.png'
import unlike from '../img/chatbot_unlike.svg'

interface UnlikeModalProps {
  isOpen: boolean
  onClose: () => void
  feedbackId: number
}

function UnlikeModal({ isOpen, onClose, feedbackId }: UnlikeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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

  const sendFeedback = async () => {
    await axios.post(`${process.env.REACT_APP_AI}/chatbot/feedback/comment`, {
      feedback_id: feedbackId,
      content: inputValue,
    })
  }

  const mutation = useMutation(sendFeedback, {
    onSuccess: () => {
      onClose()
    },
    onError: (error) => {
      console.error('피드백을 보내는 중에 오류가 발생했습니다.', error)
    },
  })

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      mutation.mutate()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.target === inputRef.current) {
      handleSendMessage()
    }
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
                <div className={styles.modal_title}>
                  <img alt={'싫어요 버튼'} id={styles.feedback_icon} src={unlike} />
                  <div className={styles.feedback_title}>
                    <h1 id={styles.red_title}>{'이번 답변은 어떠셨나요?'}</h1>
                    <p id={styles.gray_title}>{'피드백을 작성해 주시면 서비스 발전에 큰 도움이 됩니다.'}</p>
                  </div>
                </div>
                <textarea
                  className={styles.feedback_text}
                  value={inputValue}
                  onChange={inputChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                />
                <button type={'button'} className={styles.feedback_btn} onClick={handleSendMessage}>
                  {'작성하기\r'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnlikeModal
