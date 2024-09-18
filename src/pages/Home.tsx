import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import logo from '../img/logo_big.png'
import styles from './Home.module.css'
import searchIcon from '../img/search_icon.svg'
import chatBotBtn from '../img/chatBotBtn.png'
import RealTimePopularSearchesComponent from '../components/Home/RealTimePopularSearchesComponent'
import RealTimePopularQuestionsComponent from '../components/Home/RealTimePopularQuestionsComponent'

interface UserInfo {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
  nickname: string
  created_at: Date
  point: number
  is_admin: boolean
  is_authorized: boolean
  restrict_period: number | null
  restrict_count: number
  rep_badge_name: string
  rep_badge_image: string
}

interface HomeProps {
  loggedIn: boolean
  setLoggedIn: (loggedIn: boolean) => void
}

const checkLoginStatus = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return res.data.success
}

const Home: React.FC<HomeProps> = ({ loggedIn, setLoggedIn }) => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const { data: isLoggedIn, refetch: refetchLoginStatus } = useQuery('loginStatus', checkLoginStatus, {
    onSuccess: (data) => {
      setLoggedIn(data)
    },
    onError: () => {
      setLoggedIn(false)
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    refetchLoginStatus()
  }, [refetchLoginStatus])

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      navigate(`/result/${encodeURIComponent(inputValue)}/search`)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  // Amplitude
  useEffect(() => {
    track('view_home')
  }, [])

  return (
    <div className={styles.pageWrap}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.homeWrap}>
        <div className={styles.inputContainer}>
          <img src={logo} className={styles.logo} alt={'logo'} />
          <input
            className={styles.searchInput}
            placeholder={'Wiki 검색어를 입력하세요.'}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={inputValue}
          />
          <div className={styles.searchIconContainer}>
            <img
              role={'presentation'}
              src={searchIcon}
              alt={'icon'}
              className={styles.searchIcon}
              onClick={handleSearch}
            />
          </div>
        </div>

        <div className={styles.chatBotContainer}>
          <Chatbot isLoggedIn={isLoggedIn} setIsLoggedIn={setLoggedIn} />
          <Link to={'/chatbot'}>
            <img src={chatBotBtn} alt={'button'} className={styles.chatBotBtn} />
          </Link>
          <div className={styles.realTime}>
            <RealTimePopularSearchesComponent />
            <RealTimePopularQuestionsComponent />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
