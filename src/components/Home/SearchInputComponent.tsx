import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../../img/logo_big.png'
import styles from '../../pages/Home.module.css'
import searchIcon from '../../img/search_icon.svg'

const SearchInputComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('')

  const navigate = useNavigate()

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      navigate(`/result/${encodeURIComponent(inputValue)}/search`)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className={styles.inputContainer}>
      <img src={logo} className={styles.logo} alt={'logo'} />
      <input
        className={`${styles.searchInput} ${inputValue.trim() !== '' ? styles.active : ''}`}
        placeholder={'Wiki 검색어를 입력하세요.'}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <div className={styles.searchIconContainer}>
        <img role={'presentation'} src={searchIcon} alt={'icon'} className={styles.searchIcon} onClick={handleSearch} />
      </div>
    </div>
  )
}

export default SearchInputComponent
