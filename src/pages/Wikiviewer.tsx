import { Link, useNavigate, useLocation, useParams } from 'react-router-dom/dist'
import React, { useRef, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { track } from '@amplitude/analytics-browser'
import { useQuery, useMutation } from 'react-query'
import Header from '../components/Header'
import styles from './Wikiviewer.module.css'
import falseBk from '../img/bookmarkfalse.svg'
import trueBk from '../img/bookmarkFill.svg'
import VectorRight from '../img/VectorRight.svg'
import debate from '../img/debate.svg'
import his from '../img/his.svg'
import minilike from '../img/minilike.svg'
import WikiBox from '../components/WikiBox'
import Switch from '../components/Switch'
import WikiGraph from '../components/Wiki/WikiGraph'
import SpinnerMypage from '../components/SpinnerMypage'
import Footer from '../components/Footer'
import question from '../img/wiki_qustion.svg'

interface AxiosErrorResponse {
  message: string
}

type CustomAxiosError = AxiosError<AxiosErrorResponse>

interface WikiViewerProps {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

interface Content {
  index: string
  section: string
  title: string
  content: string
}

interface Question {
  id: string
  user_id: string
  content: string
  created_at: string
  like_count: number
  nickname: string
  index_title: string
  answer_count: number
}

interface Contribution {
  point: number
  nickname: string
}

interface wikititle {
  data: string
}

interface WikiData {
  contents: Content[]
  is_favorite: boolean
}

interface QuestionData {
  data: Question[]
}

interface TitleData {
  titles: wikititle[]
}

interface ContributionData {
  message: Contribution[]
}

function WikiViewer({ loggedIn, setLoggedIn }: WikiViewerProps) {
  const myDivRef = useRef<(HTMLDivElement | null)[]>([])
  const nav = useNavigate()
  const location = useLocation()
  const [isToggled, setIsToggled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isBookmark, setIsBookmark] = useState(false)
  const { title } = useParams()
  const [allText, setAllText] = useState('')
  const [allContent, setAllContent] = useState<Content[]>([])
  const [ques, setQues] = useState<Question[]>([])
  const [contribute, setContribute] = useState<Contribution[]>([])
  const [totalPoint, setTotalPoint] = useState<number | null>(null)
  const [flag, setFlag] = useState(0)
  const [blank, setBlank] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [imageSource, setImageSource] = useState(falseBk)
  const [titles, settitles] = useState([])
  const [isTocExpanded, setIsTocExpanded] = useState(false)

  const flagToggle = () => {
    if (!isToggled) {
      setFlag(0)
    } else {
      setFlag(1)
    }
  }

  useEffect(() => {
    flagToggle()
  }, [isToggled])

  const fetchWiki = async (): Promise<WikiData> => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${title}`)
    return response.data
  }

  const fetchQues = async (): Promise<QuestionData> => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/question/view/${flag}/${encodeURIComponent(title)}`)
    return response.data
  }

  const fetchTitles = async (): Promise<TitleData> => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/titles`)
    return response.data
  }

  const fetchContribute = async (): Promise<ContributionData> => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contributions/${title}`)
    const data = response.data.message.map((contribution: { point: string; nickname: string }) => ({
      ...contribution,
      point: parseInt(contribution.point, 10),
    }))
    return { message: data }
  }

  const { data: wikiData, isLoading: wikiLoading, error: wikiError } = useQuery(['wikiData', title], fetchWiki)
  const { data: quesData, isLoading: quesLoading, error: quesError } = useQuery(['quesData', title, flag], fetchQues)
  const {
    data: titlesData,
    isLoading: titlesLoading,
    error: titlesError,
  } = useQuery(['titlesData', titles], fetchTitles)
  const {
    data: contributeData,
    isLoading: contributeLoading,
    error: contributeError,
  } = useQuery(['contributeData', title], fetchContribute)

  useEffect(() => {
    if (wikiData) {
      setAllContent(wikiData.contents)
      setFavorite(wikiData.is_favorite)
      setImageSource(wikiData.is_favorite ? trueBk : falseBk)
    }
  }, [wikiData])

  useEffect(() => {
    if (quesData) {
      setQues(quesData.data)
      setBlank(quesData.data.length === 0)
    }
  }, [quesData])

  useEffect(() => {
    if (titlesData) {
      settitles(titlesData.titles)
    }
  }, [titlesData])

  useEffect(() => {
    if (contributeData) {
      setContribute(contributeData.message)
      const total = contributeData.message.reduce((acc, item) => acc + item.point, 0)
      setTotalPoint(total)
      setBlank(contributeData.message.length === 0)
      setLoading(false)
    }
  }, [contributeData])

  const { isLoading: checkLoginLoading, error: checkLoginError } = useQuery(
    'checkLoginStatus',
    async () => {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      return res.data
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
          alert('로그인이 필요한 서비스 입니다.')
          nav('/signin')
        }
      },
      onError: (error: unknown) => {
        setLoggedIn(false)
        const axiosError = error as CustomAxiosError
        if (axiosError.response?.status === 401) {
          alert('로그인이 필요한 서비스 입니다.')
          nav('/signin')
        } else {
          alert('에러가 발생하였습니다')
          nav('/')
        }
      },
    },
  )

  const addBookmarkMutation = useMutation(
    async () => {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/favorite/${title}`,
        {},
        {
          withCredentials: true,
        },
      )
      return result.data
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setFavorite(true)
          setImageSource(trueBk)
          alert('즐겨찾기에 추가되었습니다')
        } else {
          alert('문제가 발생하였습니다')
        }
      },
      onError: (error: AxiosError) => {
        const axiosError = error as CustomAxiosError
        if (axiosError.response?.status === 401) {
          alert(axiosError.response.data.message)
          nav('/signin')
        } else {
          alert(axiosError.response.data.message)
        }
      },
    },
  )

  const deleteBookmarkMutation = useMutation(
    async () => {
      const result = await axios.delete(`${process.env.REACT_APP_HOST}/wiki/favorite/${title}`, {
        withCredentials: true,
      })
      return result.data
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setFavorite(false)
          setImageSource(falseBk)
          alert('즐겨찾기에서 삭제되었습니다')
        } else {
          alert('문제가 발생하였습니다')
        }
      },
      onError: (error: unknown) => {
        const axiosError = error as CustomAxiosError
        alert(axiosError.response?.data.message)
      },
    },
  )

  const handleClickBookmark = async () => {
    if (favorite) {
      deleteBookmarkMutation.mutate()
    } else {
      addBookmarkMutation.mutate()
    }
  }

  function handleClick(index: number) {
    myDivRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const linkToHistory = () => {
    const encodedTitle = encodeURIComponent(title!)
    nav(`/history/${encodedTitle}`)
  }

  const linkToAllEdit = () => {
    const encodedTitle = encodeURIComponent(title!)
    nav(`/wikiedit/${encodedTitle}/all`, { state: { from: location.pathname } })
  }

  const linkToDebate = () => {
    const encodedTitle = encodeURIComponent(title!)
    nav(`/debate/${encodedTitle}`)
  }

  const linkToNextWiki = () => {
    const currentIndex = titles.indexOf(title)
    if (currentIndex !== -1) {
      let nextTitle
      if (currentIndex < titles.length - 1) {
        nextTitle = titles[currentIndex + 1]
      } else {
        // eslint-disable-next-line prefer-destructuring
        nextTitle = titles[0]
      }
      nav(`/wiki/${encodeURIComponent(nextTitle)}`)
      window.location.reload()
    } else {
      console.error('현재 title을 찾을 수 없습니다.')
    }
  }

  if (wikiLoading || quesLoading || contributeLoading || loading || checkLoginLoading || titlesLoading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  if (wikiError || quesError || contributeError || checkLoginError || titlesError) {
    return <div>{'Error loading data'}</div>
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wikiviewer}>
        <div className={styles.wikititle}>
          <h1>
            {title}
            <img
              role={'presentation'}
              src={imageSource}
              alt={'북마크 버튼'}
              onClick={handleClickBookmark}
              className={styles.bookmarkImg}
            />
          </h1>
          <div className={styles.wikititleBtn}>
            <button type={'button'} onClick={linkToDebate} className={styles.wikititleBtnOne}>
              <img alt={'토론하기 버튼'} src={debate} />
              &nbsp;{'토론하기\r'}
            </button>

            <button type={'button'} onClick={linkToHistory} className={styles.wikititleBtnTwo}>
              <img alt={'히스토리 버튼'} src={his} />
              &nbsp;{'히스토리\r'}
            </button>

            <button type={'button'} onClick={linkToNextWiki} className={styles.wikititleBtnThree}>
              &nbsp;{'다음 문서\r'}
              <img src={VectorRight} alt={'다음 문서 아이콘'} />
            </button>
          </div>
        </div>
        <div className={styles.wikiBoxLists}>
          <div className={styles.wikilist + (isTocExpanded ? ` ${styles.expanded}` : '')}>
            <div className={styles.wikilistTitle}>
              <h2>{'목차'}</h2>
              <button type={'button'} onClick={linkToAllEdit}>
                {'전체 편집'}
              </button>
            </div>
            <div>
              {allContent.map((item) => {
                const tabCount = item.index.split('.').length - 1
                const tabs = '\u00a0\u00a0\u00a0'.repeat(tabCount)

                return (
                  <li role={'presentation'} onClick={() => handleClick(Number(item.section))} key={item.section}>
                    <span
                      style={{
                        fontWeight: tabCount === 0 ? 'bold' : 'normal',
                        fontSize: tabCount === 0 ? '16px' : '15px',
                      }}
                    >
                      {' '}
                      {tabs}
                      <span className={styles.wikiIndex}>
                        {item.index}
                        {'.\r'}
                      </span>
                      {item.title}
                    </span>
                  </li>
                )
              })}
            </div>
            <button type="button" onClick={() => setIsTocExpanded(!isTocExpanded)} className={styles.tocExpandedButton}>
              {isTocExpanded ? '목차 접기 ▲' : '목차 더보기 ▼'}
            </button>
          </div>

          <div className={styles.wikiask}>
            <div className={styles.wikiaskTitle}>
              <h2>{'질문'}</h2>
              <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
            </div>
            <div className={blank === false ? styles.quesWrap : styles.hidden}>
              {ques.length === 0 ? (
                <div className={styles.noQuestion}>
                  <div className={styles.askWrapper}>
                    <span className={styles.askText}>질문할래요</span>
                    <img src={question} alt="질문할래요 아이콘" className={styles.askIcon} />
                  </div>
                  <p className={styles.noneComment}>아직 질문이 존재하지 않습니다</p>
                </div>
              ) : (
                ques.map((item, index) => {
                  if (index >= 5) {
                    return null
                  }
                  return (
                    <div className={styles.queslist}>
                      <hr className={styles.customHr} />
                      <ul
                        role={'presentation'}
                        key={item.id}
                        onClick={() => {
                          const encodedTitle = encodeURIComponent(title)
                          track('click_question_in_wiki', {
                            index,
                          })
                          nav(`/wiki/morequestion/${encodedTitle}/${item.id}`, {
                            state: {
                              question_id: item.id,
                              user_id: item.user_id,
                              content: item.content,
                              created_at: item.created_at,
                              like_count: item.like_count,
                              nick: item.nickname,
                              index_title: item.index_title,
                              answer_count: item.answer_count,
                              title,
                            },
                          })
                        }}
                        className={styles.quesul}
                      >
                        <span className={styles.quesTitle}>
                          {'Q. '}
                          {item.content}
                        </span>
                        <span className={styles.quesNum}>
                          <span>{item.like_count}</span>
                          <img alt={'좋아요'} src={minilike} />
                        </span>
                      </ul>
                    </div>
                  )
                })
              )}
            </div>
            <div className={styles.wikiaskFoot}>
              <Link to={`/wiki/morequestion/${encodeURIComponent(title)}`} className={styles.addQuesLink}>
                <button type={'button'} className={styles.addQues}>
                  {'나도 질문하기'} <img src={question} alt="질문할래요 아이콘" className={styles.askIcon} />
                </button>
              </Link>
              <Link
                to={`/wiki/morequestion/${encodeURIComponent(title)}`}
                onClick={() => {
                  track('view_question_list', {
                    title,
                  })
                }}
              >
                <button type={'button'} className={styles.moreQues}>
                  {'질문 더보기'}
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.wikigraph}>
            {contribute && totalPoint ? (
              <WikiGraph total_point={totalPoint} users={contribute} />
            ) : (
              <p className={styles.noneComment}>{'"기여도가 존재하지 않습니다"'}</p>
            )}
          </div>
        </div>
        <div className={styles.wikicontent}>
          {allContent.length === 0 ? (
            <p>
              <span className={styles.noneComment}>{'"위키 문서가 없습니다. '}</span>
              <span role={'presentation'} className={styles.newComment} onClick={() => nav('/newwiki')}>
                {'새 문서를 생성해주세요"\r'}
              </span>
            </p>
          ) : (
            allContent.map((item) => {
              // 0. 들어가며 일시 질문 및 편집 막기 위해 판단
              let isZero

              if (item.index === '0') {
                isZero = true
              } else {
                isZero = false
              }

              return (
                <div ref={(el) => myDivRef.current[Number(item.section)] === el} key={item.section}>
                  <WikiBox
                    title={item.title}
                    content={item.content}
                    index={item.index}
                    section={item.section}
                    main={title}
                    isZero={isZero}
                  />
                </div>
              )
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WikiViewer
