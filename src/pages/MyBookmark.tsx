import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import BookmarkBox from '../components/BookmarkBox'
import Header from '../components/Header'
import styles from './MyBookmark.module.css'
import Footer from '../components/Footer'
import SpinnerMypage from '../components/SpinnerMypage'
import Paging from '../components/Paging'
import CautionIcon from '../img/DebateCautionIcon.svg'

interface UserInfo {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
  nickname: string
  created_at: Date
  point: number
  is_admin: boolean
  is_authorized: boolean
  restrict_period: number | null
  restrict_count: number
  rep_badge_name: string
  rep_badge_image: string
}

interface MyBookmarkProps {
  loggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

const MyBookmark = ({ loggedIn, setLoggedIn }: MyBookmarkProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [page, setPage] = useState<number>(1)
  const nav = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const perPage = 8
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/auth/issignedin`, { withCredentials: true })
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
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  if (error) {
    return <div>{'Error loading bookmarks'}</div>
  }

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.content}>
        <div className={styles.bookmarkContents}>
          <div className={styles.header}>
            <p className={styles.text}>{'나의 관심 목록'}&nbsp;</p>
            <div className={styles.number}>({lists.length})</div>
          </div>
          {lists?.length === 0 ? (
            <div className={styles.caution}>
              <img src={CautionIcon} alt={'삭제'} className={styles.cautionIcon} />
              <p className={styles.none}>{'아직 관심 목록이'}</p>
              <p className={styles.none}>{'없습니다.'}</p>
            </div>
          ) : (
            lists.slice(startIndex, endIndex).map((item: any) => (
              <div key={item.title}>
                <BookmarkBox
                  title={item.title}
                  content={item.recent_filtered_content}
                  is_favorite
                  result={false}
                  version={item.latest_ver}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className={lists?.length === 0 ? styles.hidden : styles.pagingContainer}>
        <Paging total={lists.length} perPage={perPage} activePage={page} onChange={handlePageChange} />
      </div>
      <Footer />
    </div>
  )
}

export default MyBookmark
