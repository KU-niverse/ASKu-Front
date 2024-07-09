import { Link, useNavigate, useParams } from 'react-router-dom/dist'
import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import styles from './Wikiviewer.module.css'
import bookmark from '../img/bookmark.png'
import bookmarkFill from '../img/bookmarkFill.png'
import debate from '../img/debate.png'
import his from '../img/his.png'
import answ from '../img/answ.png'
import WikiBox from '../components/WikiBox'
import Switch from '../components/Switch'

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

function WikiViewer() {
  const { title, ver } = useParams()
  const myDivRef = useRef<(HTMLDivElement | null)[]>([])
  const nav = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)

  const Ques = [
    {
      index: '1.',
      number: '1',
      title: '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요 ',
    },
    {
      index: '2.',
      number: '2',
      title: '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
    },
    {
      index: '3.',
      number: '3',
      title: '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
    },
    {
      index: '4.',
      number: '4',
      title: '여기 질문있는데 봐주세요 여기 질문있는데 봐주세요',
    },
  ]

  const staticData: Content[] = [
    {
      index: '1.',
      section: '1',
      title: '일번항목',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!',
    },
    {
      index: '2.',
      section: '2',
      title: '이번항목',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. ddddddddostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!',
    },
    {
      index: '3.',
      section: '3',
      title: '삼번항목',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elitdddddd. ostrum, optio, assumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!',
    },
    {
      index: '4.',
      section: '4',
      title: '사번항목',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. ostrum, odfkjs;fjskdjf;alskdjf;sdlkfj;alsdkjf;alskdjf;laksssumenda distinctio autem, animi dolore velit nam vel impedit porro ad earum! Similique aperiam eaque aliquam ratione earum, unde sunt!',
    },
  ]

  function handleClick(index: number) {
    myDivRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleClickBookmark() {
    setIsBookmark(!isBookmark)
  }

  const fetchWiki = async (): Promise<WikiData> => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${ver}`)
    return response.data
  }

  const { data: wikiData, error, isLoading } = useQuery(['wikiData', title, ver], fetchWiki)

  if (isLoading) return <div>{'Loading...'}</div>
  if (error) return <div>{'Error loading data'}</div>

  const { text: allText, contents: allContent } = wikiData

  return (
    <div className={styles.container}>
      <Header />
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
                main={''}
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
