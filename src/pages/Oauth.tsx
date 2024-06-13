import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Oauth: React.FC = () => {
  const navigate = useNavigate()
  const { uuid } = useParams<{ uuid: string }>() // URL의 파라미터를 가져옵니다.
  const [loggedIn, setLoggedIn] = useState(false) // Define the setLoggedIn function using the useState hook

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // uuid로 로그인
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}/user/auth/koreapasoauth`,
          {
            uuid,
          },
          { withCredentials: true },
        )
        if (response.status === 200 && response.data.success === true) {
          if (response.data.data.is_registered === true) {
            setLoggedIn(true)
            navigate('/')
          }
          if (response.data.data.is_registered === false) {
            setLoggedIn(false)
            navigate('/signup', {
              state: { uuid: response.data.data.koreapas_uuid, nickname: response.data.data.koreapas_nickname },
            })
          }
        }
      } catch (error: any) {
        // 이미 로그인되어있는 경우
        if (error.response.status === 400) {
          setLoggedIn(true)
          navigate('/')
        }
        if (error.response.status === 403) {
          if (error.response.data.message === '유효하지 않은 접근입니다.') {
            alert('유효하지 않은 접근입니다.')
            setLoggedIn(false)
            navigate('/')
          }
          if (error.response.data.message === '강등 또는 미인증 상태의 유저입니다.') {
            alert('강등 또는 미인증 상태의 유저입니다.')
            setLoggedIn(false)
            navigate('/')
          }
        } else {
          setLoggedIn(false)
          navigate('/')
        }
      }
    }
    fetchData()
  }, [navigate, uuid])

  return null
}

export default Oauth
