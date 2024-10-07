import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import styles from './SearchResultBox.module.css'
import versionimg from '../img/version.svg'

interface BookmarkBoxProps {
  title: string
  content: string
  is_favorite: boolean
  result: boolean
  version: number
}

const SearchResultBox = ({ title, content, is_favorite, result, version }: BookmarkBoxProps) => {
  const nav = useNavigate()

  return (
    <div className={styles.resultbox}>
      <div className={styles.versionContainer}>
        <img src={versionimg} alt={'버전이미지'} className={styles.versionImg} />
        <div className={styles.version}>
          {'V'}
          {version}
        </div>
      </div>
      <div className={styles.contents}>
        <div role={'presentation'} className={styles.title} onClick={() => nav(`/wiki/${encodeURIComponent(title)}`)}>
          {title}
        </div>
        <div role={'presentation'} className={styles.content} onClick={() => nav(`/wiki/${encodeURIComponent(title)}`)}>
          {content}
        </div>
      </div>
    </div>
  )
}

export default SearchResultBox
