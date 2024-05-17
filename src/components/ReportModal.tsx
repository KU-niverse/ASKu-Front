import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import closeBtn from '../img/close_btn.png'
import styles from './ReportModal.module.css'

interface ReportModalProps {
  type: string
  target: string
  isOpen: boolean
  onClose: () => void
}

function ReportModal({ type, target, isOpen, onClose }: ReportModalProps) {
  const modalRef = useRef(null)
  const [reportContent, setReportContent] = useState('')

  const [selectedReason, setSelectedReason] = useState(null)
  const requestBody = {
    target,
    reason_id: selectedReason,
    comment: reportContent,
  }

  const handleSubmit = async () => {
    if (selectedReason === null) {
      alert('신고 사유를 선택해주세요.')
      return
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/report/${type}`, requestBody, {
        withCredentials: true,
      })
      if (response.status === 200) {
        alert('신고가 완료되었습니다.')
      }
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('알 수 없는 오류가 발생했습니다.')
    }
  }

  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return null // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  // report 기타 사유

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
              <label htmlFor={'radio1'}>
                <input
                  id={'radio1'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'1'}
                  onChange={() => setSelectedReason(1)}
                />
                <span className={styles.label_text}>{'상업적 광고 및 판매'}</span>
              </label>
              <label htmlFor={'radio2'}>
                <input
                  id={'radio2'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'2'}
                  onChange={() => setSelectedReason(2)}
                />
                <span className={styles.label_text}>{'정치인 비하 및 선거운동'}</span>
              </label>
              <label htmlFor={'radio3'}>
                <input
                  id={'radio3'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'3'}
                  onChange={() => setSelectedReason(3)}
                />
                <span className={styles.label_text}>{'게시판 성격에 부적절함'}</span>
              </label>
              <label htmlFor={'radio4'}>
                <input
                  id={'radio4'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'4'}
                  onChange={() => setSelectedReason(4)}
                />
                <span className={styles.label_text}>{'음란물'}</span>
              </label>
              <label htmlFor={'radio5'}>
                <input
                  id={'radio5'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'5'}
                  onChange={() => setSelectedReason(5)}
                />
                <span className={styles.label_text}>{'낚시/놀람/도배'}</span>
              </label>
              <label htmlFor={'radio6'}>
                <input
                  id={'radio6'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'6'}
                  onChange={() => setSelectedReason(6)}
                />
                <span className={styles.label_text}>{'사칭사기'}</span>
              </label>
              <label htmlFor={'radio7'}>
                <input
                  id={'radio7'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'7'}
                  onChange={() => setSelectedReason(7)}
                />
                <span className={styles.label_text}>{'욕설비하'}</span>
              </label>
              <label htmlFor={'radio8'}>
                <input
                  id={'radio8'}
                  className={styles.modal_report}
                  type={'radio'}
                  name={'reason'}
                  value={'8'}
                  onChange={() => setSelectedReason(8)}
                />
                <span className={styles.label_text}>{'기타'}</span>
              </label>
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
