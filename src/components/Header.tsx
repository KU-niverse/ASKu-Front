/* prettier-ignore */

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { track } from '@amplitude/analytics-browser'
import styles from './Header.module.css'
import logo from '../img/logo.png'
import searchIconBlack from '../img/search_icon_black.svg'
import searchIconRed from '../img/search_icon_red.svg'
import searchIconGray from '../img/search_icon_gray.png'
import hamburger from '../img/hamburger.svg'
import bookmark from '../img/bookmark_grey.svg'
import mypage from '../img/mypage_btn.png'
import mobilemypage from '../img/mobile_mypage.png'
import mobilelogout from '../img/mobile_logout.png'
import mobiledebate from '../img/mobile_debate.png'
import mobilebookmark from '../img/mobile_bookmark.png'
import mobilehistory from '../img/mobile_history.png'
import randomDocs from '../img/random.svg'
import all_document from '../img/all_document.svg'
import recent_debate from '../img/recent_debate.svg'
import random_document from '../img/random_document.svg'
import arrow_down from '../img/arrow_down.svg'

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

interface RandomDocResponse {
  title: string
}

// 유저 정보 useQuery 훅: 사용자 정보를 서버에서 가져와 캐싱합니다.
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
      enabled: !!sessionStorage.getItem('user'), // sessionStorage에 유저 정보가 있을 때만 실행
    },
  )
}

// 랜덤 문서 useQuery 훅: 랜덤 문서를 서버에서 가져와 캐싱합니다.
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
      enabled: false, // 기본적으로 비활성화 상태에서 필요시 호출됨
      retry: false,
      onError: (error) => {
        console.error('랜덤 문서 가져오기 에러:', error)
      },
    },
  )
}

