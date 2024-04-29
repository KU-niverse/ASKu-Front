import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import AllHistoryBox from '../components/AllHistoryBox'

import Paging from '../components/Paging'
import FormatTimeAgo from '../components/FormatTimeAgo'
import Footer from '../components/Footer'

const Oauth = () => {
  const navigate = useNavigate()
  const { uuid } = useParams() // URL의 파라미터를 가져옵니다.
  const [loggedIn, setLoggedIn] = useState(false) // Define the setLoggedIn function using the useState hook

  useEffect(() => {
    async function fetchData() {
      let response
      try {
        // uuid로 로그인
        response = await axios.post(
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
      } catch (error) {
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
  }, [])

  return null
}

export default Oauth
