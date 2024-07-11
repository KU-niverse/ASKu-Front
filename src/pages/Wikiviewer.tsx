import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
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

interface WikiViewerProps {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function WikiViewer({ loggedIn, setLoggedIn }: WikiViewerProps) {
  const myDivRef = useRef<(HTMLDivElement | null)[]>([])
  const nav = useNavigate()
  const location = useLocation()
  const { title } = useParams()

  const [isToggled, setIsToggled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isBookmark, setIsBookmark] = useState(false)
  const [allContent, setAllContent] = useState<Content[]>([])
  const [ques, setQues] = useState<Question[]>([])
  const [contribute, setContribute] = useState<Contribution[]>([])
  const [totalPoint, setTotalPoint] = useState<number | null>(null)
  const [flag, setFlag] = useState(0)
  const [blank, setBlank] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [imageSource, setImageSource] = useState<string>(falseBk)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

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
        const axiosError = error as AxiosError
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
      onError: (error: unknown) => {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 401) {
          alert(axiosError.message)
          nav('/signin')
        } else {
          alert(axiosError.message)
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
        const axiosError = error as AxiosError
        alert(axiosError.message)
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

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.container}>
        <div className={styles.wikiViewer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.bookmarkWrapper}>
            {loggedIn && !checkLoginLoading && !checkLoginError && (
              <img
                role={'presentation'}
                src={imageSource}
                className={styles.bookmark}
                alt={favorite ? '즐겨찾기 취소' : '즐겨찾기'}
                onClick={handleClickBookmark}
              />
            )}
          </div>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
          {(wikiLoading || quesLoading || contributeLoading || checkLoginLoading) && <SpinnerMypage />}
          {wikiError && <div>{'Wiki 데이터를 불러오는 중 오류가 발생했습니다.'}</div>}
          {quesError && <div>{'질문 데이터를 불러오는 중 오류가 발생했습니다.'}</div>}
          {contributeError && <div>{'기여 데이터를 불러오는 중 오류가 발생했습니다.'}</div>}
          {allContent.map((contentItem, index) => (
            <div
              ref={(el) => {
                myDivRef.current[index] = el
              }}
              key={contentItem.section}
            >
              <WikiBox
                title={contentItem.title}
                content={contentItem.content} // 이 부분을 수정
                index={contentItem.index}
                section={contentItem.section}
                main={contentItem.content} // main에 적절한 값을 전달
                isZero={false}
              />
            </div>
          ))}
        </div>
      </div>
      <WikiGraph total_point={totalPoint ?? 0} users={contribute} />
      <Footer />
    </>
  )
}

export default WikiViewer
