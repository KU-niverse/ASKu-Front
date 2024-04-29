import React, { useState, useEffect } from "react";
// @ts-expect-error TS(2307): Cannot find module './Header.module.css' or its co... Remove this comment to see the full error message
import styles from "./Header.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/logo.png' or its corres... Remove this comment to see the full error message
import logo from "../img/logo.png";
// @ts-expect-error TS(2307): Cannot find module '../img/search_icon.svg' or its... Remove this comment to see the full error message
import searchIcon from "../img/search_icon.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/search_icon_gray.png' o... Remove this comment to see the full error message
import searchIconGray from "../img/search_icon_gray.png";
// @ts-expect-error TS(2307): Cannot find module '../img/hamburger.png' or its c... Remove this comment to see the full error message
import hamburger from "../img/hamburger.png";
// @ts-expect-error TS(2307): Cannot find module '../img/bell.png' or its corres... Remove this comment to see the full error message
import alarm from "../img/bell.png";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmark_grey.png' or i... Remove this comment to see the full error message
import bookmark from "../img/bookmark_grey.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mypage_btn.png' or its ... Remove this comment to see the full error message
import mypage from "../img/mypage_btn.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mobile_mypage.png' or i... Remove this comment to see the full error message
import mobilemypage from "../img/mobile_mypage.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mobile_alarm.png' or it... Remove this comment to see the full error message
import mobilealarm from "../img/mobile_alarm.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mobile_logout.png' or i... Remove this comment to see the full error message
import mobilelogout from "../img/mobile_logout.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mobile_debate.png' or i... Remove this comment to see the full error message
import mobiledebate from "../img/mobile_debate.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mobile_bookmark.png' or... Remove this comment to see the full error message
import mobilebookmark from "../img/mobile_bookmark.png";
// @ts-expect-error TS(2307): Cannot find module '../img/mobile_history.png' or ... Remove this comment to see the full error message
import mobilehistory from "../img/mobile_history.png";
// @ts-expect-error TS(6142): Module './AlarmModal' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import AlarmModal from "./AlarmModal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// @ts-expect-error TS(6142): Module './AlarmMobileModal' was resolved to 'C:/Us... Remove this comment to see the full error message
import AlarmMobileModal from "./AlarmMobileModal";
// @ts-expect-error TS(2307): Cannot find module '../img/random.svg' or its corr... Remove this comment to see the full error message
import randomDocs from "../img/random.svg";

