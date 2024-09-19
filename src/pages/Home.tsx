import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import styles from './Home.module.css'
import chatBotBtn from '../img/chatBotBtn.png'
import PopularDoc from '../components/PopularDoc'
import HotDebate from '../components/HotDebate'

interface HistoryResponse {
  success: boolean
  message: HistoryItem[]
}

interface HistoryItem {
  id: number
  user_id: number
  doc_id: number
  version: number
  summary: string
  created_at: string
  diff: number
  is_rollback: number
  doc_title: string
  nick: string
  is_bad: number
}
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
interface DebateData {
  id: number
  doc_id: number
  user_id: number
  subject: string
  created_at: Date
  recent_edited_at: Date
  done_or_not: boolean
  done_at: Date | null
  is_bad: boolean
  title: string
}

interface DebateResponse {
  data: DebateData[]
}

function useGetHistory() {
  return useQuery<HistoryItem[], AxiosError>(
    ['historys'],
    async () => {
      const result = await axios.get<HistoryResponse>(`${process.env.REACT_APP_HOST}/wiki/historys?type=all`)
      console.log(result.data.message)
      return result.data.message
    },
    {
      keepPreviousData: true,
      onError: (error: AxiosError) => {
        console.error('API 요청 중 에러 발생:', error)
      },
    },
  )
}

const fetchDebateList = async (): Promise<DebateData[]> => {
  const res = await axios.get<DebateResponse>(`${process.env.REACT_APP_HOST}/debate/all/recent`, {
    withCredentials: true,
  })
  console.log(res.data.data)
  return res.data.data
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
  const { isError, error, data: historys } = useGetHistory()
  const { data: debates, isLoading } = useQuery<DebateData[], Error>('debateList', fetchDebateList)
  const PopularDoclist = historys ? historys.slice(0, 6) : []
  const debateListData = debates ? debates.slice(0, 3) : []

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
        <div className={styles.chatBotContainer}>
          <Chatbot isLoggedIn={isLoggedIn} setIsLoggedIn={setLoggedIn} />
          <Link to={'/chatbot'}>
            <img src={chatBotBtn} alt={'button'} className={styles.chatBotBtn} />
          </Link>
          <div className={styles.realTime}>
            <div>
              <p className={styles.HomeSubTitle}>{'인기 문서'}</p>
              <p className={styles.SubTitleMore}>{'문서 더보기'}</p>
              <div className={styles.popDocList}>
                {PopularDoclist.map((item) => (
                  <div key={item.id}>
                    <PopularDoc version={item.version} title={item.doc_title} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={styles.HomeSubTitle}>{'최근 핫한 토론방'}</p>
              <p className={styles.SubTitleMore}>{'토론방 더보기'}</p>
              <div>
                <div className={styles.HotDebateList}>
                  {debateListData &&
                    debateListData.map((item) => (
                      <HotDebate
                        key={item.id}
                        id={item.id}
                        doc_id={item.doc_id}
                        user_id={item.user_id}
                        subject={item.subject}
                        created_at={item.created_at}
                        recent_edited_at={item.recent_edited_at}
                        done_or_not={item.done_or_not}
                        done_at={item.done_at}
                        is_bad={item.is_bad}
                        title={item.title}
                      />
                    ))}
                </div>
              </div>
            </div>
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
                    <p className={index + 1 === 4 || index + 1 === 5 ? styles.blackNumberIcon : styles.numberIcon}>
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
