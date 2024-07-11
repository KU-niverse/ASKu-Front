import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import styles from './DebateSearch.module.css'
import searchIcon from '../../img/search_icon.svg'

interface DebateSearchProps {
  title: string
}

interface SearchResult {
  id: number
  subject: string
}

interface SearchResponse {
  success: boolean
  data: SearchResult[]
}

function useSearchDebate(title: string, word: string) {
  return useQuery<SearchResponse, Error>(
    ['searchDebate', title, word],
    async () => {
      const result = await axios.get<SearchResponse>(`${process.env.REACT_APP_HOST}/debate/search/${title}/${word}`, {
        withCredentials: true,
      })
      return result.data
    },
    {
      enabled: !!word,
      retry: false,
      onError: (error) => {
        console.error('토론 검색 에러:', error)
        alert(error.message)
      },
    },
  )
}

const DebateSearch = ({ title }: DebateSearchProps) => {
  const [word, setWord] = useState('')
  const [onClick, setOnClick] = useState(false)

  const { isError, error, data: searchResults } = useSearchDebate(title, word)

  const navigate = useNavigate()

  const handleDebateSearch = () => {
    setOnClick(true) // 검색 결과 보여주기
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDebateSearch()
    }
  }

  const results = searchResults?.data || []
  const resultCount = results.length

  return (
    <div>
      <p className={styles.searchTitle}>{'토론 검색'}</p>
      <div className={styles.inputContainer}>
        <input
          className={styles.headerInput}
          type="text"
          value={word}
          onChange={handleChange}
          placeholder="검색어를 입력하세요."
          onKeyDown={handleKeyDown}
        />
        <img
          role="presentation"
          src={searchIcon}
          alt="icon"
          className={styles.searchIcon}
          onClick={handleDebateSearch}
        />
      </div>

      <div className={onClick ? styles.resultContainer : styles.hidden}>
        {isError ? (
          <p>{error.message}</p>
        ) : resultCount === 0 ? (
          <p>{'검색결과가 없습니다.'}</p>
        ) : (
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
