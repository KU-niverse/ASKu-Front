import { useNavigate, useParams } from 'react-router-dom/dist'
import { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './WikiRawPrev.module.css'
import his from '../img/history.svg'
import WikiToHtml from '../components/Wiki/WikiToHtml'
import SpinnerMypage from '../components/SpinnerMypage'

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

function WikiViewer() {
  const { title, ver } = useParams()
  const myDivRef = useRef<(HTMLDivElement | null)[]>([])
  const nav = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const fetchWiki = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${ver}`)
    return response.data
  }

  const { data: wikiData, error, isLoading } = useQuery(['wikiData', title, ver], fetchWiki)

  if (isLoading) return <SpinnerMypage />
  if (error) return <div>{'Error loading data'}</div>

  const allText = WikiToHtml(wikiData.jsonData.text).replace(/<img/g, '<img style="max-width: 100%; height: auto;"')

  function handleClick(index: number) {
    myDivRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.pageWrap}>
      <div className={styles.wikiRawContainer}>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        <div className={styles.wikiRawContent}>
          <div className={styles.wikititle}>
            <h1>{title}</h1>
            <div className={styles.wikititleBtn}>
              <button
                type={'button'}
                onClick={() => {
                  const encodedTitle = encodeURIComponent(title)
                  nav(`/history/${encodedTitle}`)
                }}
              >
                <img className={styles.hisimg} src={his} alt={''} />
                &nbsp;{'히스토리\r'}
              </button>
            </div>
          </div>
          <div className={styles.wikiRawBox}>
            <div dangerouslySetInnerHTML={{ __html: allText }} />
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default WikiViewer
