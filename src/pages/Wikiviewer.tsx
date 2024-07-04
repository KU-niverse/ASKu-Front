import { Link, useNavigate, useLocation, useParams } from 'react-router-dom/dist'
import { useRef, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import styles from './Wikiviewer.module.css'
import falseBk from '../img/bookmarkfalse.svg'
import trueBk from '../img/bookmarkFill.svg'
import debate from '../img/debate.svg'
import his from '../img/his.svg'
import minilike from '../img/minilike.svg'
import WikiBox from '../components/WikiBox'
import Switch from '../components/Switch'
import WikiGraph from '../components/Wiki/WikiGraph'
import SpinnerMypage from '../components/SpinnerMypage'
import Footer from '../components/Footer'

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

interface WikiData {
  contents: Content[]
  is_favorite: boolean
}

interface QuestionData {
  data: Question[]
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
    if (contributeData) {
      setContribute(contributeData.message)
      const total = contributeData.message.reduce((acc, item) => acc + item.point, 0)
      setTotalPoint(total)
      setBlank(contributeData.message.length === 0)
      setLoading(false)
    }
  }, [contributeData])

  const checkLoginStatus = async (): Promise<void> => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success) {
        setLoggedIn(true)
        return
      }
      if (res.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav('/signin')
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response?.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav('/signin')
        return
      }
      alert('에러가 발생하였습니다')
      nav('/')
    }
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  if (wikiLoading || quesLoading || contributeLoading || loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  if (wikiError || quesError || contributeError) {
    return <div>Error loading data</div>
  }

  async function handleClickBookmark() {
    try {
      if (favorite) {
        await deleteBookmark()
        setFavorite(false)
        setImageSource(falseBk)
      } else {
        await addBookmark()
        setFavorite(true)
        setImageSource(trueBk)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function addBookmark() {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/favorite/${title}`,
        {},
        {
          withCredentials: true,
        },
      )
      if (result.data.success) {
        setFavorite(true)
        alert('즐겨찾기에 추가되었습니다')
      } else {
        alert('문제가 발생하였습니다')
      }
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        alert(error.response.data.message)
        nav('/signin')
      } else {
        alert(error.response.data.message)
      }
    }
  }

  async function deleteBookmark() {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_HOST}/wiki/favorite/${title}`, {
        withCredentials: true,
      })
      if (result.data.success) {
        setFavorite(false)
        alert('즐겨찾기에서 삭제되었습니다')
      } else {
        alert('문제가 발생하였습니다')
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
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
              alt={'Bookmark icon'}
              onClick={handleClickBookmark}
              className={styles.bookmarkImg}
            />
          </h1>
          <div className={styles.wikititleBtn}>
            <button type={'button'} onClick={linkToDebate} className={styles.wikititleBtnOne}>
              <img alt={'토론 버튼'} src={debate} />
              &nbsp;{'토론하기\r'}
            </button>

            <button type={'button'} onClick={linkToHistory} className={styles.wikititleBtnTwo}>
              <img alt={'히스토리 버튼'} src={his} />
              &nbsp;{'히스토리\r'}
            </button>
          </div>
        </div>
        <div className={styles.wikiBoxLists}>
          <div className={styles.wikilist}>
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
                    <span className={styles.wikiIndex}>
                      {tabs}
                      {item.index}
                      {'.\r'}
                    </span>{' '}
                    {item.title}
                  </li>
                )
              })}
            </div>
          </div>
          <div className={styles.wikiask}>
            <div className={styles.wikiaskTitle}>
              <h2>{'질문'}</h2>
              <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
            </div>
            <div className={blank === false ? styles.quesWrap : styles.hidden}>
              {ques.length === 0 ? (
                <p className={styles.noneComment}>{'"질문이 존재하지 않습니다"'}</p>
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
                          const encodedTitle = encodeURIComponent(title!)
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
                          {'Q.'}
                          {item.content}
                        </span>
                        <span className={styles.quesNum}>
                          <span>{item.like_count}</span>
                          <img alt={'좋아요 이미지'} src={minilike} />
                        </span>
                      </ul>
                    </div>
                  )
                })
              )}
            </div>
            <div className={styles.wikiaskFoot}>
              <Link to={`/wiki/morequestion/${encodeURIComponent(title!)}`}>
                <button type={'button'} className={styles.addQues}>
                  {'나도 질문하기'}
                </button>
              </Link>
              <Link to={`/wiki/morequestion/${encodeURIComponent(title!)}`}>
                <button type={'button'} className={styles.moreQues}>
                  {'더보기'}
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
              const isZero = item.index === '0'

              return (
                <div
                  ref={(el) => {
                    myDivRef.current[Number(item.section)] = el
                  }}
                  key={item.section}
                >
                  <WikiBox
                    title={item.title}
                    content={item.content}
                    index={item.index}
                    section={item.section}
                    main={title!}
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
