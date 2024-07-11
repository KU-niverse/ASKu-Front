import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import { BsCheck2All } from 'react-icons/bs'
import closeBtn from '../../img/close_btn.png'
import styles from './NickEditModal.module.css'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
}

interface NicknameCheckResponse {
  success: boolean
  message: string
}

function useNicknameCheck(nick: string) {
  return useQuery<NicknameCheckResponse, Error>(
    ['nicknameCheck', nick],
    async () => {
      const result = await axios.get<NicknameCheckResponse>(
        `${process.env.REACT_APP_HOST}/user/auth/nickdupcheck/${nick}`,
      )
      return result.data
    },
    {
      enabled: !!nick,
      retry: false,
      onError: (error: AxiosError) => {
        console.error('닉네임 중복 확인 에러:', error)
        alert(error.response?.data || '닉네임 중복 확인 실패')
      },
    },
  )
}

function useEditNickname() {
  const queryClient = useQueryClient()
  return useMutation(
    async (nickname: string) => {
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/user/mypage/editnick`,
        { nickname },
        { withCredentials: true },
      )
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('loginStatus') // 사용자 정보 갱신
      },
      onError: (error: AxiosError) => {
        console.error(error)
        if (error.response?.status === 400) {
          alert(error.response.data)
          window.location.reload()
        } else {
          alert('알 수 없는 오류가 발생했습니다.')
        }
      },
    },
  )
}

function EditModal({ isOpen, onClose }: EditModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [nick, setNick] = useState('')
  const [isNickValid, setIsNickValid] = useState(true)
  const { mutate: editNickname } = useEditNickname()
  const { isLoading: isCheckingDuplication, data: nickCheckResult, refetch } = useNicknameCheck(nick)

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

  const onChangeNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickRegex = /^[가-힣a-zA-Z]{2,10}$/
    const nickCurrent = e.target.value
    setNick(nickCurrent)
    setIsNickValid(nickRegex.test(nickCurrent))
  }

  const handleNickDoubleCheck = async () => {
    if (!isNickValid) {
      alert('닉네임 형식이 올바르지 않습니다.')
      return
    }

    refetch() // 닉네임 중복 확인 쿼리 실행
  }

  const PostNickEdit = async () => {
    if (!isNickValid) {
      alert('닉네임 형식이 올바르지 않습니다.')
      return
    }
    if (!nickCheckResult?.success) {
      alert('닉네임 중복확인이 필요합니다.')
      return
    }

    editNickname(nick)
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
                <p className={styles.modal_text}>{'닉네임 변경하기'}</p>
                <div className={styles.q_cbox}>
                  <div className={`${styles.checkInput}`}>
                    <input
                      required
                      type={'text'}
                      placeholder={'2-8자 한글이나 영어로 입력'}
                      name={'nick'}
                      value={nick}
                      maxLength={8}
                      onChange={onChangeNick}
                      className={`${styles.nick_input}`}
                    />
                    <button
                      type={'button'}
                      className={`${styles.dblcheck}`}
                      onClick={handleNickDoubleCheck}
                      disabled={isCheckingDuplication}
                    >
                      {isCheckingDuplication ? '확인 중...' : '중복확인'}
                    </button>
                  </div>
                  {nickCheckResult?.success && (
                    <div className={styles.success_box}>
                      <BsCheck2All className={styles.success_check} />
                      <span className={styles.success_text}>{nickCheckResult.message}</span>
                    </div>
                  )}
                </div>
                <div className={styles.div_btns}>
                  <button type={'button'} className={`${styles.c_btn}`} onClick={onClose}>
                    {'취소\r'}
                  </button>
                  <button type={'button'} className={styles.submit_btn} onClick={PostNickEdit}>
                    {'변경하기\r'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditModal
