import React from 'react'
import styles from './DebateSearch.module.css'
import searchIcon from '../../img/search_icon.png'

const DebateSearch = () => {
  return (
    <div>
        <p className={styles.searchTitle}>토론 검색</p>
        <div className={styles.inputContainer}>
            <input className={styles.headerInput} placeholder='검색어를 입력하세요.' />
            <img src={searchIcon} alt='icon' className={styles.searchIcon} />
        </div>
    </div>
  )
}

export default DebateSearch