import { useNavigate, useParams } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import styles from './Wikiviewer.module.css'
import bookmark from '../img/bookmark.png'
import bookmarkFill from '../img/bookmarkFill.png'
import debate from '../img/debate.png'
import his from '../img/his.png'
import WikiBox from '../components/WikiBox'

interface Content {
  index: string
  section: string
  title: string
  content: string
}

interface WikiData {
  text: string
  contents: Content[]
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

function WikiViewer() {
  const { title, ver } = useParams()
  const myDivRef = useRef<(HTMLDivElement | null)[]>([])
  const nav = useNavigate()
  const [isBookmark, setIsBookmark] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const fetchWiki = async (): Promise<WikiData> => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${ver}`)
    return response.data
  }

  const { data: wikiData, error, isLoading } = useQuery(['wikiData', title, ver], fetchWiki)

  if (isLoading) return <div>{'Loading...'}</div>
  if (error) return <div>{'Error loading data'}</div>

  const { text: allText, contents: allContent } = wikiData

  function handleClick(index: number) {
    myDivRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleClickBookmark() {
    setIsBookmark(!isBookmark)
  }

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.wikiviewer}>
        <div className={styles.wikititle}>
          <h1>
            {title}
            <img
              role={'presentation'}
              src={bookmark}
              className={isBookmark ? `${styles.hidden}` : `${styles.bookmarkImg}`}
              onClick={handleClickBookmark}
              alt={''}
            />
            <img
              alt={'북마크'}
              role={'presentation'}
              src={bookmarkFill}
              className={isBookmark ? `${styles.bookmarkImg}` : `${styles.hidden}`}
              onClick={handleClickBookmark}
            />
          </h1>
          <div className={styles.wikititleBtn}>
            <button type={'button'}>
              <img alt={'토론하기 버튼'} src={debate} />
              &nbsp;{'토론하기\r'}
            </button>
            <button type={'button'}>
              <img alt={'히스토리 버튼'} src={his} />
              &nbsp;{'히스토리\r'}
            </button>
          </div>
        </div>
        <div className={styles.wikiBoxLists}>
          <div className={styles.wikilist}>
            <div className={styles.wikilistTitle}>
              <h2>{'목차'}</h2>
              <button type={'button'}>{'전체 편집'}</button>
            </div>
            <div>
              {allContent.map((item: Content) => (
                <li role={'presentation'} onClick={() => handleClick(Number(item.section))} key={item.section}>
                  <span className={styles.wikiIndex}>{item.index}</span> {item.title}
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.wikicontent}>
          {allContent.map((item: Content) => (
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
                main={allText}
                isZero={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WikiViewer
