import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Header from '../components/Header'
import search from '../img/SearchResult.svg'
import styles from './SearchResult.module.css'
import ResultBox from '../components/ResultBox'
import Question from '../components/Question'
import ResultQues from '../components/ResultQues'
import FormatTimeAgo from '../components/FormatTimeAgo'
import BookmarkBox from '../components/BookmarkBox'
import Footer from '../components/Footer'

const fetchDocs = async (title: string) => {
  const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/query/${title}`, {
    withCredentials: true,
  })
  return result.data.message
}

const fetchQues = async (title: string) => {
  const result = await axios.get(`${process.env.REACT_APP_HOST}/question/query/${title}`, {
    withCredentials: true,
  })
  return result.data.data
}

const fetchHistory = async (type: string) => {
  const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys?type=${type}`)
  return result.data.message
}

const SearchResearch = () => {
  const nav = useNavigate()
  const [isClicked, setIsClicked] = useState(true) // true: 문서 false: 질문
  const { title } = useParams<{ title: string }>()
  const [type, setType] = useState('all')

  const {
    data: docs = [],
    isLoading: isDocsLoading,
    refetch: refetchDocs,
  } = useQuery(['docs', title], () => fetchDocs(title), {
    enabled: !!title,
  })

  const {
    data: ques = [],
    isLoading: isQuesLoading,
    refetch: refetchQues,
  } = useQuery(['ques', title], () => fetchQues(title), {
    enabled: !!title,
  })

  const {
    data: historys = [],
    isLoading: isHistorysLoading,
    refetch: refetchHistory,
  } = useQuery(['history', type], () => fetchHistory(type), {
    enabled: !!type,
  })

  useEffect(() => {
    if (title) {
      refetchDocs()
      refetchQues()
    }
  }, [title])

  useEffect(() => {
    refetchHistory()
  }, [type])

  const handleButtonClick = () => {
    setIsClicked(!isClicked)
  }

  const handleDocsClick = (docTitle: string) => {
    const encodedTitle = encodeURIComponent(docTitle)
    nav(`/wiki/${encodedTitle}`)
  }

  return (
    <div>
      <Header />
      <div className={styles.results}>
        <div className={styles.header}>
          <img alt={'검색 결과'} src={search} />
          <h4>
            {'"'}
            {title}
            {'" 검색결과'}
          </h4>
        </div>
        <div className={styles.typeWrap}>
          <p className={styles.type}>
            <button type={'button'} onClick={handleButtonClick} className={isClicked ? styles.btnRed : styles.btnGray}>
              {'문서\r'}
              <div className={isClicked ? styles.numberRed : styles.numberGray}>{docs.length}</div>
            </button>
            <button type={'button'} onClick={handleButtonClick} className={isClicked ? styles.btnGray : styles.btnRed}>
              {'질문\r'}
              <div className={isClicked ? styles.numberGray : styles.numberRed}>{ques.length}</div>
            </button>
          </p>
          <p className={styles.title}>{'최근 변경'}</p>
        </div>
        <div className={styles.contents}>
          <div className={styles.boxes}>
            <div className={isClicked ? '' : styles.hidden}>
              {docs.map((item: any) => (
                <div role={'presentation'} key={item.title} onClick={() => handleDocsClick(item.title)}>
                  <BookmarkBox
                    title={item.title}
                    content={item.recent_filtered_content}
                    is_favorite={item.is_favorite}
                    result
                  />
                </div>
              ))}
              <div className={styles.linkToNew}>
                <Link to={'/newwiki'} className={styles.link}>
                  {'원하시는 문서가 없으신가요? 새로운 문서를 생성해보세요\r'}
                </Link>
              </div>
            </div>
            <div className={isClicked ? styles.hidden : ''}>
              {ques.map((item: any) => (
                <div className={styles.queboxes} key={item.id}>
                  <ResultQues
                    id={item.id}
                    doc_id={item.doc_id}
                    user_id={item.user_id}
                    index_title={item.index_title}
                    content={item.content}
                    created_at={item.created_at}
                    answer_count={item.answer_count}
                    is_bad={item.is_bad}
                    nick={item.nickname}
                    like_count={item.like_count}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.recents}>
            <div className={styles.recentWrap}>
              {historys.slice(0, 8).map((item: any) => {
                const timestamp = FormatTimeAgo(item.created_at)
                return (
                  <ul key={item.title}>
                    <Link to={`/wiki/${encodeURIComponent(item.doc_title)}`} className={styles.linkTo}>
                      <span className={styles.listTitle}>{item.doc_title}</span>
                    </Link>
                    <span className={styles.listTimestamp}>{timestamp}</span>
                  </ul>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchResearch
