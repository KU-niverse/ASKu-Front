/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import questionBubble from '../img/questionBubble.svg'
import randomBack from '../img/randomBack.svg'
import randomLeft from '../img/randomLeft.svg'
import randomRight from '../img/randomRight.svg'
import version from '../img/version.svg'

interface HistoryResponse {
  success: boolean
  data: HistoryItem[]
}

interface HistoryItem {
  id: number
  title: string
  latest_ver: number
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

interface RandomDocResponse {
  title: string
}

function useRandomDoc() {
  return useQuery<RandomDocResponse, Error>(
    'randomDoc',
    async () => {
      const response = await axios.get<RandomDocResponse>(`${process.env.REACT_APP_HOST}/wiki/random`, {
        withCredentials: true,
      })
      return response.data
    },
    {
      enabled: false,
      retry: false,
      onError: (error) => {
        console.error('랜덤 문서 가져오기 에러:', error)
      },
    },
  )
}

const fetchDocsViews = async (): Promise<HistoryItem[]> => {
  const res = await axios.get<HistoryResponse>(`${process.env.REACT_APP_HOST}/admin/docsviews`, {
    withCredentials: true,
  })
  return res.data.data
}

const fetchDebateList = async (): Promise<DebateData[]> => {
  const res = await axios.get<DebateResponse>(`${process.env.REACT_APP_HOST}/debate/all/recent`, {
    withCredentials: true,
  })
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
  const [randomTitle, setRandomTitle] = useState('ASKu사용방법')

  const { data: popularKeywords = [], isLoading: isKeywordsLoading } = useQuery('popularKeywords', fetchPopularKeywords)
  const { data: popularQuestions = [], isLoading: isQuestionsLoading } = useQuery(
    'popularQuestions',
    fetchPopularQuestions,
  )
  // const { isError, error, data: historys } = fetchDocsViews()
  const { data: historys } = useQuery<HistoryItem[], Error>('historyList', fetchDocsViews)
  const { data: debates, isLoading } = useQuery<DebateData[], Error>('debateList', fetchDebateList)
  const PopularDoclist = historys ? historys.slice(0, 7) : []
  const debateListData = debates ? debates.slice(0, 3) : []
  const questionList = popularQuestions ? popularQuestions.slice(0, 4) : []

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

  const handleRandomDoc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/random`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        setRandomTitle(response.data.title)
      }
      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.error('Error fetching random document:', error)
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
        </div>
        <div className={styles.realTime}>
          <div className={styles.popularDoc}>
            <div className={styles.HomeTitle}>
              <p className={styles.HomeSubTitle}>{'인기 문서'}</p>
              <p className={styles.SubTitleMore}>{'문서 더보기'}</p>
            </div>
            <div>
              <div className={styles.popDocList}>
                {PopularDoclist.map((item) => (
                  <div key={item.id}>
                    <PopularDoc version={item.latest_ver} title={item.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.HotDebate}>
            <div className={styles.HomeTitle}>
              <p className={styles.HomeSubTitle}>{'최근 핫한 토론방'}</p>
              <p className={styles.SubTitleMore}>{'토론방 더보기'}</p>
            </div>
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
          <div className={styles.PopularQuestion}>
            <div className={styles.HomeTitle}>
              <p className={styles.HomeSubTitle}>{'실시간 인기 질문'}</p>
              <p className={styles.SubTitleMore}>{'질문 더보기'}</p>
            </div>
            <div className={styles.questionList}>
              {isQuestionsLoading ? (
                <p>{'Loading...'}</p>
              ) : (
                questionList.map((question: PopularQuestion, index: number) => (
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
                    <img src={questionBubble} alt={'물음표 아이콘'} className={styles.bubbleIcon} />
                    <p className={styles.rankContent}>{question.content}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
          <div className={styles.randomDocBox}>
            <p className={styles.realTimeTitle}>{'실시간 랜덤 문서'}</p>
            <div>
              <Link
                className={styles.randomLink}
                to={`/wiki/${encodeURIComponent(randomTitle).replace(/\./g, '%2E')}`}
                key={randomTitle}
              >
                <img className={styles.randomDocBack} src={randomBack} alt={'배경'} />
              </Link>
            </div>
            <div className={styles.randomDocBottom}>
              <img className={styles.randomBtn} src={randomLeft} alt={'Left'} onClick={handleRandomDoc} />
              <div>
                <Link
                  className={styles.randomLink}
                  to={`/wiki/${encodeURIComponent(randomTitle).replace(/\./g, '%2E')}`}
                  key={randomTitle}
                >
                  <p>{randomTitle}</p>
                </Link>
              </div>
              <img className={styles.randomBtn} src={randomRight} alt={'Right'} onClick={handleRandomDoc} />
            </div>
          </div>
          <div className={styles.recommendTag}>
            <p className={styles.recommendTagTitle}>{'실시간 추천 태그'}</p>
            <div className={styles.recommendList}>
              {isKeywordsLoading ? (
                <p>{'Loading...'}</p>
              ) : (
                popularKeywords.slice(0, 5).map((keyword: PopularKeyword, index: number) => (
                  <Link
                    to={`/result/${encodeURIComponent(keyword.keyword).replace(/\./g, '%2E')}/${encodeURIComponent('popularsearch')}`}
                    className={styles.realrankWrap}
                    key={keyword.id}
                    onClick={() => {
                      track('click_trend_search_keyword', {
                        search_rank: index + 1,
                        search_keyword: keyword.keyword,
                      })
                    }}
                  >
                    <p className={styles.realTimerank}>#{keyword.keyword}</p>
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
