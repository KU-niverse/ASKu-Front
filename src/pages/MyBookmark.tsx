import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import BookmarkBox from '../components/BookmarkBox'
import Header from '../components/Header'
import styles from './MyBookmark.module.css'
import Footer from '../components/Footer'

interface MyBookmarkProps {
  loggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

const MyBookmark = ({ loggedIn, setLoggedIn }: MyBookmarkProps) => {
  const nav = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
      } else if (res.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav(from)
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response.status === 401) {
        setLoggedIn(false)
        nav(from)
      }
      alert('에러가 발생하였습니다')
      nav(from)
    }
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const fetchBookmarks = async () => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/favorite`, {
      withCredentials: true,
    })
    return response.data.message
  }

  const { data: lists = [], isLoading, error } = useQuery('bookmarks', fetchBookmarks)

  if (isLoading) {
    return <div>{'Loading...'}</div>
  }

  if (error) {
    return <div>{'Error loading bookmarks'}</div>
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{'즐겨찾기 한 문서'}</h3>
          <div className={styles.texts}>
            <span>{'문서'}</span>
            <div className={styles.number}>{lists.length}</div>
          </div>
        </div>
        <div>
          {lists.map((item: any) => {
            return (
              <div key={item.title}>
                <BookmarkBox title={item.title} content={item.recent_filtered_content} is_favorite result={false} />
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyBookmark
