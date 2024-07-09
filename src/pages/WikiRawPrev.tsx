import { useNavigate, useParams } from 'react-router-dom/dist'
import { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import styles from './Wikiviewer.module.css'
import his from '../img/his.png'
import WikiToHtml from '../components/Wiki/WikiToHtml'

function WikiViewer() {
  const { title, ver } = useParams()
  const myDivRef = useRef<(HTMLDivElement | null)[]>([])
  const nav = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)

  const fetchWiki = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${ver}`)
    return response.data
  }

  const { data: wikiData, error, isLoading } = useQuery(['wikiData', title, ver], fetchWiki)

  if (isLoading) return <div>{'Loading...'}</div>
  if (error) return <div>{'Error loading data'}</div>

  const { text, contents: allContent } = wikiData
  const allText = WikiToHtml(text).replace(/<img/g, '<img style="max-width: 100%; height: auto;"')

  function handleClick(index: number) {
    myDivRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wikiviewer}>
        <div className={styles.wikititle}>
          <h1>{title}</h1>
          <div className={styles.wikititleBtn}>
            <div />
            <button
              type={'button'}
              onClick={() => {
                const encodedTitle = encodeURIComponent(title)
                nav(`/history/${encodedTitle}`)
              }}
            >
              <img src={his} alt={''} />
              &nbsp;{'히스토리\r'}
            </button>
          </div>
        </div>
        <div className={styles.wikiBoxLists}>
          {/* <div className={styles.wikilist}>
                    <div className={styles.wikilistTitle}>
                        <h2>목차</h2>
                        <button>전체 편집</button>
                    </div>
                    <div>
                        {/* {allContent.map((item) => {
                            return(
                                <li onClick={() => handleClick(item.section)} key={item.section}>
                                    <span className={styles.wikiIndex}>{item.index}</span> {item.title}
                                </li>
                            );
                        })} 
                    </div>
                    
                </div> */}
        </div>
        <div className={styles.wikicontent}>
          <div dangerouslySetInnerHTML={{ __html: allText }} />
        </div>
      </div>
    </div>
  )
}

export default WikiViewer