function Header({
  userInfo,
  setUserInfo
}: any) {

  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navContainerRightWidth, setNavContainerRightWidth] = useState("150px");
  const [navContainerRightMargin, setNavContainerRightMargin] =
    useState("100px");
  const [nicknameText, setNicknameText] = useState("");
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState("60px");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [loadingMypage, setLoadingMypage] = useState(true);
  const [mobileAlarmModalOpen, setMobileAlarmModalOpen] = useState(false);
  const [randomDoc, setRandomDoc] = useState([]);
  const Nav = useNavigate();

  const logOut = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + "/user/mypage/info",
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          // await setUserInfo(response.data);
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

  const signOut = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  const handleMobileSearch = () => {
    setMobileHeaderOpen(false);
    if (mobileSearchOpen) {
      setMobileSearchOpen(false);
      setMobileHeaderHeight("60px");
    } else {
      setMobileSearchOpen(true);
      setMobileHeaderHeight("100px");
    }
  };

  const handleMobileMenu = () => {
    setMobileSearchOpen(false);
    if (mobileHeaderOpen) {
      setMobileHeaderOpen(false);
      setMobileHeaderHeight("60px");
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
      setMobileHeaderHeight("60px");
    }
  };

  const handleMobileAlarmModal = () => {
    setMobileAlarmModalOpen(!mobileAlarmModalOpen);
  };

  const handleRandomDocClick = async () => {
    try {
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      const response = await axios.get(process.env.REACT_APP_HOST + '/wiki/random', {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href = `/wiki/${encodeURIComponent(response.data.title)}`; // 페이지를 새 URL로 이동 및 새로고침
      }
    } catch (error) {
      console.error('Error fetching random document:', error);
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container} style={{ height: mobileHeaderHeight }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.headerContainer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.logoContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link to="/">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.flexContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.navContainer_left}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Link to="/allhistory">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button className={styles.headerButton}>최근 변경</button>
            </Link>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Link to="/latestdebate">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button className={styles.headerButton}>토론</button>
            </Link>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.inputContainer}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                    )}`; // 페이지 이동
                    setInputValue("");
                  }
                }
              }}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                    )}`
                  );
                  setInputValue("");
                }
              }}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <AlarmModal
              isAlarmVisible={isAlarmVisible}
              handleAlarm={handleAlarm}
              isLoggedIn={isLoggedIn}
            />
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div
            className={styles.navContainer_right}
            style={{
              width: navContainerRightWidth,
              marginRight: navContainerRightMargin,
            }}
          >
            {isLoggedIn ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img
                  src={randomDocs}
                  alt="randomDocs"
                  className={styles.signinButton}
                  onClick={handleRandomDocClick}
                />
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img
                  src={bookmark}
                  alt="bookmark_gray"
                  className={styles.signinButton}
                  onClick={() => Nav("/mybookmark")}
                />
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img
                  src={alarm}
                  alt="alarm"
                  id={styles.temporaryAlarm}
                  className={styles.signinButton}
                  onClick={handleAlarm}
                />
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className={styles.headerButton} onClick={signOut}>
                  로그아웃
                </button>
                {loadingMypage ? (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div></div>
                ) : (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link to="/mypage">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mypageWrap}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.nicknameText}>
                        // @ts-expect-error TS(2339): Property 'data' does not exist on type 'string'.
                        {nicknameText.data[0].nickname} 님
                      </p>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={mypage}
                        alt="mypage"
                        className={styles.mypageBtn}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        // @ts-expect-error TS(2339): Property 'data' does not exist on type 'string'.
                        src={nicknameText.data[0].rep_badge_image}
                        alt="rep_badge"
                        className={styles.repBadge}
                      />
                    </div>
                  </Link>
                )}
              </>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img
                  src={randomDocs}
                  alt="randomDocs"
                  className={styles.randomDocs}
                  onClick={handleRandomDocClick}
                />
                {/* <Link to="/signup">
                  <button className={styles.headerButton}>회원가입</button>
                </Link> */}
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <a href="https://www.koreapas.com/m/member_join_new.php">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.headerButton}>회원가입</button>
                </a>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/signin">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.headerButton}>로그인</button>
                </Link>
              </>
            )}
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.mobileHeader}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.buttonWrap}>
              {isLoggedIn ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <></>
              ) : (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link className={styles.loginbtn} to="/signin">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.loginbtn}>로그인</button>
                </Link>
              )}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img
                src={searchIconGray}
                alt="search_icon_gray"
                id={styles.mobileHeaderSearch}
                className={styles.mobileButton}
                onClick={handleMobileSearch}
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img
                src={hamburger}
                alt="hamburger"
                className={styles.mobileButton}
                onClick={handleMobileMenu}
              />
            </div>
            {mobileHeaderOpen && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.mobileMenuWrap}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.mobileHamburger}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link to="/mypage" className={styles.mobileMenuBtn}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mobileHamburgerMenu}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={mobilemypage}
                        alt=""
                        className={styles.mobileIcon}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.mobileMenuText}>마이페이지</p>
                    </div>
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link to="/mybookmark" className={styles.mobileMenuBtn}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mobileHamburgerMenu}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={mobilebookmark}
                        alt=""
                        id={styles.mobileBookmark}
                        className={styles.mobileIcon}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.mobileMenuText}>즐겨찾기</p>
                    </div>
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link
                    id={styles.temporaryMobileAlarm}
                    className={styles.mobileMenuBtn}
                    onClick={handleMobileAlarmModal}
                  >
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mobileHamburgerMenu}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={mobilealarm}
                        alt=""
                        className={styles.mobileIcon}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.mobileMenuText}>알림</p>
                    </div>
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link to="/allhistory" className={styles.mobileMenuBtn}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mobileHamburgerMenu}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={mobilehistory}
                        alt=""
                        className={styles.mobileIcon}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.mobileMenuText}>최근변경</p>
                    </div>
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link to="/latestdebate" className={styles.mobileMenuBtn}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mobileHamburgerMenu}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={mobiledebate}
                        alt=""
                        className={styles.mobileIcon}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.mobileMenuText}>토론</p>
                    </div>
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className={styles.mobileMenuBtn} onClick={handleRandomDocClick}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.mobileHamburgerMenu}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={randomDocs}
                        alt=""
                        className={styles.mobileIcon}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <p className={styles.mobileMenuText}>랜덤 문서</p>
                    </div>
                  </Link>
                  {isLoggedIn ? (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link className={styles.mobileMenuBtn} onClick={signOut}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className={styles.mobileHamburgerMenu}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <img
                          src={mobilelogout}
                          alt=""
                          className={styles.mobileIcon}
                        />
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <p className={styles.mobileMenuText}>로그아웃</p>
                      </div>
                    </Link>
                  ) : (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link to="/signin" className={styles.mobileMenuBtn}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className={styles.mobileHamburgerMenu}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <img
                          src={mobilelogout}
                          alt=""
                          className={styles.mobileIcon}
                        />
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <p className={styles.mobileMenuText}>로그인</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
            {mobileSearchOpen && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.mobileSearchWrap}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.mobileInputContainer}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                            )}`
                          );
                          setInputValue("");
                        }
                      }
                    }}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                          )}`
                        );
                        setInputValue("");
                      }
                    }}
                  />
                </div>
              </div>
            )}
            {mobileAlarmModalOpen && (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