// Header 컴포넌트: 네비게이션 바와 검색, 로그인 상태 등을 관리하는 UI 컴포넌트
function Header({ userInfo, setUserInfo }: any) {
  // 컴포넌트의 상태 관리 (로그인 상태, 검색어, 닉네임, 모바일 헤더 상태 등)
  const [inputValue, setInputValue] = useState('') // 검색어 입력값
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 여부
  const [navContainerRightWidth, setNavContainerRightWidth] = useState('150px') // 네비게이션 바 우측 너비
  const [navContainerRightMargin, setNavContainerRightMargin] = useState('100px') // 네비게이션 바 우측 마진
  const [nicknameText, setNicknameText] = useState('') // 유저 닉네임
  const [isAlarmVisible, setIsAlarmVisible] = useState(false) // 알람 창 표시 여부
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false) // 모바일 헤더 열림 상태
  const default_height = '60px' // 기본 모바일 헤더 높이
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(default_height) // 모바일 헤더 높이
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false) // 모바일 검색창 열림 상태
  const [loadingMypage, setLoadingMypage] = useState(true) // 마이페이지 로딩 상태
  const [ismainpage, setIsMainPage] = useState(false) // 현재 페이지가 메인 페이지인지 여부
  const [buttonTextVisible, setButtonTextVisible] = useState(true) // 버튼 텍스트 표시 여부
  const [buttonDisplay, setButtonDisplay] = useState('inline-flex') // 버튼 디스플레이 속성

  // React Router 훅: 페이지 이동 및 현재 경로 확인
  const Nav = useNavigate()
  const location = useLocation()

  const { data: userData, isFetching: isLoadingUser } = useUserInfo()
  const { data: randomDoc, refetch: refetchRandomDoc } = useRandomDoc()

  // 로그아웃 함수: 로그인 상태를 해제하고 초기화
  const logOut = () => {
    setIsLoggedIn(false)
  }

  // 컴포넌트 마운트 시 로그인 상태 확인
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

  // 로그인 상태에 따른 UI 변경 (네비게이션 바 너비와 마진)
  useEffect(() => {
    setNavContainerRightWidth(isLoggedIn ? '250px' : '150px')
    setNavContainerRightMargin(isLoggedIn ? '50px' : '100px')
  }, [isLoggedIn])

  // 유저 데이터에 따른 닉네임 설정
  useEffect(() => {
    if (isLoggedIn && userData && Array.isArray(userData.data) && userData.data.length > 0) {
      const fetchedUserInfo = userData.data[0]
      if (typeof setUserInfo === 'function') {
        setUserInfo(fetchedUserInfo)
      } else {
        console.error('setUserInfo is not a function')
      }
      if (fetchedUserInfo.nickname) {
        setNicknameText(fetchedUserInfo.nickname)
      }
      setLoadingMypage(false)
    }
  }, [isLoggedIn, setUserInfo, userData])

  // 현재 경로에 따라 메인 페이지 여부 설정
  useEffect(() => {
    setIsMainPage(location.pathname === '/')
  }, [location])

  // 화면 크기에 따른 버튼 표시 여부 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setButtonTextVisible(false)
      } else {
        setButtonTextVisible(true)
      }
      if (!ismainpage && window.innerWidth <= 950) {
        setButtonDisplay('none')
      } else {
        setButtonDisplay('inline-flex')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 로그아웃 함수: 서버에서 로그아웃 요청 후 상태 초기화
  const signOut = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/signout`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        alert(result.data.message)
        logOut()
        setNicknameText('')
        window.location.href = '/'
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  // 모바일 검색창 열림 상태 관리
  const handleMobileSearch = () => {
    setMobileHeaderOpen(false)
    if (mobileSearchOpen) {
      setMobileSearchOpen(false)
      setMobileHeaderHeight(default_height)
    } else {
      setMobileSearchOpen(true)
      setMobileHeaderHeight('100px')
    }
  }

  // 모바일 메뉴 열림 상태 관리
  const handleMobileMenu = () => {
    console.log('현재 mobileHeaderOpen 상태:', mobileHeaderOpen)

    setMobileSearchOpen(false)
    if (mobileHeaderOpen) {
      setMobileHeaderOpen(false)
      setMobileHeaderHeight(default_height)
    } else {
      setMobileHeaderOpen(true)
      setMobileHeaderHeight('350px')
    }
  }

  // 윈도우 크기에 따른 알람 표시와 헤더 상태 초기화
  const handleWindowResize = () => {
    setIsAlarmVisible(false)
    if (window.innerWidth > 767) {
      setMobileHeaderOpen(false)
      setMobileSearchOpen(false)
      setMobileHeaderHeight(default_height)
    }
  }

  // 랜덤 문서 클릭 시 해당 문서로 이동
  const handleRandomDocClick = async () => {
    track('click_header_navi', { type: '셔플' })
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/wiki/random`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        window.location.href = `/wiki/${encodeURIComponent(response.data.title)}`
      }
    } catch (error) {
      console.error('Error fetching random document:', error)
    }
  }

  // 모바일 마이페이지 버튼 클릭 처리
  const handleClickMobileMypage = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다')
      Nav('/signin')
      return
    }
    Nav('/mypage')
  }

  // 모바일 즐겨찾기 버튼 클릭 처리
  const handleClickMobileBookmark = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다')
      Nav('/signin')
      return
    }
    track('click_header_navi', { type: '즐겨찾는 문서' })
    Nav('/mybookmark')
  }

  return (
    // 전체 헤더 컨테이너 (모바일 헤더 높이 상태에 따라 스타일이 동적으로 적용됨)
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        {/* 데스크탑용 로고 영역 */}
        <div className={styles.logoContainer}>
          <Link to={'/'}>
            <img src={logo} alt={'logo'} className={styles.logo} />
          </Link>
        </div>

        {/* 검색 입력 필드 */}
        <div className={styles.inputcontainer}>
          <img
            role={'presentation'}
            src={inputValue.trim() ? searchIconRed : searchIconBlack} // inputValue가 있으면 searchIconRed, 없으면 searchIconBlack
            alt={'icon'}
            className={styles.searchIcon}
            onClick={() => {
              if (inputValue.trim() !== '') {
                Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}/${encodeURIComponent(`search`)}`)
                setInputValue('')
              }
            }}
          />
          <input
            className={styles.headerInput}
            placeholder={'어떤 정보를 찾으시나요?'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (inputValue.trim() !== '') {
                  window.location.href = `/result/${encodeURIComponent(inputValue)}/${encodeURIComponent(`search`)}`
                  setInputValue('')
                }
              }
            }}
          />
        </div>

        {/* 왼쪽 네비게이션 버튼 영역 (최근 변경, 최근 토론, 랜덤 문서 등) */}
        <div className={styles.navContainer_threeItem}>
          {/* Home 버튼 (화면 크기 및 메인 페이지 여부에 따라 버튼 표시 여부 조정) */}

          <Link to={'/'}>
            <div
              className={styles.navHome}
              style={{
                display: !ismainpage && window.innerWidth <= 950 ? 'none' : 'inline-flex',
                color: location.pathname === '/' ? 'black' : '#979797',
              }}
            >
              Home
            </div>
          </Link>

          {/* 문서  */}
          <Link to="/allhistory">
            <div
              className={styles.navDocs}
              style={{
                display: !ismainpage && window.innerWidth <= 950 ? 'none' : 'inline-flex',
                color: location.pathname.startsWith('/wiki/morequestion')
                  ? '#979797' // /wiki/morequestion로 시작하는 경로는 모두 회색
                  : location.pathname.startsWith('/wiki') || location.pathname === '/allhistory'
                    ? 'black' // /wiki로 시작하는 다른 경로는 검정색
                    : '#979797', // 그 외 경로는 회색
              }}
            >
              문서
            </div>
          </Link>
          {/* 토론 */}

          <Link to="/latestdebate">
            <div
              className={styles.navDebate}
              style={{
                display: !ismainpage && window.innerWidth <= 950 ? 'none' : 'inline-flex',
                color:
                  location.pathname.startsWith('/debate') || location.pathname === '/latestdebate'
                    ? 'black'
                    : '#979797',
              }}
            >
              토론
            </div>
          </Link>
        </div>

        <div className={styles.navContainer_right}>
          {isLoggedIn ? (
            loadingMypage ? (
              <div />
            ) : (
              <div className={styles.nicknameContainer}>
                <div className={styles.nickname_badge}>
                  <img src={userInfo.rep_badge_image} alt={'rep_badge'} className={styles.repBadge} />
                </div>
                <div className={styles.nickname}>
                  <div className={styles.nicknameText}>{nicknameText}</div>
                  <div className={styles.honorific}> 님</div>
                  <img src={arrow_down} alt={'arrow_down'} className={styles.arrowDown} />
                </div>

                {/* 호버 시 나타나는 메뉴 */}
                <div className={styles.dropdownMenu}>
                  <button type="button" onClick={() => Nav('/mypage')} className={styles.menuItem}>
                    마이페이지
                  </button>
                  <button type="button" onClick={() => Nav('/mybookmark')} className={styles.menuItem}>
                    관심목록
                  </button>
                  <button type="button" onClick={signOut} className={styles.menuItem}>
                    로그아웃
                  </button>
                </div>
              </div>

              // <Link to={'/mypage'}>
              //   <div className={styles.mypageWrap}>
              //     <p className={styles.nicknameText}>
              //       {nicknameText}
              //       {' 님'}
              //     </p>
              //     <img src={mypage} alt={'mypage'} className={styles.mypageBtn} />
              //     {userInfo && userInfo.rep_badge_image && (
              //       <img src={userInfo.rep_badge_image} alt={'rep_badge'} className={styles.repBadge} />
              //     )}
              //   </div>
              // </Link>
            )
          ) : (
            <div className={styles.signContainer}>
              <button type={'button'} className={styles.registerBtn}>
                <a href={'https://www.koreapas.com/m/member_join_new.php'}>{'간편회원가입'} </a>
              </button>

              <Link to={'/signin'}>
                <button type={'button'} className={styles.loginBtn}>
                  {'로그인'}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* 여기부터 모바일? */}

        <div className={styles.mobileHeader}>
          <div className={styles.mobilelogoContainer}>
            <Link to={'/'}>
              <img src={logo} alt={'logo'} className={styles.logo} />
            </Link>
          </div>
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
            {/* <img
              role={'presentation'}
              src={searchIconGray}
              alt={'search_icon_gray'}
              id={styles.mobileHeaderSearch}
              className={styles.mobileButton}
              onClick={handleMobileSearch}
            /> */}
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
                <button type={'button'} onClick={handleClickMobileMypage} className={styles.mobileMenuBtn}>
                  <div className={styles.mobileHamburgerMenu}>
                    <img src={mobilemypage} alt={''} className={styles.mobileIcon} />
                    <p className={styles.mobileMenuText}>{'마이페이지'}</p>
                  </div>
                </button>
                <button type={'button'} className={styles.mobileMenuBtn} onClick={handleClickMobileBookmark}>
                  <div className={styles.mobileHamburgerMenu}>
                    <img src={mobilebookmark} alt={''} id={styles.mobileBookmark} className={styles.mobileIcon} />
                    <p className={styles.mobileMenuText}>{'즐겨찾기'}</p>
                  </div>
                </button>
                <Link
                  to={'/allhistory'}
                  className={styles.mobileMenuBtn}
                  onClick={() => {
                    track('click_header_navi', { type: '최근 변경' })
                  }}
                >
                  <div className={styles.mobileHamburgerMenu}>
                    <img src={mobilehistory} alt={''} className={styles.mobileIcon} />
                    <p className={styles.mobileMenuText}>{'최근변경'}</p>
                  </div>
                </Link>
                <Link
                  to={'/latestdebate'}
                  className={styles.mobileMenuBtn}
                  onClick={() => {
                    track('click_header_navi', { type: '토론' })
                  }}
                >
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
                        Nav(
                          `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}/${encodeURIComponent(`search`)}`,
                        )
                        setInputValue('')
                      }
                    }
                  }}
                />
                <img
                  role={'presentation'}
                  src={searchIconBlack}
                  alt={'icon'}
                  className={styles.mobileSearchIcon}
                  onClick={() => {
                    if (inputValue.trim() !== '') {
                      Nav(
                        `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}/${encodeURIComponent(`search`)}`,
                      )
                      setInputValue('')
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
