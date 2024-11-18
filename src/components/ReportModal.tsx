import { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import closeBtn from '../img/close_btn.png'
import styles from './ReportModal.module.css'

interface ReportModalProps {
  type: number
  target: number
  isOpen: boolean
  onClose: () => void
}

const REASONS = [
  { id: 1, text: '상업적 광고 및 판매' },
  { id: 2, text: '정치인 비하 및 선거운동' },
  { id: 3, text: '게시판 성격에 부적절함' },
  { id: 4, text: '음란물' },
  { id: 5, text: '낚시/놀람/도배' },
  { id: 6, text: '사칭사기' },
  { id: 7, text: '욕설비하' },
  { id: 8, text: '기타' },
]

function ReportModal({ type, target, isOpen, onClose }: ReportModalProps) {
  const modalRef = useRef(null)
  const [reportContent, setReportContent] = useState('')
  const [selectedReason, setSelectedReason] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const requestBody = {
    target,
    reason_id: selectedReason,
    comment: reportContent || '없음',
  }

  const mutation = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/report/${type}`, requestBody, {
        withCredentials: true,
      })
      return response.data
    },
    {
      onSuccess: () => {
        alert('신고가 완료되었습니다.')
        queryClient.invalidateQueries('reports') // 필요한 경우 쿼리 무효화
        window.location.reload()
      },
      onError: (error) => {
        console.error(error)
        alert('알 수 없는 오류가 발생했습니다.')
      },
    },
  )

  const handleSubmit = () => {
    if (selectedReason === null) {
      alert('신고 사유를 선택해주세요.')
      return
    }
    if (selectedReason == 8 && reportContent == '') {
      alert('신고 사유를 입력해주세요.')
      return
    }
    mutation.mutate()
  }

  const handleOutsideClick = (event: any) => {
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

  const handleChange = (e: any) => {
    const { value } = e.target
    if (value.length <= 70) {
      setReportContent(value)
    }
  }

  return (
    isOpen && (
      <div className={styles.modal_overlay}>
        <div ref={modalRef} className={styles.modal_wrapper}>
          <div className={styles.modal_inside}>
            <div className={styles.modal_close}>
              <img role={'presentation'} src={closeBtn} alt={'close'} className={styles.close_btn} onClick={onClose} />
            </div>
            <div className={styles.modal_content}>
              <p className={styles.modal_text}>{'신고 사유 선택'}</p>
              {REASONS.map((reason) => (
                <label htmlFor={`radio${reason.id}`} key={reason.id}>
                  <input
                    id={`radio${reason.id}`}
                    className={styles.modal_report}
                    type={'radio'}
                    name={'reason'}
                    value={reason.id}
                    onChange={() => setSelectedReason(reason.id)}
                  />
                  <span className={styles.label_text}>{reason.text}</span>
                </label>
              ))}
              {selectedReason === 8 && (
                <textarea
                  rows={4}
                  className={styles.report_textarea}
                  placeholder={'신고 사유를 입력해주세요.'}
                  value={reportContent}
                  maxLength={70}
                  onChange={handleChange}
                />
              )}
            </div>
            <button type={'button'} className={styles.q_csubmit} onClick={handleSubmit}>
              {'신고하기\r'}
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ReportModal
