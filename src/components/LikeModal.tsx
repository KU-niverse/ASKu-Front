import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import styles from './LikeModal.module.css'
import closeBtn from '../img/close_btn.png'
import like from '../img/chatbot_like.svg'

interface LikeModalProps {
  isOpen: boolean
  onClose: () => void
  qnaId: number
}

function LikeModal({ isOpen, onClose, qnaId }: LikeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const queryClient = useQueryClient()
  const [feedbackId, setFeedbackId] = useState('')

  const sendLikeFeedback = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_AI}/chatbot/feedback/`,
      {
        qna_id: qnaId,
        feedback: true,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  }

  const likeMutation = useMutation(sendLikeFeedback, {
    onSuccess: (data) => {
      console.log('🚀 ~ LikeModal ~ data:', data)
      const updatedFeedbackId = data.id
      setFeedbackId(updatedFeedbackId)
      queryClient.invalidateQueries('feedback')
    },
    onError: (error: any) => {
      if (error.response.status === 403) {
        alert('이미 피드백을 전송하였습니다.')
        onClose()
      } else {
        console.error(error)
        alert(error.response?.data?.message || '문제가 발생하였습니다.')
      }
    },
  })

  const sendLikeCommentFeedback = async (comment: string) => {
    const response = await axios.post(
      `${process.env.REACT_APP_AI}/chatbot/feedback/comment/`,
      {
        feedback_id: feedbackId,
        content: comment,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  }

  const likeCommentMutation = useMutation(sendLikeCommentFeedback, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('feedback')
      onClose()
      alert('피드백을 성공적으로 전송하였습니다.')
    },
    onError: (error: any) => {
      console.error(error)
      onClose()
      alert(error.response?.data?.message || '문제가 발생하였습니다')
    },
  })

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

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

  useEffect(() => {
    if (isOpen) {
      likeMutation.mutate()
    }
  }, [isOpen])

  useEffect(() => {
    if (feedbackId && inputValue.trim() !== '') {
      likeCommentMutation.mutate(inputValue)
    }
  }, [feedbackId])

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      if (!feedbackId) {
        // 피드백 아이디가 없으면, 피드백 아이디가 설정될 때까지 기다림
        setTimeout(() => {
          handleSendMessage()
        }, 100)
      } else {
        likeCommentMutation.mutate(inputValue)
      }
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
                  <img alt={'피드백 아이콘'} id={styles.feedback_icon} src={like} />
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

export default LikeModal
