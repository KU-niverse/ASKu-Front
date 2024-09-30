import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import falseBk from '../img/bookmarkfalse.png'
import trueBk from '../img/bookmarkFill.png'
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
  const [favorite, setFavorite] = useState(is_favorite)
  const [imageSource, setImageSource] = useState(trueBk)
  const nav = useNavigate()
  const isResult = result
  const queryClient = useQueryClient()

  useEffect(() => {
    if (favorite) {
      setImageSource(trueBk)
    } else {
      setImageSource(falseBk)
    }
  }, [favorite])

  return (
    <div className={styles.resultbox}>
      <div className={styles.versionContainer}>
        <img src={versionimg} alt={'버전이미지'} />
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
