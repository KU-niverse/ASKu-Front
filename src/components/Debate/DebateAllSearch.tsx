/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import styles from './DebateSearch.module.css'
import cancelIcon from '../../img/cancelIcon.svg'
import searchIcon_grey from '../../img/searchIcon_grey.svg'
import searchIcon_red from '../../img/searchIcon_red.svg'

const DebateAllSearch = () => {
  const [word, setWord] = useState('')
  const [results, setResults] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [onClick, setOnClick] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const nav = useNavigate()

  const searchDebate = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/debate/searchall/${word}`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        setResults(result.data.data)
        setResultCount(result.data.data.length)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.message)
    }
  }

  const handleDebateSearch = () => {
    searchDebate()
    setOnClick(true)
  }
  const delWord = () => {
    setWord('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      handleDebateSearch()
    }
  }

  return (
    <div className={styles.debateSearch}>
      <p className={styles.searchTitle}>{'토론 검색'}</p>
      <div className={styles.InputContainer}>
        <input
          className={styles.headerInput}
          type={'text'}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder={'검색어를 입력하세요.'}
          onKeyDown={handleKeyDown} // Use onKeyDown instead
        />
        <img
          role={'presentation'}
          src={word ? searchIcon_red : searchIcon_grey}
          alt={'search'}
          className={styles.searchIcon}
          onClick={handleDebateSearch}
        />
        <img className={word ? styles.cancelIcon : styles.hidden} src={cancelIcon} onClick={delWord} alt={'del'} />
      </div>

      <div className={onClick ? styles.resultContainer : styles.hidden}>
        {resultCount === 0 ? (
          <p>{'"검색결과가 없습니다."'}</p>
        ) : (
          results.map((item) => {
            return (
              <Link
                to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
                state={{
                  title: item.title,
                  subject: item.subject,
                  id: item.id,
                }}
                className={styles.linkTo}
              >
                <ul key={item.id} className={styles.resultList}>
                  {item.subject}
                </ul>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}

export default DebateAllSearch
