import { Link, useNavigate, useParams } from 'react-router-dom/dist'
import React, { useRef, useEffect, useState } from 'react'

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

import WikiToHtml from '../components/Wiki/WikiToHtml'

function WikiViewer() {
  const { title, ver } = useParams()
  const myDivRef = useRef([])
  const nav = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [allText, setAllText] = useState('')
  const [allContent, setAllContent] = useState([])

  function handleClick(index: any) {
    myDivRef.current[index].scrollIntoView({ behavior: 'smooth' })
  }

  const getWiki = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${ver}`)
      setAllText(WikiToHtml(result.data.jsonData.text).replace(/<img/g, '<img style="max-width: 100%; height: auto;"'))

      setAllContent(result.data.contents)
    } catch (error) {
      console.error(error)
      // alert(result.data.message);
    }
  }

  useEffect(() => {
    getWiki()
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wikiviewer}>
        <div className={styles.wikititle}>
          <h1>{title}</h1>
          <div className={styles.wikititleBtn}>
            <div />
            <button
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
