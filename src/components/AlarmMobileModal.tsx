import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import closeBtn from '../img/close_btn.png'
import styles from './AlarmMobileModal.module.css'

const patterns: Record<number, RegExp> = {
  1: /\[즐겨찾기\] (.+?) 문서에 질문이 있습니다\./,
  2: /\[좋아요\] (.+?) 문서의 (.+?) 질문\((.+?)\)에 답변이 있습니다\./,
  3: /\[질문\] (.+?) 문서의 (.+?) 질문\((.+?)\)에 답변이 있습니다\./,
  4: /\[뱃지\] (.+?)를 획득했습니다\./,
  // 5: /\[관리자\] 100자 이상의 문서 수정 발생: (.+?) 문서의 (.+?)$/,
  // 6: /\[관리자\] 새로운 문서 생성: (.+?)$/,
  // 7: /\[관리자\] 새로운 신고 발생: (.+?)$/,
  // 8: /\[관리자\] 비정상\/반복적 글 수정 발생: (.+?) 문서의 (.+?)$/
}

const dummyData = [
  {
    id: 1,
    user_id: 1,
    type_id: 1,
    read_or_not: 0,
    message: '[즐겨찾기] 멀틱스 문서에 질문이 있습니다.',
    created_at: '2023-08-25T00:00:00.000Z',
    is_admin: 0,
  },
  {
    id: 2,
    user_id: 1,
    type_id: 2,
    read_or_not: 0,
    message: '[좋아요] 멀틱스 문서의 예시질문 질문(1)에 답변이 있습니다.',
    created_at: '2023-08-25T01:00:00.000Z',
    is_admin: 0,
  },
  {
    id: 3,
    user_id: 1,
    type_id: 3,
    read_or_not: 0,
    message: '[질문] 멀틱스 문서의 예시질문 질문(2)에 답변이 있습니다.',
    created_at: '2023-08-25T01:00:00.000Z',
    is_admin: 0,
  },
  {
    id: 4,
    user_id: 1,
    type_id: 4,
    read_or_not: 0,
    message: '[뱃지] 건국신화 뱃지를 획득했습니다.',
    created_at: '2023-08-25T01:00:00.000Z',
    is_admin: 0,
  },
]

interface Notification {
  id: number
  user_id: number
  type_id: number
  read_or_not: boolean
  message: string
  created_at: Date
  is_admin: boolean
}

interface Info {
  result?: string
  title?: string
  id?: number
}

function AlarmMobileModal({ isOpen, handleMobileAlarmModal }: any) {
  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${process.env.REACT_APP_HOST}/notification/user`, {
          withCredentials: true,
        })
        .then((response) => {
          setNotifications(response.data.data)
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error)
          setNotifications([])
        })
    }
  }, [isOpen])

  const removeIdFromMessage = (message: string) => {
    return message.replace(/\(\d+\)/g, '')
  }

  const extractInfo = (type_id: number, message: string): Info | null => {
    const pattern = patterns[type_id]
    if (!pattern) {
      return null
    }

    const match = message.match(pattern)
    if (!match) {
      return null
    }

    let info: Info = {}

    switch (type_id) {
      case 1:
      case 4:
        info = { result: match[1] }
        break
      case 2:
      case 3:
        info = { title: match[1], result: match[2], id: parseInt(match[3], 10) }
        break
      default:
        return null
    }

    return info
  }

  const extractInfoAndRefineMessage = (type_id: number, message: string) => {
    const info = extractInfo(type_id, message)
    if (!info) {
      return { info: null, refinedMessage: message }
    }

    const refinedMessage = removeIdFromMessage(message)
    return { info, refinedMessage }
  }

  const generateLink = (notification: Notification) => {
    const { message } = notification
    const type_id = Object.keys(patterns).find((key) => {
      const pattern = patterns[parseInt(key, 10)]
      return message.match(pattern) !== null
    })

    if (!type_id) return '/'

    const { info } = extractInfoAndRefineMessage(parseInt(type_id, 10), message)
    if (!info) return '/'

    const link = (() => {
      switch (parseInt(type_id, 10)) {
        case 1:
          return `/wiki/morequestion/${info.result}`
        case 2:
        case 3:
          return `/wiki/morequestion/${encodeURIComponent(info.title!)}/${info.id}`
        case 4:
          return '/mypage/mybadge'
        default:
          return '/'
      }
    })()

    return link
  }

  const modalRef = useRef(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const handleOutsideClick = (event: any) => {
    if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
      handleMobileAlarmModal()
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
                <span id={styles.alarmTitle}>{'내 알림'}</span>
                <img
                  role={'presentation'}
                  src={closeBtn}
                  alt={'close'}
                  className={styles.close_btn}
                  onClick={handleMobileAlarmModal}
                />
              </div>
              <div className={styles.modal_content}>
                {notifications.length > 0
                  ? notifications.map((notification) => (
                      <div key={notification.id}>
                        <Link to={generateLink(notification)} className={styles.alarmLink}>
                          <p className={styles.alarmText}>{notification.message}</p>
                        </Link>
                        <hr
                          style={{
                            height: '0.3px',
                            opacity: '0.7',
                            backgroundColor: '#D5D5D5',
                            width: '100%',
                          }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlarmMobileModal
