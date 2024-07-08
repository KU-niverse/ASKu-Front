import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../img/logo.png'
import searchIcon from '../img/search_icon.svg'
import searchIconGray from '../img/search_icon_gray.png'
import hamburger from '../img/hamburger.png'
import alarm from '../img/bell.png'
import bookmark from '../img/bookmark_grey.png'
import mypage from '../img/mypage_btn.png'
import mobilemypage from '../img/mobile_mypage.png'
import mobilealarm from '../img/mobile_alarm.png'
import mobilelogout from '../img/mobile_logout.png'
import mobiledebate from '../img/mobile_debate.png'
import mobilebookmark from '../img/mobile_bookmark.png'
import mobilehistory from '../img/mobile_history.png'
import AlarmModal from './AlarmModal'
import AlarmMobileModal from './AlarmMobileModal'
import randomDocs from '../img/random.svg'

interface UserData {
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

interface MypageDataResponse {
  success: boolean
  message: string
  data: UserData[]
}

// 유저 정보 useQuery
function useUserInfo() {
  return useQuery<MypageDataResponse, AxiosError>(
    'userInfo',
    async () => {
      const response = await axios.get<MypageDataResponse>(`${process.env.REACT_APP_HOST}/user/mypage/info`, {
        withCredentials: true,
      })
      return response.data
    },
    {
      retry: false,
      onError: (error) => {
        console.error('사용자 정보 가져오기 에러:', error)
      },
      // 유저 정보는 로그인 여부에 따라 가져와야 하므로 enabled 옵션 추가
      enabled: !!sessionStorage.getItem('user'),
    },
  )
}
// 랜덤 문서 useQuery
interface RandomDocResponse {
  title: string
}

function useRandomDoc() {
  return useQuery<RandomDocResponse, Error>(
    'randomDoc',
    async () => {
      const response = await axios.get<RandomDocResponse>(`${process.env.REACT_APP_HOST}/wiki/random`, {
        withCredentials: true,
      })
      return response.data
    },
    {
      enabled: false, // 처음에는 실행되지 않도록 설정
      retry: false,
      onError: (error) => {
        console.error('랜덤 문서 가져오기 에러:', error)
      },
    },
  )
}

function Header({ userInfo, setUserInfo }: any) {
  const [inputValue, setInputValue] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [navContainerRightWidth, setNavContainerRightWidth] = useState('150px')
  const [navContainerRightMargin, setNavContainerRightMargin] = useState('100px')
  const [nicknameText, setNicknameText] = useState('')
  const [isAlarmVisible, setIsAlarmVisible] = useState(false)
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false)
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState('60px')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [loadingMypage, setLoadingMypage] = useState(true)
  const [mobileAlarmModalOpen, setMobileAlarmModalOpen] = useState(false)

  const Nav = useNavigate()

  const { data: userData, isFetching: isLoadingUser } = useUserInfo()
  const { data: randomDoc, refetch: refetchRandomDoc } = useRandomDoc()

