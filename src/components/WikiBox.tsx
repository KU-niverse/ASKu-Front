import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
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

interface UserAuthResponse {
  success: boolean
}

function useCheckLoginStatus() {
  return useQuery<UserAuthResponse, AxiosError>(
    'loginStatus',
    async () => {
      const res = await axios.get<UserAuthResponse>(`${process.env.REACT_APP_HOST}/auth/issignedin`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        console.error('로그인 상태 확인 에러:', error)
      },
    },
  )
}

const WikiBox: React.FC<WikiBoxProps> = ({ main, title, content: rawContent, index, section, isZero }) => {
  const content = WikiToHtml(rawContent)
  const nav = useNavigate()
  const location = useLocation()
  const [isOpen, setView] = useState(true) // 메뉴의 초기값을 true로 설정
  const contentWithResponsiveImages = content.replace(/<img/g, '<img style="max-width: 100%; height: auto;"')
  const { data: loginStatusData } = useCheckLoginStatus()

  const linkToWikiEdit = () => {
    if (!loginStatusData?.success) {
      alert('로그인이 필요한 서비스입니다')
      nav('/signin')
      return
    }
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

  const tabCount = index.split('.').length - 1
  const tabs = (tabCount + 1) * 3.6

  return (
    <div className={styles.wikiContents}>
      <li
        role={'presentation'}
        onClick={contentWithResponsiveImages ? toggleView : null}
        className={
          !contentWithResponsiveImages
            ? styles.wikiContentlist
            : isOpen
              ? styles.wikiContentlistOpen
              : styles.wikiContentlistClose
        }
      >
        <div className={styles.wikiContentTitle}>
          <div className={styles.wikiIndex}>&nbsp;{index}. &nbsp;</div>
          <div className={styles.wikiContentTitleText}>{title}</div>
          <div className={contentWithResponsiveImages ? styles.wikiArrow : styles.hidden}>
            <img className={isOpen ? styles.hidden : styles.wikiArrowIcon} src={arrowDown} alt="Arrow Down" />
            <img className={isOpen ? styles.wikiArrowIcon : styles.hidden} src={arrowUp} alt="Arrow Up" />
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
      <div
        style={{ paddingLeft: `${tabs}rem`, borderBottom: '1px solid #d5d5d5', paddingBottom: '1.4rem' }}
        className={isOpen ? `${styles.wikiText}` : `${styles.hidden}`}
      >
        <div dangerouslySetInnerHTML={{ __html: contentWithResponsiveImages }} />
      </div>
    </div>
  )
}

export default WikiBox
