import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import BookmarkBox from '../components/BookmarkBox'
import Header from '../components/Header'
import styles from './MyBookmark.module.css'

import Footer from '../components/Footer'

interface MyBookmarkProps {
  loggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

const MyBookmark = ({ loggedIn, setLoggedIn }: MyBookmarkProps) => {
  const [lists, setLists] = useState([])
  const [bookCount, setBookCount] = useState(0)
  const nav = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  // yconsole.log(from)

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
        // alert("로그인이 필요한 서비스 입니다.");
        nav(from)
      }
      alert('에러가 발생하였습니다')
      nav(from)
    }
  }
  useEffect(() => {
    checkLoginStatus()
  }, [])

  const getBookmarks = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/favorite`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        setLists(result.data.message)
        setBookCount(result.data.message.length)
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    getBookmarks()
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{'즐겨찾기 한 문서'}</h3>
          <div className={styles.texts}>
            <span>{'문서'}</span>
            <div className={styles.number}>{bookCount}</div>
          </div>
        </div>
        <div>
          {lists.map((item) => {
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
