import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import like from '../img/like.png'
import likeFill from '../img/likeFill.png'
import styles from './LikeorNot.module.css'

const LikeorNot = ({ questionId, like_count, user_id }: any) => {
  const [isLiked, setIsLiked] = useState(localStorage.getItem(`likeStatus_${user_id}_${questionId}`) === 'true')
  const [currentLikeCount, setCurrentLikeCount] = useState(like_count)
  const [loggedIn, setLoggedIn] = useState(false)

  const Navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
      } else if (res.status === 401) {
        setLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response.status === 401) {
        setLoggedIn(false)
      } else {
        alert('에러가 발생하였습니다')
      }
    }
  }
  useEffect(() => {
    checkLoginStatus()
  }, [])

  const handleLikeClick = async () => {
    if (!loggedIn) {
      await checkLoginStatus()
    }

    const newIsLiked = !isLiked
    setCurrentLikeCount(currentLikeCount + (newIsLiked ? 1 : -1))
    localStorage.setItem(`likeStatus_${user_id}_${questionId}`, newIsLiked)
    setIsLiked(newIsLiked)

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/question/like/${questionId}`,
        {},
        { withCredentials: true },
      )
      if (res.status === 200) {
      }
    } catch (error) {
      console.error(error)
      setCurrentLikeCount(currentLikeCount)
      setIsLiked(isLiked)

      if (error.response && error.response.status === 400) {
        alert('이미 좋아요를 눌렀습니다.')
      } else if (error.response && error.response.status === 401) {
        // setLoggedIn(false);
        alert('로그인이 필요한 서비스 입니다.')
      } else if (error.response && error.response.status === 403) {
        alert('본인의 질문에는 좋아요를 누를 수 없습니다.')
      } else {
      }
    }
  }

  return (
    <div className={styles.like}>
      <img className={styles.likeimg} src={isLiked ? likeFill : like} alt={'like'} onClick={handleLikeClick} />
      <span className={styles.likeCount}>{currentLikeCount}</span>
    </div>
  )
}

export default LikeorNot
