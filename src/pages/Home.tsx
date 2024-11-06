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
import randomDocBack from '../img/randomDocBack.gif'
import randomLeft from '../img/randomLeft.svg'
import randomRight from '../img/randomRight.svg'
import version from '../img/version.svg'
import subArrow from '../img/homeSubArrow.svg'
import mobile_haho_btn from '../img/mobile_haho_btn.svg'
import SearchInputComponent from '../components/Home/SearchInputComponent'
import FormatTimeAgo from '../components/FormatTimeAgo'
import PopularQuestion from '../components/PopularQuestion'
import PopularDebate from '../components/PopularDebate'
import RandomDoc from '../components/RandomDoc'

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

interface RandomDocItem {
  title: string
}

// 모바일 8개의 랜덤 문서를 가져오는 함수 정의
const fetchRandomDocs = async (): Promise<RandomDocItem[]> => {
  const promises = Array.from({ length: 8 }).map(() =>
    axios.get(`${process.env.REACT_APP_HOST}/wiki/random`, { withCredentials: true }),
  )

  const responses = await Promise.all(promises)
  return responses.map((response) => ({
    title: response.data.title,
  }))
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
  try {
    const res = await axios.get<DebateResponse>(`${process.env.REACT_APP_HOST}/debate/all/recent`, {
      withCredentials: true,
    })
    console.log('Fetched Debate Data:', res.data.data) // 콘솔에 Debate 데이터를 출력
    return res.data.data
  } catch (error) {
    console.error('Error fetching debate list:', error) // 에러가 발생할 경우 콘솔에 에러 출력
    throw error // 에러를 다시 throw 하여 호출한 함수가 처리할 수 있도록 합니다.
  }
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
  const [mobileViewMode, setMobileViewMode] = useState<boolean>(window.innerWidth <= 767)
  const [clickedMobileButton, setClickedMobileButton] = useState<string | null>('chatbot')
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [randomTitle, setRandomTitle] = useState('ASKu사용방법')
  const [showComponent, setShowComponent] = useState<string>('chatbot') // 모바일 - 어떤 컴포넌트를 보여줄지 결정하는 상태
  const [randomDocs, setRandomDocs] = useState<RandomDocItem[]>([])
  const { data: popularKeywords = [], isLoading: isKeywordsLoading } = useQuery('popularKeywords', fetchPopularKeywords)
  const { data: popularQuestions = [], isLoading: isQuestionsLoading } = useQuery(
    'popularQuestions',
    fetchPopularQuestions,
  )
  // const { isError, error, data: historys } = fetchDocsViews()
  const { data: historys } = useQuery<HistoryItem[], Error>('historyList', fetchDocsViews)
  const { data: debates, isLoading } = useQuery<DebateData[], Error>('debateList', fetchDebateList)
  const PopularDoclist = historys ? historys.slice(0, 7) : []
  const PopularDoclistMobile = historys ? historys.slice(0, 8) : []
  const debateListData = debates ? debates.slice(0, 3) : []
  const debateListDataMobile = debates ? debates.slice(0, 6) : []
  const questionList = popularQuestions ? popularQuestions.slice(0, 4) : []
  const questionListMobile = popularQuestions ? popularQuestions.slice(0, 8) : []

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

  // 처음 렌더링될 때 한 번만 랜덤 문서를 가져오기 위한 useEffect
  useEffect(() => {
    const loadRandomDocs = async () => {
      try {
        const docs = await fetchRandomDocs()
        setRandomDocs(docs)
      } catch (error) {
        console.error('랜덤 문서 가져오기 에러:', error)
      }
    }

    loadRandomDocs()
  }, [])

  useEffect(() => {
    track('view_home')
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setMobileViewMode(true)
      } else {
        setMobileViewMode(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleButtonClick = (component: string) => {
    setShowComponent(component)
    setClickedMobileButton(component)
  }

  return (
    <div className={styles.pageWrap}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      {mobileViewMode ? (
        /* 모바일 뷰 */
        <div className={styles.mobileViewContainer}>
          <div className={styles.mobileTitleContainer}>
            <div className={styles.mobileTitlePink}>AI챗봇: 하호에게</div>
            <div className={styles.mobileTitleBlack}>무엇이든 물어보세요!</div>
            <SearchInputComponent inputValue={inputValue} setInputValue={setInputValue} />
          </div>

          <div className={styles.mobileButtonContainer}>
            <div className={styles.mobileChatbotButtonContainer}>
              <button
                type="button"
                className={`${styles.mobileChatbotButton} ${clickedMobileButton === 'chatbot' ? styles.clicked : ''}`}
                onClick={() => handleButtonClick('chatbot')}
              >
                <img className={styles.mobileChatbotImg} src={mobile_haho_btn} alt="모바일 하호" />
              </button>
            </div>
            <button
              type="button"
              className={`${styles.mobileButton} ${clickedMobileButton === 'popularQuestions' ? styles.clicked : ''}`}
              onClick={() => handleButtonClick('popularQuestions')}
            >
              인기질문
            </button>
            <button
              type="button"
              className={`${styles.mobileButton} ${clickedMobileButton === 'popularDocs' ? styles.clicked : ''}`}
              onClick={() => handleButtonClick('popularDocs')}
            >
              인기문서
            </button>

            <button
              type="button"
              className={`${styles.mobileButton} ${clickedMobileButton === 'debateRoom' ? styles.clicked : ''}`}
              onClick={() => handleButtonClick('debateRoom')}
            >
              토론방
            </button>
            <button
              type="button"
              className={`${styles.mobileButton} ${clickedMobileButton === 'randomDoc' ? styles.clicked : ''}`}
              onClick={() => handleButtonClick('randomDoc')}
            >
              랜덤문서
            </button>
          </div>

          {/* 조건부 렌더링 */}
          {showComponent === 'chatbot' && (
            <div className={styles.chatBotContainer}>
              <Chatbot isLoggedIn={loggedIn} setIsLoggedIn={setLoggedIn} />
            </div>
          )}
          {showComponent === 'popularQuestions' && (
            <div className={styles.popularQuestionsContainer}>
              {questionList.map((question: PopularQuestion) => (
                <PopularQuestion
                  key={question.id}
                  id={question.id}
                  question_id={String(question.id)}
                  nickname={question.nickname}
                  title={question.title}
                  created_at={question.created_at}
                  answer_count={question.answer_count}
                  content={question.content}
                />
              ))}
            </div>
          )}
          {showComponent === 'popularDocs' && (
            <div className={styles.popularDocsContainer}>
              {PopularDoclistMobile.map((item) => (
                <div key={item.id}>
                  <PopularDoc version={item.latest_ver} title={item.title} />
                </div>
              ))}
            </div>
          )}
          {showComponent === 'debateRoom' && (
            <div className={styles.debateRoomContainer}>
              {debateListDataMobile.map((debate: DebateData) => (
                <PopularDebate
                  key={debate.id}
                  id={debate.id}
                  doc_id={debate.doc_id}
                  user_id={debate.user_id}
                  subject={debate.subject}
                  title={debate.title}
                  created_at={debate.created_at}
                  recent_edited_at={debate.recent_edited_at}
                  done_or_not={debate.done_or_not}
                />
              ))}
              <div className={styles.moreContainer}>
                <Link className={styles.more} to={`/latestdebate`}>
                  <p className={styles.SubTitleMore}>{'토론방 더보기'}</p>
                </Link>
              </div>
            </div>
          )}
          {showComponent === 'randomDoc' && (
            <div className={styles.randomDocContainer}>
              {randomDocs?.map((doc, index) => (
                <div key={doc.title}>
                  <RandomDoc randomDocs={[doc]} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 데스크 탑 뷰 */

        <div className={styles.desktopViewContainer}>
          <div className={styles.chatBotContainer}>
            <Chatbot isLoggedIn={isLoggedIn} setIsLoggedIn={setLoggedIn} />
          </div>
          <div className={styles.realTime}>
            <div className={styles.popularDoc}>
              <div className={styles.HomeTitle}>
                <p className={styles.HomeSubTitle}>{'인기 문서'}</p>
                <Link
                  className={styles.more}
                  to={`/wiki/${encodeURIComponent(randomTitle).replace(/\./g, '%2E')}`}
                  key={randomTitle}
                >
                  <p className={styles.SubTitleMore}>{'문서 더보기'}</p>
                  <img src={subArrow} alt={'arrow'} />
                </Link>
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
                <Link className={styles.more} to={`/latestdebate`}>
                  <p className={styles.SubTitleMore}>{'토론방 더보기'}</p>
                  <img src={subArrow} alt={'arrow'} />
                </Link>
              </div>

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
              <div className={styles.randomBackContainer}>
                <Link
                  className={styles.randomLink}
                  to={`/wiki/${encodeURIComponent(randomTitle).replace(/\./g, '%2E')}`}
                  key={randomTitle}
                >
                  <img className={styles.randomDocBack} src={randomDocBack} alt={'배경'} />
                </Link>
              </div>
              <div className={styles.randomDocBottom}>
                <img className={styles.randomBtn} src={randomLeft} alt={'Left'} onClick={handleRandomDoc} />
                <div className={styles.randomDocTitleContainer}>
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
      )}
      <Footer />
    </div>
  )
}

export default Home
