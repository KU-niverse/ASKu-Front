import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import closeBtn from '../img/close_btn.png'
import styles from './EditModal.module.css'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  questionId: number
}

const fetchQuestion = async (questionId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_HOST}/question/${questionId}`, { withCredentials: true })
  return data
}

const editQuestion = async ({ questionId, newContent }: { questionId: number; newContent: string }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_HOST}/question/edit/${questionId}`,
    { new_content: newContent },
    { withCredentials: true },
  )
  return response.data
}

function EditModal({ isOpen, onClose, questionId }: EditModalProps) {
  const modalRef = useRef(null)
  const [questionContent, setQuestionContent] = useState('')
  const queryClient = useQueryClient()

  const { data } = useQuery(['question', questionId], () => fetchQuestion(questionId), {
    enabled: isOpen,
  })

  useEffect(() => {
    if (data) {
      setQuestionContent(data.content)
    }
  }, [data])

  const mutation = useMutation(editQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['question', questionId])
      alert('질문이 성공적으로 수정되었습니다.')
      onClose()
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        alert('이미 답변이 달렸거나, 다른 회원의 질문입니다.')
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    },
  })

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [handleOutsideClick, isOpen])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    if (value.length <= 200) {
      setQuestionContent(value)
    }
  }

  const handleSubmit = () => {
    if (questionContent.trim() === '') {
      alert('질문을 입력해주세요.')
      return
    }
    mutation.mutate({ questionId, newContent: questionContent })
  }

  const countCharacters = () => {
    return `${questionContent.length}/200`
  }

  return (
    <div>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div ref={modalRef} className={styles.modal_wrapper}>
            <div className={styles.modal_inside}>
              <div className={styles.modal_close}>
                <button type={'button'} className={styles.modal_close} onClick={onClose}>
                  <img src={closeBtn} alt={'close'} className={styles.close_btn} />
                </button>
              </div>
              <div className={styles.modal_content}>
                <p className={styles.modal_text}>{'질문 수정하기'}</p>
                <div className={styles.q_cbox}>
                  <textarea
                    rows={7}
                    className={styles.q_ctextarea}
                    placeholder={'질문을 입력해주세요.'}
                    value={questionContent}
                    maxLength={200}
                    onChange={handleChange}
                  />
                  <div className={styles.q_clastheader}>
                    <span className={styles.textnum}>{countCharacters()}</span>
                  </div>
                </div>
                <button type={'button'} className={styles.q_csubmit} onClick={handleSubmit}>
                  {'수정하기\r'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditModal
