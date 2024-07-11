import React, { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import like from '../img/like.png'
import likeFill from '../img/likeFill.png'
import styles from './LikeorNot.module.css'

interface LikeorNotProps {
  questionId: number
  like_count: number
  user_id: number
  nick?: string
}

const LikeorNot = ({ questionId, like_count, user_id, nick }: LikeorNotProps) => {
  const [isLiked, setIsLiked] = useState(localStorage.getItem(`likeStatus_${user_id}_${questionId}`) === 'true')
  const [currentLikeCount, setCurrentLikeCount] = useState(like_count)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const queryClient = useQueryClient()

  const fetchLoginStatus = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
    return res.data.success
  }

  const { data: loginStatus, refetch: refetchLoginStatus } = useQuery('loginStatus', fetchLoginStatus, {
    onSuccess: (data) => {
      setLoggedIn(data)
    },
    onError: () => {
      setLoggedIn(false)
    },
    refetchOnWindowFocus: false,
  })

  const likeMutation = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/question/like/${questionId}`,
        {},
        { withCredentials: true },
      )
      return res.data
    },
    {
      onMutate: () => {
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)
        setCurrentLikeCount(currentLikeCount + (newIsLiked ? 1 : -1))
        localStorage.setItem(`likeStatus_${user_id}_${questionId}`, newIsLiked.toString())
      },
      onError: (error: AxiosError) => {
        console.error(error)
        setCurrentLikeCount(currentLikeCount)
        setIsLiked(isLiked)

        if (error.response) {
          if (error.response.status === 400) {
            alert('이미 좋아요를 눌렀습니다.')
          } else if (error.response.status === 401) {
            alert('로그인이 필요한 서비스 입니다.')
          } else if (error.response.status === 403) {
            alert('본인의 질문에는 좋아요를 누를 수 없습니다.')
          } else {
            alert('에러가 발생하였습니다')
          }
        } else {
          alert('에러가 발생하였습니다')
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('loginStatus')
      },
    },
  )

  useEffect(() => {
    refetchLoginStatus()
  }, [])

  const handleLikeClick = async () => {
    if (!loggedIn) {
      await refetchLoginStatus()
    }
    likeMutation.mutate()
  }

  return (
    <div className={styles.like}>
      <img
        role={'presentation'}
        className={styles.likeimg}
        src={isLiked ? likeFill : like}
        alt={'like'}
        onClick={handleLikeClick}
      />
      <span className={styles.likeCount}>{currentLikeCount}</span>
    </div>
  )
}

LikeorNot.defaultProps = {
  nick: '',
}

export default LikeorNot
