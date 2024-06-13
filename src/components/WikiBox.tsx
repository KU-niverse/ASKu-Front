import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6'
import WikiToHtml from './Wiki/WikiToHtml'
import styles from './WikiBox.module.css'

interface WikiBoxProps {
  main: string
  title: string
  content: string
  index: string
  section: string
  isZero: boolean
}

const WikiBox = ({ main, title, content: rawContent, index, section, isZero }: WikiBoxProps) => {
  const content = WikiToHtml(rawContent)
  const nav = useNavigate()
  const location = useLocation()
  const [isOpen, setView] = useState(true) // 메뉴의 초기값을 false로 설정
  const contentWithResponsiveImages = content.replace(/<img/g, '<img style="max-width: 100%; height: auto;"')

  const linkToWikiEdit = () => {
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
    setView((currentState) => !currentState) // on,off 개념 boolean
  }

  return (
    <div className={styles.wikiContents}>
      <li role={'presentation'} onClick={toggleView} className={styles.wikiContentlist}>
        <div className={styles.wikiContentTitle}>
          <span className={isOpen ? '' : styles.hidden}>
            <FaChevronDown size={'16'} color={'rgba(222, 58, 88, 1)'} />
          </span>
          <span className={isOpen ? styles.hidden : ''}>
            <FaChevronRight size={'16'} color={'rgba(222, 58, 88, 1)'} />
          </span>
          <span className={styles.wikiIndex}>{index}&nbsp;</span>
          <span>{title}</span>
        </div>
        <div className={isZero ? `${styles.hidden}` : `${styles.wikiContentBtns}`}>
          <button type={'button'} onClick={linkToWikiEdit} className={styles.wikiContentBtn}>
            {'편집\r'}
          </button>
          <button type={'button'} onClick={linkToWikiQue} className={styles.wikiContentBtn}>
            {'질문\r'}
          </button>
        </div>
      </li>
      <hr />
      <div className={isOpen ? `${styles.wikiText}` : `${styles.hidden}`}>
        <div dangerouslySetInnerHTML={{ __html: contentWithResponsiveImages }} />
      </div>
    </div>
  )
}

export default WikiBox