  const logOut = () => {
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, {
          withCredentials: true,
        })
        if (res.status === 201 && res.data.success === true) {
          setIsLoggedIn(true)
        } else if (res.status === 401) {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error(error)
        setIsLoggedIn(false)
      }
    }
    checkLoginStatus()
  }, [])

  useEffect(() => {
    setNavContainerRightWidth(isLoggedIn ? '250px' : '150px')
    setNavContainerRightMargin(isLoggedIn ? '50px' : '100px')
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn && userData) {
      const fetchedUserInfo = userData.data[0]
      if (typeof setUserInfo === 'function') {
        setUserInfo(fetchedUserInfo)
      } else {
        console.error('setUserInfo is not a function')
      }
      if (fetchedUserInfo.nickname) {
        setNicknameText(fetchedUserInfo.nickname)
      }
    }
  }, [isLoggedIn, setUserInfo, userData])

  const signOut = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/signout`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        alert(result.data.message)
        Nav('/')
        logOut()
        setNicknameText('')
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  const handleMobileSearch = () => {
    setMobileHeaderOpen(false)
    if (mobileSearchOpen) {
      setMobileSearchOpen(false)
      setMobileHeaderHeight('60px')
    } else {
      setMobileSearchOpen(true)
      setMobileHeaderHeight('100px')
    }
  }

  const handleMobileMenu = () => {
    setMobileSearchOpen(false)
    if (mobileHeaderOpen) {
      setMobileHeaderOpen(false)
      setMobileHeaderHeight('60px')
    } else {
      setMobileHeaderOpen(true)
      setMobileHeaderHeight('350px')
    }
  }

  const handleAlarm = () => {
    setIsAlarmVisible(!isAlarmVisible)
  }

  const handleWindowResize = () => {
    setIsAlarmVisible(false)
    if (window.innerWidth > 767) {
      setMobileHeaderOpen(false)
      setMobileSearchOpen(false)
      setMobileHeaderHeight('60px')
    }
  }

  const handleMobileAlarmModal = () => {
    setMobileAlarmModalOpen(!mobileAlarmModalOpen)
  }

  const handleRandomDocClick = async () => {
    refetchRandomDoc()
    if (randomDoc?.title) {
      window.location.href = `/wiki/${encodeURIComponent(randomDoc.title)}`
    }
  }

  return (
    <div className={styles.container} style={{ height: mobileHeaderHeight }}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to={'/'}>
            <img src={logo} alt={'logo'} className={styles.logo} />
          </Link>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.navContainer_left}>
            <Link to={'/allhistory'}>
              <button type={'button'} className={styles.headerButton}>
                {'최근 변경'}
              </button>
            </Link>
            <Link to={'/latestdebate'}>
              <button type={'button'} className={styles.headerButton}>
                {'토론'}
              </button>
            </Link>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.headerInput}
              placeholder={'검색어를 입력하세요.'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault() // 기본 동작 방지 (폼 제출 등)
                  if (inputValue.trim() !== '') {
                    window.location.href = `/result/${encodeURIComponent(inputValue)}` // 페이지 이동
                    setInputValue('')
                  }
                }
              }}
            />
            <img
              role={'presentation'}
              src={searchIcon}
              alt={'icon'}
              className={styles.searchIcon}
              onClick={() => {
                if (inputValue.trim() !== '') {
                  Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`)
                  setInputValue('')
                }
              }}
            />
            <AlarmModal isAlarmVisible={isAlarmVisible} handleAlarm={handleAlarm} isLoggedIn={isLoggedIn} />
          </div>
          <div
            className={styles.navContainer_right}
            style={{
              width: navContainerRightWidth,
              marginRight: navContainerRightMargin,
            }}
          >
            {isLoggedIn ? (
              <>
                <img
                  role={'presentation'}
                  src={randomDocs}
                  alt={'randomDocs'}
                  className={styles.signinButton}
                  onClick={handleRandomDocClick}
                />
                <img
                  role={'presentation'}
                  src={bookmark}
                  alt={'bookmark_gray'}
                  className={styles.signinButton}
                  onClick={() => Nav('/mybookmark')}
                />
                <img
                  role={'presentation'}
                  src={alarm}
                  alt={'alarm'}
                  id={styles.temporaryAlarm}
                  className={styles.signinButton}
                  onClick={handleAlarm}
                />
                <button type={'button'} className={styles.headerButton} onClick={signOut}>
                  {'로그아웃\r'}
                </button>
                {loadingMypage ? (
                  <div />
                ) : (
                  <Link to={'/mypage'}>
                    <div className={styles.mypageWrap}>
                      <p className={styles.nicknameText}>
                        {nicknameText}
                        {' 님'}
                      </p>
                      <img src={mypage} alt={'mypage'} className={styles.mypageBtn} />
                      {userInfo && userInfo.length > 0 && userInfo[0].rep_badge_image && (
                        <img src={userInfo[0].rep_badge_image} alt={'rep_badge'} className={styles.repBadge} />
                      )}
                    </div>
                  </Link>
                )}
              </>
            ) : (
              <>
                <img
                  role={'presentation'}
                  src={randomDocs}
                  alt={'randomDocs'}
                  className={styles.randomDocs}
                  onClick={handleRandomDocClick}
                />
                <a href={'https://www.koreapas.com/m/member_join_new.php'}>
                  <button type={'button'} className={styles.headerButton}>
                    {'회원가입'}
                  </button>
                </a>
                <Link to={'/signin'}>
                  <button type={'button'} className={styles.headerButton}>
                    {'로그인'}
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className={styles.mobileHeader}>
            <div className={styles.buttonWrap}>
              {isLoggedIn ? (
                <div />
              ) : (
                <Link className={styles.loginbtn} to={'/signin'}>
                  <button type={'button'} className={styles.loginbtn}>
                    {'로그인'}
                  </button>
                </Link>
              )}
              <img
                role={'presentation'}
                src={searchIconGray}
                alt={'search_icon_gray'}
                id={styles.mobileHeaderSearch}
                className={styles.mobileButton}
                onClick={handleMobileSearch}
              />
              <img
                role={'presentation'}
                src={hamburger}
                alt={'hamburger'}
                className={styles.mobileButton}
                onClick={handleMobileMenu}
              />
            </div>
            {mobileHeaderOpen && (
              <div className={styles.mobileMenuWrap}>
                <div className={styles.mobileHamburger}>
                  <Link to={'/mypage'} className={styles.mobileMenuBtn}>
                    <div className={styles.mobileHamburgerMenu}>
                      <img src={mobilemypage} alt={''} className={styles.mobileIcon} />
                      <p className={styles.mobileMenuText}>{'마이페이지'}</p>
                    </div>
                  </Link>
                  <Link to={'/mybookmark'} className={styles.mobileMenuBtn}>
                    <div className={styles.mobileHamburgerMenu}>
                      <img src={mobilebookmark} alt={''} id={styles.mobileBookmark} className={styles.mobileIcon} />
                      <p className={styles.mobileMenuText}>{'즐겨찾기'}</p>
                    </div>
                  </Link>
                  <button
                    type={'button'}
                    id={styles.temporaryMobileAlarm}
                    className={styles.mobileMenuBtn}
                    onClick={handleMobileAlarmModal}
                  >
                    <div className={styles.mobileHamburgerMenu}>
                      <img src={mobilealarm} alt={''} className={styles.mobileIcon} />
                      <p className={styles.mobileMenuText}>{'알림'}</p>
                    </div>
                  </button>
                  <Link to={'/allhistory'} className={styles.mobileMenuBtn}>
                    <div className={styles.mobileHamburgerMenu}>
                      <img src={mobilehistory} alt={''} className={styles.mobileIcon} />
                      <p className={styles.mobileMenuText}>{'최근변경'}</p>
                    </div>
                  </Link>
                  <Link to={'/latestdebate'} className={styles.mobileMenuBtn}>
                    <div className={styles.mobileHamburgerMenu}>
                      <img src={mobiledebate} alt={''} className={styles.mobileIcon} />
                      <p className={styles.mobileMenuText}>{'토론'}</p>
                    </div>
                  </Link>
                  <button type={'button'} className={styles.mobileMenuBtn} onClick={handleRandomDocClick}>
                    <div className={styles.mobileHamburgerMenu}>
                      <img src={randomDocs} alt={''} className={styles.mobileIcon} />
                      <p className={styles.mobileMenuText}>{'랜덤 문서'}</p>
                    </div>
                  </button>
                  {isLoggedIn ? (
                    <button type={'button'} className={styles.mobileMenuBtn} onClick={signOut}>
                      <div className={styles.mobileHamburgerMenu}>
                        <img src={mobilelogout} alt={''} className={styles.mobileIcon} />
                        <p className={styles.mobileMenuText}>{'로그아웃'}</p>
                      </div>
                    </button>
                  ) : (
                    <Link to={'/signin'} className={styles.mobileMenuBtn}>
                      <div className={styles.mobileHamburgerMenu}>
                        <img src={mobilelogout} alt={''} className={styles.mobileIcon} />
                        <p className={styles.mobileMenuText}>{'로그인'}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
            {mobileSearchOpen && (
              <div className={styles.mobileSearchWrap}>
                <div className={styles.mobileInputContainer}>
                  <input
                    className={styles.mobileHeaderInput}
                    placeholder={'검색어를 입력하세요.'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (inputValue.trim() !== '') {
                          Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`)
                          setInputValue('')
                        }
                      }
                    }}
                  />
                  <img
                    role={'presentation'}
                    src={searchIcon}
                    alt={'icon'}
                    className={styles.mobileSearchIcon}
                    onClick={() => {
                      if (inputValue.trim() !== '') {
                        Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`)
                        setInputValue('')
                      }
                    }}
                  />
                </div>
              </div>
            )}
            {mobileAlarmModalOpen && (
              <AlarmMobileModal isOpen={mobileAlarmModalOpen} handleMobileAlarmModal={handleMobileAlarmModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
