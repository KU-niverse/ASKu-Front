import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import closeBtn from '../img/close_btn.png'
import styles from './BadgeModal.module.css'

interface BadgeModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Badge {
  id: number
  user_id: number
  badge_id: number
  created_at: Date
  is_bad: boolean
  image: string
  name: string
  description: string
}

interface MyBadgeResponse {
  success: boolean
  message: string
  data: Badge[]
}

function BadgeModal({ isOpen, onClose }: BadgeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const handleOutsideClick = (event: Event) => {
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

  const fetchBadges = async (): Promise<MyBadgeResponse> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/badgehistory`, { withCredentials: true })
    return res.data
  }

  const { data: myBadge, isLoading, isError } = useQuery('myBadge', fetchBadges, {
    enabled: isOpen,
  })

  const mutation = useMutation(
    async (badgeId: number) => {
      await axios.post(
        `${process.env.REACT_APP_HOST}/user/mypage/setrepbadge`,
        { rep_badge_id: badgeId },
        { withCredentials: true },
      )
    },
    {
      onSuccess: () => {
        alert('대표뱃지가 변경되었습니다.')
        queryClient.invalidateQueries('myBadge')
        onClose()
      },
      onError: (error: any) => {
        console.error(error)
        if (error.response.status === 400) {
          alert('잘못된 접근입니다. 대표 배지 변경에 실패하였습니다.')
        } else {
          alert('알 수 없는 오류가 발생했습니다.')
        }
      },
    },
  )

  const handleRepBadge = (badgeId: number) => {
    mutation.mutate(badgeId)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
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
                <p className={styles.modal_text}>{'대표 뱃지 설정하기'}</p>
                <div className={styles.badgegrid}>
                  {myBadge && myBadge.data && myBadge.data.length === 0 ? (
                    <p>{'아직 획득한 뱃지가 없습니다.'}</p>
                  ) : (
                    myBadge.data.slice(0, 12).map((badge) => (
                      <img
                        key={badge.id}
                        src={badge.image}
                        alt={badge.name}
                        onClick={() => handleRepBadge(badge.badge_id)}
                        className={styles.badge}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BadgeModal
