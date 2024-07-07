import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import logo from '../img/logo_big.png'
import styles from './Home.module.css'
import searchIcon from '../img/search_icon.svg'
import chatBotBtn from '../img/chatBotBtn.png'

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

function Home({ loggedIn, setLoggedIn }: HomeProps) {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const { data: popularKeywords = [], isLoading: isKeywordsLoading } = useQuery('popularKeywords', fetchPopularKeywords)
  const { data: popularQuestions = [], isLoading: isQuestionsLoading } = useQuery('popularQuestions', fetchPopularQuestions)

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
  }, [])

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      navigate(`/result/${encodeURIComponent(inputValue)}`)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className={'pageWrap'}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setLoggedIn} />
      <div className={styles.homeWrap}>
        <img src={logo} className={styles.logo} alt={'logo'} />
        <div className={styles.inputContainer}>
          <input
            className={styles.searchInput}
            placeholder={'검색어를 입력하세요.'}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={inputValue}
          />
          <img
            role={'presentation'}
            src={searchIcon}
            alt={'icon'}
            className={styles.searchIcon}
            onClick={handleSearch}
          />
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
                <p>Loading...</p>
              ) : (
                popularKeywords.slice(0, 5).map((keyword: PopularKeyword) => (
                  <Link
                    to={`/result/${encodeURIComponent(keyword.keyword).replace(/\./g, '%2E')}`}
                    className={styles.rankWrap}
                    key={keyword.id}
                  >
                    <p className={styles.numberIcon}>
                      {popularKeywords.indexOf(keyword) + 1}
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
                <p>Loading...</p>
              ) : (
                popularQuestions.map((question: PopularQuestion) => (
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
