import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BsCheck2All } from 'react-icons/bs'
import closeBtn from '../../img/close_btn.png'
import styles from './NickEditModal.module.css'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
}

function EditModal({ isOpen, onClose }: EditModalProps) {
  const modalRef = useRef(null)
  const [nick, setNick] = useState('')
  const [isNickValid, setisNickValid] = useState(true)
  const [nickDoubleCheck, setNickDoubleCheck] = useState(false)

  const handleOutsideClick = (event: any) => {
    // TODO: any 타입 지정(Mouse Event 오류 발생)
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

  function onChangeNick(e: any) {
    // TODO: any 타입 지정(Mouse Event 오류 발생)
    const nickRegex = /^[가-힣a-zA-Z]{2,10}$/
    const nickCurrent = e.target.value
    setNick(nickCurrent)

    if (!nickRegex.test(nickCurrent)) {
      setisNickValid(false)
    } else {
      setisNickValid(true)
    }
  }

  const handleNickDoubleCheck = async () => {
    if (isNickValid === false) {
      alert('닉네임 형식이 올바르지 않습니다')
    }

    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/nickdupcheck/${nick}`)

      if (result.data.success === true) {
        alert(result.data.message)
        setNickDoubleCheck(true)
      } else {
        alert(result.data.message)
        setNickDoubleCheck(false)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  //  const editData = {
  //  new_content:questionContent,
  // };/

  const PostNickEdit = async () => {
    if (isNickValid === false) {
      alert('닉네임 형식이 올바르지 않습니다')
    }

    if (nickDoubleCheck === false) {
      alert('닉네임 중복확인이 필요합니다')
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/user/mypage/editnick`,
        {
          nickname: nick,
        },
        {
          withCredentials: true,
        },
      )
      if (response.data.success === true) {
        alert(response.data.message)
        onClose() // 모달이 닫히고 내가 마이페이지에서 새로고침해야 변경된거 확인 가능
        window.location.reload() // 새로고침
      }
    } catch (error) {
      console.error(error)
      if (error.response.status === 400) {
        alert(error.response.data.message)
        window.location.reload()
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    }
  } // 질문 수정하기

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
                    <button type={'button'} className={`${styles.dblcheck}`} onClick={handleNickDoubleCheck}>
                      {'중복확인\r'}
                    </button>
                  </div>
                  {/* <div className={styles.q_clastheader}>
                                <span className={styles.textnum}>{countCharacters()}</span>
                              </div> */}
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
