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

interface PopularKeyword {
  keyword: string
  id: number
}

interface PopularQuestion {
  id: number
  user_id: number
  content: string
  created_at: Date
  like_count: number
  nickname: string
  index_title: string
  answer_count: number
  title: string
}

const fetchPopularKeywords = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/search/popular`)
  return response.data.data
}

const fetchPopularQuestions = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/question/popular`)
  return response.data.data
}

const checkLoginStatus = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return res.data.success
}

const Home: React.FC<HomeProps> = ({ loggedIn, setLoggedIn }) => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const { data: popularKeywords = [], isLoading: isKeywordsLoading } = useQuery('popularKeywords', fetchPopularKeywords)
  const { data: popularQuestions = [], isLoading: isQuestionsLoading } = useQuery(
    'popularQuestions',
    fetchPopularQuestions,
  )

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
            <div className={styles.keyWord}>
              <p className={styles.realTimeTitle}>{'실시간 인기 검색어'}</p>
              {isKeywordsLoading ? (
                <p>{'Loading...'}</p>
              ) : (
                popularKeywords.slice(0, 5).map((keyword: PopularKeyword, index: number) => (
                  <Link
                    to={`/result/${encodeURIComponent(keyword.keyword).replace(/\./g, '%2E')}/${encodeURIComponent('popularsearch')}`}
                    className={styles.rankWrap}
                    key={keyword.id}
                    onClick={() => {
                      track('click_trend_search_keyword', {
                        search_rank: index + 1,
                        search_keyword: keyword.keyword,
                      })
                    }}
                  >
                    <p className={styles.numberIcon}>
                      {index + 1}
                      {'.'}
                    </p>
                    <p className={styles.rankContent}>{keyword.keyword}</p>
                  </Link>
                ))
              )}
            </div>
            <div className={styles.question}>
              <p className={styles.realTimeTitle}>{'실시간 인기 질문'}</p>
              {isQuestionsLoading ? (
                <p>{'Loading...'}</p>
              ) : (
                popularQuestions.map((question: PopularQuestion, index: number) => (
                  <Link
                    to={`wiki/morequestion/${encodeURIComponent(question.title)}/${question.id}`}
                    state={{
                      question_id: question.id,
                      user_id: question.user_id,
                      content: question.content,
                      created_at: question.created_at,
                      like_count: question.like_count,
                      nick: question.nickname,
                      index_title: question.index_title,
                      answer_count: question.answer_count,
                      title: question.title,
                    }}
                    className={styles.rankWrap}
                    key={question.id}
                    onClick={() => {
                      track('click_trend_search_question', {
                        question_rank: index + 1,
                        question_title: question.content,
                      })
                    }}
                  >
                    <p className={styles.numberIcon}>{'Q.'}</p>
                    <p className={styles.rankContent}>{question.content}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
