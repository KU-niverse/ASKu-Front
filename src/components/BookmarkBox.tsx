import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
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
  const queryClient = useQueryClient()

  const addBookmark = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/wiki/favorite/${title}`,
      {},
      {
        withCredentials: true,
      },
    )
    return response.data
  }

  const deleteBookmark = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_HOST}/wiki/favorite/${title}`, {
      withCredentials: true,
    })
    return response.data
  }

  const addBookmarkMutation = useMutation(addBookmark, {
    onSuccess: () => {
      setFavorite(true)
      setImageSource(trueBk)
      alert('즐겨찾기에 추가되었습니다')
      queryClient.invalidateQueries('bookmarks')
    },
    onError: (error: any) => {
      console.error(error)
      alert(error.response?.data?.message || '문제가 발생하였습니다')
    },
  })

  const deleteBookmarkMutation = useMutation(deleteBookmark, {
    onSuccess: () => {
      setFavorite(false)
      setImageSource(falseBk)
      alert('즐겨찾기에서 삭제되었습니다')
      queryClient.invalidateQueries('bookmarks')
    },
    onError: (error: any) => {
      // console.error(error)
      // alert(error.response?.data?.message || '문제가 발생하였습니다')
      setFavorite(false)
      setImageSource(falseBk)
      alert('즐겨찾기에서 삭제되었습니다')
      queryClient.invalidateQueries('bookmarks')
    },
  })

  const handleClick = () => {
    if (favorite) {
      deleteBookmarkMutation.mutate()
    } else {
      addBookmarkMutation.mutate()
    }
  }

  useEffect(() => {
    if (favorite) {
      setImageSource(trueBk)
    } else {
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
