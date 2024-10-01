import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6'
import { track } from '@amplitude/analytics-browser'
import WikiToHtml from './Wiki/WikiToHtml'
import styles from './WikiBox.module.css'
import arrowUp from '../img/arrow_up_black.svg'
import arrowDown from '../img/arrow_down_black.svg'

interface Content {
  index: string
  section: string
  title: string
  content: string
}
interface WikiBoxProps {
  main: string
  title: string
  content: string // 수정된 부분
  index: string
  section: string
  isZero: boolean
}

const WikiBox: React.FC<WikiBoxProps> = ({ main, title, content: rawContent, index, section, isZero }) => {
  const content = WikiToHtml(rawContent)
  const nav = useNavigate()
  const location = useLocation()
  const [isOpen, setView] = useState(true) // 메뉴의 초기값을 true로 설정
  const contentWithResponsiveImages = content.replace(/<img/g, '<img style="max-width: 100%; height: auto;"')

  const linkToWikiEdit = () => {
    track('click_edit_part_in_wiki', {
      title,
      type: 'section',
      section_id: section,
    })
    const encodedMain = encodeURIComponent(main)
    nav(`/wikiedit/${encodedMain}/${section}`, {
      state: {
        from: location.pathname,
        index_title: `${index} ${title}`,
      },
    })
  }

  const linkToWikiQue = () => {
    const encodedMain = encodeURIComponent(main)
    nav(`/wiki/morequestion/${encodedMain}`, { state: `${index} ${title}` })
  }

  const toggleView = () => {
    setView((currentState) => !currentState) // on, off 개념 boolean
  }

  return (
    <div className={styles.wikiContents}>
      <li role={'presentation'} onClick={toggleView} className={styles.wikiContentlist}>
        <div className={styles.wikiContentTitle}>
          <span className={styles.wikiIndex}>&nbsp;{index}. &nbsp;</span>
          <span>{title}</span>
          <div className={isOpen ? '' : styles.hidden}>
            <img className={styles.wikiArrowIcon} src={arrowDown} alt="Arrow Down" />
          </div>
          <div className={isOpen ? styles.hidden : ''}>
            <img className={styles.wikiArrowIcon} src={arrowUp} alt="Arrow Up" />
          </div>
        </div>
        <div className={isZero ? `${styles.hidden}` : `${styles.wikiContentBtns}`}>
          <button type={'button'} onClick={linkToWikiEdit} className={styles.wikiContentBtn}>
            {'편집\r'}
          </button>
          <button type={'button'} onClick={linkToWikiQue} className={styles.wikiContentQuestionBtn}>
            {'질문\r'}
          </button>
        </div>
      </li>
      <div className={isOpen ? `${styles.wikiText}` : `${styles.hidden}`}>
        <div dangerouslySetInnerHTML={{ __html: contentWithResponsiveImages }} />
      </div>
    </div>
  )
}

export default WikiBox
