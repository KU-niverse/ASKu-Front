import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import styles from "./Header.module.css";
import logo from "../img/logo.png";
import searchIcon from "../img/search_icon.svg";
import searchIconGray from "../img/search_icon_gray.png";
import hamburger from "../img/hamburger.png";
import alarm from "../img/bell.svg";
import bookmark from "../img/bookmark_grey.svg";
import mypage from "../img/mypage_btn.png";
import mobilemypage from "../img/mobile_mypage.png";
import mobilealarm from "../img/mobile_alarm.png";
import mobilelogout from "../img/mobile_logout.png";
import mobiledebate from "../img/mobile_debate.png";
import mobilebookmark from "../img/mobile_bookmark.png";
import mobilehistory from "../img/mobile_history.png";
import AlarmModal from "./AlarmModal";
import axios from "axios";
import AlarmMobileModal from "./AlarmMobileModal";
import randomDocs from "../img/random.svg";
import { track } from "@amplitude/analytics-browser";
import all_document from "../img/all_document.svg"
import recent_debate from "../img/recent_debate.svg"
import random_document from "../img/random_document.svg"

function Header({ userInfo, setUserInfo }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navContainerRightWidth, setNavContainerRightWidth] = useState("150px");
  const [navContainerRightMargin, setNavContainerRightMargin] =
      useState("100px");
  const [nicknameText, setNicknameText] = useState("");
  const [isAlarmVisible, setIsAlarmVisible] = useState();
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false);
  const default_height = '60px'
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(default_height);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [loadingMypage, setLoadingMypage] = useState(true);
  const [mobileAlarmModalOpen, setMobileAlarmModalOpen] = useState(false);
  const [randomDoc, setRandomDoc] = useState([]);
  const Nav = useNavigate();
  const location = useLocation(); // useLocation 추가
  const [ismainpage, setIsMainPage] = useState(false); // ismainpage 상태 변수 추가
  const [buttonTextVisible, setButtonTextVisible] = useState(true); // 상태 추가
  const [buttonDisplay, setButtonDisplay] = useState("inline-flex"); // 버튼 display 상태 추가

  const logOut = () => {
    setIsLoggedIn(false);
  };



  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(
            process.env.REACT_APP_HOST + "/user/auth/issignedin",
            {
              withCredentials: true,
            }
        );
        if (res.status === 201 && res.data.success === true) {
          setIsLoggedIn(true);
        } else if (res.status === 401) {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    setNavContainerRightWidth(isLoggedIn ? "250px" : "150px");
    setNavContainerRightMargin(isLoggedIn ? "50px" : "100px");
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
            process.env.REACT_APP_HOST + "/user/mypage/info",
            {
              withCredentials: true,
            }
        );

        if (response.status === 201) {
          if (userInfo != null) {
            setUserInfo(response.data.data);
          }
          setNicknameText(response.data);
          setLoadingMypage(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingMypage(false);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  // 현재 경로에 따라 ismainpage 상태를 설정하는 useEffect 추가
  useEffect(() => {
    setIsMainPage(location.pathname === "/");
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setButtonTextVisible(false);
      } else {
        setButtonTextVisible(true);
      }
      if (!ismainpage && window.innerWidth <= 950) {
        setButtonDisplay("none");
      } else {
        setButtonDisplay("inline-flex");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 상태 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const signOut = async () => {
    try {
      const result = await axios.get(
          process.env.REACT_APP_HOST + `/user/auth/signout`,
          {
            withCredentials: true,
          }
      );
      if (result.status === 200) {
        alert(result.data.message);
        Nav("/");
        logOut();
        setNicknameText("");
      }
    } catch (error) {
      console.error(error);
      return alert(error.response.data.message);
    }
  };

  const handleMobileSearch = () => {
    setMobileHeaderOpen(false);
    if (mobileSearchOpen) {
      setMobileSearchOpen(false);
      setMobileHeaderHeight(default_height);
    } else {
      setMobileSearchOpen(true);
      setMobileHeaderHeight("100px");
    }
  };

  const handleMobileMenu = () => {
    setMobileSearchOpen(false);
    if (mobileHeaderOpen) {
      setMobileHeaderOpen(false);
      setMobileHeaderHeight(default_height);
    } else {
      setMobileHeaderOpen(true);
      setMobileHeaderHeight("350px");
    }
  };

  const handleAlarm = () => {
    setIsAlarmVisible(!isAlarmVisible);
  };

  const handleWindowResize = () => {
    setIsAlarmVisible(false);
    if (window.innerWidth > 767) {
      setMobileHeaderOpen(false);
      setMobileSearchOpen(false);
      setMobileHeaderHeight(default_height);
    }
  };

  const handleMobileAlarmModal = () => {
    setMobileAlarmModalOpen(!mobileAlarmModalOpen);
  };

  const handleRandomDocClick = async () => {
    track("click_header_navi", { type: "셔플" });
    try {
      const response = await axios.get(
          process.env.REACT_APP_HOST + "/wiki/random",
          {
            withCredentials: true,
          }
      );
      if (response.status === 200) {
        window.location.href = `/wiki/${encodeURIComponent(
            response.data.title
        )}`; // 페이지를 새 URL로 이동 및 새로고침
      }
    } catch (error) {
      console.error("Error fetching random document:", error);
    }
  };

  return (
      <div className={styles.container} style={{ height: mobileHeaderHeight }}>
        <div className={styles.headerContainer}>

          <div className={styles.flexContainer}>
            <div
                className={styles.logoContainer}
                style={{display: ismainpage ? "none" : "flex"}}>
              <Link to="/">
                <img src={logo} alt="logo" className={styles.logo}/>
              </Link>
            </div>
            <div className={styles.navContainer_left}>
              <Link
                  to="/allhistory"
                  onClick={() => {
                    track("click_header_navi", {type: "모든 문서"});
                  }}
              >
                <button className={styles.headerButton}
                        style={{marginRight: ismainpage || buttonTextVisible ? "40px" : "0px", display: !ismainpage && window.innerWidth <= 950 ? "none" : "inline-flex" }}>
                  <img src={all_document} alt="모든 문서" className={styles.icon}/>
                  {ismainpage || buttonTextVisible ? "모든 문서" : ""}
                </button>
              </Link>
              <Link
                  to="/latestdebate"
                  onClick={() => {
                    track("click_header_navi", {type: "최근 토론"});
                  }}
              >
                <button className={styles.headerButton}
                        style={{marginRight: ismainpage || buttonTextVisible ? "40px" : "0px", display: !ismainpage && window.innerWidth <= 950 ? "none" : "inline-flex" }}>
                  <img src={recent_debate} alt="최근 토론" className={styles.icon}/>
                  {ismainpage || buttonTextVisible ? "최근 토론" : ""}
                </button>
              </Link>
              <Link

                  onClick={() => {
                    track("click_header_navi", {type: "랜덤 문서"});
                    handleRandomDocClick();
                  }}
              >
                <button className={styles.headerButton}
                        style={{marginRight: "0px", display: !ismainpage && window.innerWidth <= 950 ? "none" : "inline-flex"}}>
                  <img src={random_document} alt="랜덤 문서" className={styles.icon}/>
                  {ismainpage || buttonTextVisible ? "랜덤 문서" : ""}
                </button>
              </Link>
            </div>


            <div
                className={styles.navContainer_right}
            >
              <div className={styles.inputcontainer}
                   style={{display: ismainpage ? "none" : "flex"}}>
                <input
                    className={styles.headerInput}
                    placeholder="검색어를 입력하세요."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        // 엔터키를 누를 때
                        e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
                        if (inputValue.trim() !== "") {
                          window.location.href = `/result/${encodeURIComponent(
                              inputValue
                          )}/${encodeURIComponent(`search`)}`; // 페이지 이동
                          setInputValue("");
                        }
                      }
                    }}
                />

                <img
                    src={searchIcon}
                    alt="icon"
                    className={styles.searchIcon}
                    onClick={() => {
                      if (inputValue.trim() !== "") {
                        Nav(
                            `/result/${encodeURIComponent(inputValue).replace(
                                /\./g,
                                "%2E"
                            )}/${encodeURIComponent(`search`)}`
                        );
                        setInputValue("");
                      }
                    }}
                />
                <AlarmModal
                    isAlarmVisible={isAlarmVisible}
                    handleAlarm={handleAlarm}
                    isLoggedIn={isLoggedIn}
                />
              </div>
              {isLoggedIn ? (
                  <>
                    {/*
                <img
                  src={randomDocs}
                  alt="randomDocs"
                  className={styles.signinButton}
                  onClick={handleRandomDocClick}
                />
                */}
                    <img
                        src={bookmark}
                        alt="bookmark_gray"
                        className={styles.signinButton}
                        onClick={() => {
                          track("click_header_navi", {type: "즐겨찾는 문서"});
                          Nav("/mybookmark");
                        }}
                    />
                    <img
                        src={alarm}
                        alt="alarm"
                        id={styles.temporaryAlarm}
                        className={styles.signinButton}
                        onClick={handleAlarm}
                    />
                    <button className={styles.headerButton}
                            onClick={signOut}
                            style={{marginRight: "30px"}}>
                      로그아웃
                    </button>
                    {loadingMypage ? (
                        <div></div>
                    ) : (
                        <Link to="/mypage">
                          <div className={styles.mypageWrap}>
                            <p className={styles.nicknameText}>
                              {nicknameText.data[0].nickname} 님
                            </p>
                            <img
                                src={mypage}
                                alt="mypage"
                                className={styles.mypageBtn}
                            />
                            <img
                                src={nicknameText.data[0].rep_badge_image}
                                alt="rep_badge"
                                className={styles.repBadge}
                            />
                          </div>
                        </Link>
                    )}
                  </>
              ) : (
                  <>
                    {/*
                <img
                  src={randomDocs}
                  alt="randomDocs"
                  className={styles.randomDocs}
                  onClick={handleRandomDocClick}
                />
                 <Link to="/signup">
                  <button className={styles.headerButton}>회원가입</button>
                </Link> */}
                    <a href="https://www.koreapas.com/m/member_join_new.php">
                      <button className={styles.headerButton}>회원가입</button>
                    </a>
                    <Link to="/signin">
                      <button className={styles.headerLoginButton}>로그인</button>
                    </Link>
                  </>
              )}
            </div>

            {/*여기부터 모바일?*/}

            <div className={styles.mobileHeader}>
              <div className={styles.buttonWrap}>
                {isLoggedIn ? (
                    <></>
                ) : (
                    <Link className={styles.loginbtn} to="/signin">
                      <button className={styles.loginbtn}>로그인</button>
                    </Link>
                )}
                <img
                    src={searchIconGray}
                    alt="search_icon_gray"
                    id={styles.mobileHeaderSearch}
                    className={styles.mobileButton}
                    onClick={handleMobileSearch}
                />
                <img
                    src={hamburger}
                    alt="hamburger"
                    className={styles.mobileButton}
                    onClick={handleMobileMenu}
                />
              </div>
              {mobileHeaderOpen && (
                  <div className={styles.mobileMenuWrap}>
                    <div className={styles.mobileHamburger}>
                      <Link to="/mypage" className={styles.mobileMenuBtn}>
                        <div className={styles.mobileHamburgerMenu}>
                          <img
                              src={mobilemypage}
                              alt=""
                              className={styles.mobileIcon}
                          />
                          <p className={styles.mobileMenuText}>마이페이지</p>
                        </div>
                      </Link>
                      <Link
                          to="/mybookmark"
                          className={styles.mobileMenuBtn}
                          onClick={() => {
                            track("click_header_navi", {type: "즐겨찾는 문서"});
                          }}
                      >
                        <div className={styles.mobileHamburgerMenu}>
                          <img
                              src={mobilebookmark}
                              alt=""
                              id={styles.mobileBookmark}
                              className={styles.mobileIcon}
                          />
                          <p className={styles.mobileMenuText}>즐겨찾기</p>
                        </div>
                      </Link>
                      <Link
                          id={styles.temporaryMobileAlarm}
                          className={styles.mobileMenuBtn}
                          onClick={handleMobileAlarmModal}
                      >
                        <div className={styles.mobileHamburgerMenu}>
                          <img
                              src={mobilealarm}
                              alt=""
                              className={styles.mobileIcon}
                          />
                          <p className={styles.mobileMenuText}>알림</p>
                        </div>
                      </Link>
                      <Link
                          to="/allhistory"
                          className={styles.mobileMenuBtn}
                          onClick={() => {
                            track("click_header_navi", {type: "최근 변경"});
                          }}
                      >
                        <div className={styles.mobileHamburgerMenu}>
                          <img
                              src={mobilehistory}
                              alt=""
                              className={styles.mobileIcon}
                          />
                          <p className={styles.mobileMenuText}>최근변경</p>
                        </div>
                      </Link>
                      <Link
                          to="/latestdebate"
                          className={styles.mobileMenuBtn}
                          onClick={() => {
                            track("click_header_navi", {type: "토론"});
                          }}
                      >
                        <div className={styles.mobileHamburgerMenu}>
                          <img
                              src={mobiledebate}
                              alt=""
                              className={styles.mobileIcon}
                          />
                          <p className={styles.mobileMenuText}>토론</p>
                        </div>
                      </Link>
                      <Link
                          className={styles.mobileMenuBtn}
                          onClick={handleRandomDocClick}
                      >
                        <div className={styles.mobileHamburgerMenu}>
                          <img
                              src={randomDocs}
                              alt=""
                              className={styles.mobileIcon}
                          />
                          <p className={styles.mobileMenuText}>랜덤 문서</p>
                        </div>
                      </Link>
                      {isLoggedIn ? (
                          <Link className={styles.mobileMenuBtn} onClick={signOut}>
                            <div className={styles.mobileHamburgerMenu}>
                              <img
                                  src={mobilelogout}
                                  alt=""
                                  className={styles.mobileIcon}
                              />
                              <p className={styles.mobileMenuText}>로그아웃</p>
                            </div>
                          </Link>
                      ) : (
                          <Link to="/signin" className={styles.mobileMenuBtn}>
                            <div className={styles.mobileHamburgerMenu}>
                              <img
                                  src={mobilelogout}
                                  alt=""
                                  className={styles.mobileIcon}
                              />
                              <p className={styles.mobileMenuText}>로그인</p>
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
                          placeholder="검색어를 입력하세요."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (inputValue.trim() !== "") {
                                Nav(
                                    `/result/${encodeURIComponent(inputValue).replace(
                                        /\./g,
                                        "%2E"
                                    )}/${encodeURIComponent(`search`)}`
                                );
                                setInputValue("");
                              }
                            }
                          }}
                      />
                      <img
                          src={searchIcon}
                          alt="icon"
                          className={styles.mobileSearchIcon}
                          onClick={() => {
                            if (inputValue.trim() !== "") {
                              Nav(
                                  `/result/${encodeURIComponent(inputValue).replace(
                                      /\./g,
                                      "%2E"
                                  )}/${encodeURIComponent(`search`)}`
                              );
                              setInputValue("");
                            }
                          }}
                      />
                    </div>
                  </div>
              )}
              {mobileAlarmModalOpen && (
                  <AlarmMobileModal
                      isOpen={mobileAlarmModalOpen}
                      handleMobileAlarmModal={handleMobileAlarmModal}
                  />
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;
