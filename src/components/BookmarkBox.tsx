import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import falseBk from '../img/bookmarkfalse.png'
import trueBk from '../img/bookmarkFill.png'
import styles from './BookmarkBox.module.css'

interface BookmarkBoxProps {
  title: string
  content: string
  is_favorite: boolean
  result: boolean
}
const BookmarkBox = ({ title, content, is_favorite, result }: BookmarkBoxProps) => {
  const [favorite, setFavorite] = useState(is_favorite)
  const [imageSource, setImageSource] = useState(trueBk)
  const nav = useNavigate()
  const isResult = result

  const addBookmark = async () => {
    try {
      const favaorite_result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/favorite/${title}`,
        {},
        {
          withCredentials: true,
        },
      )
      if (favaorite_result.data.success === true) {
        setFavorite(true)
        alert('즐겨찾기에 추가되었습니다')
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  const deleteBookmark = async () => {
    try {
      const favorite_result = await axios.delete(`${process.env.REACT_APP_HOST}/wiki/favorite/${title}`, {
        withCredentials: true,
      })
      if (favorite_result.data.success === true) {
        setFavorite(false)
        alert('즐겨찾기에서 삭제되었습니다')
      } else {
        alert('문제가 발생하였습니다')
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  async function handleClick() {
    try {
      if (favorite === true) {
        await deleteBookmark()
        setFavorite(false) // Update the state first
        setImageSource(falseBk)
      } else if (favorite === false) {
        await addBookmark()
        setFavorite(true) // Update the state first
        setImageSource(trueBk)
      }
    } catch (error) {
      console.error(error)
      // Handle error appropriately
    }
  }

  useEffect(() => {
    if (favorite === true) {
      setImageSource(trueBk)
    } else if (favorite === false) {
      setImageSource(falseBk)
    }
  }, [favorite])

  return (
    <div className={styles.bkbox}>
      <div className={styles.contents}>
        <div role={'presentation'} className={styles.title} onClick={() => nav(`/wiki/${encodeURIComponent(title)}`)}>
          {title}
        </div>
        <div>
          <img
            role={'presentation'}
            src={imageSource}
            alt={'북마크 버튼'}
            onClick={handleClick}
            className={isResult ? `${styles.hidden}` : ''}
          />
        </div>
      </div>
      <div role={'presentation'} className={styles.content} onClick={() => nav(`/wiki/${encodeURIComponent(title)}`)}>
        {content}
      </div>
    </div>
  )
}

export default BookmarkBox
