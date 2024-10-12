/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, KeyboardEvent, useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './DebateSearch.module.css'
import cancelIcon from '../../img/cancelIcon.svg'
import searchIcon_grey from '../../img/searchIcon_grey.svg'
import searchIcon_red from '../../img/searchIcon_red.svg'

interface DebateSearchProps {
  title: string
}

interface SearchResponse {
  success: boolean
  data: SearchResult[]
}

interface SearchResult {
  id: number
  subject: string
}

const getSearchDebate = async (title: string, word: string) => {
  const result = await axios.get<SearchResponse>(`${process.env.REACT_APP_HOST}/debate/search/${title}/${word}`, {
    withCredentials: true,
  })
  return result.data
}

const DebateSearch = ({ title }: DebateSearchProps) => {
  const [word, setWord] = useState('')
  const [showResult, setShowResult] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, error } = useQuery(['searchDebate', title, word], () => getSearchDebate(title, word), {
    enabled: !!word, // 검색어가 있을 때만 실행
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }

  const handleDebateSearch = () => {
    setShowResult(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDebateSearch()
    }
  }
  const delWord = () => {
    setWord('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  const results = data?.data || []
  const lenResult = results.length

  return (
    <div>
      <b className={styles.searchTitle}>{'토론 검색'}</b>
      <div className={styles.searchInputContainer}>
        <input
          className={styles.searchInput}
          type={'text'}
          value={word}
          placeholder={'검색어를 입력하세요.'}
          onChange={handleInputChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />

        <img
          className={styles.searchIcon}
          src={word ? searchIcon_red : searchIcon_grey}
          onClick={handleDebateSearch}
          alt={'검색'}
        />
        <img className={word ? styles.cancelIcon : styles.hidden} src={cancelIcon} onClick={delWord} alt={'검색'} />
      </div>
      <div className={showResult ? styles.result : styles.hidden}>
        {error ? (
          <p>{'오류가 발생하였습니다.'}</p>
        ) : lenResult === 0 ? (
          <p>{'검색결과가 없습니다.'}</p>
        ) : (
          // eslint-disable-next-line arrow-parens
          results.map((item) => (
            <Link
              key={item.id}
              to={`/debate/${encodeURIComponent(title)}/${item.subject}`}
              state={{ title, subject: item.subject, id: item.id }}
              className={styles.linkTo}
            >
              <ul className={styles.resultList}>{item.subject}</ul>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default DebateSearch
