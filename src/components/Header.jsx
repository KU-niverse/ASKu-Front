import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import logo from '../img/logo.png';
import searchIcon from '../img/search_icon.png';
import searchIconGray from '../img/search_icon_gray.png';
import hamburger from '../img/hamburger.png';
import alarm from '../img/bell.png';
import bookmark from '../img/bookmark_grey.png';
import mypage from '../img/mypage_btn.png';
import mobilemypage from '../img/mobile_mypage.png';
import mobilealarm from '../img/mobile_alarm.png';
import mobilelogout from '../img/mobile_logout.png';
import mobiledebate from '../img/mobile_debate.png';
import mobilebookmark from '../img/mobile_bookmark.png';
import mobilehistory from '../img/mobile_history.png';
import AlarmModal from './AlarmModal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpinnerMypage from './SpinnerMypage';

function Header() {
    const [inputValue, setInputValue] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [navContainerRightWidth, setNavContainerRightWidth] = useState('150px');
    const [navContainerRightMargin, setNavContainerRightMargin] = useState('100px');
    const [nicknameText, setNicknameText] = useState('');
    const [isAlarmVisible, setIsAlarmVisible] = useState(false);
    const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false);
    const [mobileHeaderHeight, setMobileHeaderHeight] = useState('60px');
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [loadingMypage, setLoadingMypage] = useState(true);

    const Nav = useNavigate();

    const logOut = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("https://asku.wiki/api/user/auth/issignedin", {
                    withCredentials: true
                });
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
        setNavContainerRightWidth(isLoggedIn ? '250px' : '150px');
        setNavContainerRightMargin(isLoggedIn ? '50px' : '100px');
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("https://asku.wiki/api/user/mypage/info", {
                    withCredentials: true
                });

                if (response.status===201) {
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
            const result = await axios.get(`https://asku.wiki/api/user/auth/signout`, {
                withCredentials: true
            });
            if (result.status === 200) {
                alert(result.data.message);
                Nav('/');
                logOut();
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
            setMobileHeaderHeight('60px');
        } else {
            setMobileSearchOpen(true);
            setMobileHeaderHeight('100px');
        }
    };

    const handleMobileMenu = () => {
        setMobileSearchOpen(false);
        if (mobileHeaderOpen) {
            setMobileHeaderOpen(false);
            setMobileHeaderHeight('60px');
        } else {
            setMobileHeaderOpen(true);
            setMobileHeaderHeight('320px');
        }
    };

    const handleAlarm = () => {
        setIsAlarmVisible(!isAlarmVisible);
    };

    const handleWindowResize = () => {
        if (window.innerWidth > 767) {
            setMobileHeaderOpen(false);
            setMobileSearchOpen(false);
            setMobileHeaderHeight('60px');
        }
    };

    return (
        <div className={styles.container} style={{ height: mobileHeaderHeight }}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <Link to='/'>
                        <img src={logo} alt='logo' className={styles.logo} />
                    </Link>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.navContainer_left}>
                        <Link to='/allhistory'>
                            <button className={styles.headerButton}>최근 변경</button>
                        </Link>
                        <Link to='/latestdebate'>
                            <button className={styles.headerButton}>토론</button>
                        </Link>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.headerInput}
                            placeholder='검색어를 입력하세요.'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (inputValue.trim() !== '') {
                                        Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`);
                                        setInputValue('');
                                    }
                                }
                            }} />
                        <img
                            src={searchIcon}
                            alt='icon'
                            className={styles.searchIcon}
                            onClick={() => {
                                if (inputValue.trim() !== '') {
                                    Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`);
                                    setInputValue('');
                                }
                            }} />
                        <AlarmModal isAlarmVisible={isAlarmVisible} handleAlarm={handleAlarm} />
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
                                    src={bookmark}
                                    alt='bookmark_gray'
                                    className={styles.signinButton}
                                    onClick={() => Nav('/mybookmark')} />
                                <img
                                    src={alarm}
                                    alt='alarm'
                                    className={styles.signinButton}
                                    onClick={handleAlarm} />
                                <button
                                    className={styles.headerButton}
                                    onClick={signOut}
                                >로그아웃</button>
                                {loadingMypage ? (
                                    <div></div>
                                ) : (
                                <Link to='/mypage'>
                                    <div className={styles.mypageWrap}>
                                        <p className={styles.nicknameText}>{nicknameText.data[0].nickname} 님</p>
                                        <img src={mypage} alt='mypage' className={styles.mypageBtn} />
                                    </div>
                                </Link>
                                )}
                            </>
                           
                        ) : (
                            <>
                                <Link to='/signup'>
                                    <button className={styles.headerButton}>회원가입</button>
                                </Link>
                                <Link to='/signin'>
                                    <button className={styles.headerButton}>로그인</button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className={styles.mobileHeader}>
                        <div className={styles.buttonWrap}>
                            <img src={searchIconGray} alt='search_icon_gray' className={styles.mobileButton} onClick={handleMobileSearch} />
                            {isLoggedIn ? (
                            <img src={hamburger} alt='hamburger' className={styles.mobileButton} onClick={handleMobileMenu} />
                            ) : (
                                <Link className={styles.loginbtn} to='/signin'>
                                    <button className={styles.loginbtn}>로그인</button>
                                </Link>
                            )}
                        </div>
                        {mobileHeaderOpen && (
                            <div className={styles.mobileMenuWrap}>
                                    <div className={styles.mobileHamburger}>
                                        <Link to='/mypage' className={styles.mobileMenuBtn}>
                                            <div className={styles.mobileHamburgerMenu}>
                                                <img src={mobilemypage} alt="" className={styles.mobileIcon} />
                                                <p className={styles.mobileMenuText}>마이페이지</p>
                                            </div>
                                        </Link>
                                        <Link to='/mybookmark' className={styles.mobileMenuBtn}>
                                            <div className={styles.mobileHamburgerMenu}>
                                                <img src={mobilebookmark} alt="" id={styles.mobileBookmark} className={styles.mobileIcon} />
                                                <p className={styles.mobileMenuText}>즐겨찾기</p>
                                            </div>
                                        </Link>
                                        <Link className={styles.mobileMenuBtn}>
                                            <div className={styles.mobileHamburgerMenu}>
                                                <img src={mobilealarm} alt=""  className={styles.mobileIcon} />
                                                <p className={styles.mobileMenuText}>알림</p>
                                            </div>
                                        </Link>
                                        <Link to='/history' className={styles.mobileMenuBtn}>
                                            <div className={styles.mobileHamburgerMenu}>
                                                <img src={mobilehistory} alt="" className={styles.mobileIcon}  />
                                                <p className={styles.mobileMenuText}>최근변경</p>
                                            </div>
                                        </Link>
                                        <Link to='/latestdebate' className={styles.mobileMenuBtn}>
                                            <div className={styles.mobileHamburgerMenu}>
                                                <img src={mobiledebate} alt=""  className={styles.mobileIcon} />
                                                <p className={styles.mobileMenuText}>토론</p>
                                            </div>
                                        </Link>
                                        <Link to='/latestdebate' className={styles.mobileMenuBtn} onClick={signOut}>
                                            <div className={styles.mobileHamburgerMenu}>
                                                <img src={mobilelogout} alt="" className={styles.mobileIcon}  />
                                                <p className={styles.mobileMenuText}>로그아웃</p>
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                        )}
                        {mobileSearchOpen && (
                            <div className={styles.mobileSearchWrap}>
                                <div className={styles.mobileInputContainer}>
                                    <input
                                        className={styles.mobileHeaderInput}
                                        placeholder='검색어를 입력하세요.'
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (inputValue.trim() !== '') {
                                                    Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`);
                                                    setInputValue('');
                                                }
                                            }
                                        }} />
                                    <img
                                        src={searchIcon}
                                        alt='icon'
                                        className={styles.mobileSearchIcon}
                                        onClick={() => {
                                            if (inputValue.trim() !== '') {
                                                Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`);
                                                setInputValue('');
                                            }
                                        }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header;
