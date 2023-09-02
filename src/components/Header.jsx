import styles from './Header.module.css';
import logo from '../img/logo.png';
import searchIcon from '../img/search_icon.png';
import searchIconGray from '../img/search_icon_gray.png';
import hamburger from '../img/hamburger.png';
import alarm from '../img/bell.png';
import bookmark from '../img/bookmark_grey.png';
import mypage from '../img/mypage_btn.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import mobilemypage from '../img/mobile_mypage.png';
import mobilealarm from '../img/mobile_alarm.png';
import mobilelogout from '../img/mobile_logout.png';
import mobiledebate from '../img/mobile_debate.png';
import mobilebookmark from '../img/mobile_bookmark.png';
import mobilehistory from '../img/mobile_history.png';
import AlarmModal from './AlarmModal';


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

                if (response.data.success) {
                    setNicknameText(response.data[0].nickname);
                }
            } catch (error) {
                console.error(error);
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
            setMobileHeaderHeight('120px');
        }
    };

    const handleMobileMenu = () => {
        setMobileSearchOpen(false);
        if (mobileHeaderOpen) {
            setMobileHeaderOpen(false);
            setMobileHeaderHeight('60px');
        } else {
            setMobileHeaderOpen(true);
            setMobileHeaderHeight('240px');
        }
    }

    const handleAlarm = () => {
        if (isAlarmVisible) {
            setIsAlarmVisible(false);
            console.log(isAlarmVisible);
        } else {
            setIsAlarmVisible(true);
            console.log(isAlarmVisible);
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
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (inputValue.trim() !== '') {
                                        window.location.href = `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`;
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
                                    window.location.href = `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`;
                                    setInputValue('');
                                }
                            }} />
                        <AlarmModal isAlarmVisible={isAlarmVisible} handleAlarm={handleAlarm}/>
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
                                    onClick={() => window.location.href = '/mybookmark'} />
                                <img 
                                    src={alarm}
                                    alt='alarm'
                                    className={styles.signinButton}
                                    onClick={handleAlarm}/>
                                <button
                                className={styles.headerButton}
                                onClick={signOut}
                                >로그아웃</button>
                                <Link to='/mypage'>
                                    <div className={styles.mypageWrap}>
                                        <p className={styles.nicknameText}>{nicknameText} 님</p>
                                        <img src={mypage} alt='mypage' className={styles.mypageBtn} />
                                    </div>
                                </Link>
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
                            <img src={hamburger} alt='hamburger' className={styles.mobileButton} onClick={handleMobileMenu}/>
                        </div>
                        {mobileHeaderOpen && (
                        <div className={styles.mobileMenuWrap}>
                            {(isLoggedIn ? (
                                <div className={styles.mobileHamburger}>
                                    <Link to='/mypage'>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src={mobilemypage} alt="" />
                                            <p className={styles.mobileMenuText}>마이페이지</p>
                                        </div>
                                    </Link>
                                    <Link to='/mybookmark'>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src={mobilebookmark} alt="" />
                                            <p className={styles.mobileMenuText}>즐겨찾기</p>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src={mobilealarm} alt="" />
                                            <p className={styles.mobileMenuText}>알림</p>
                                        </div>
                                    </Link>
                                    <Link to='/history'>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src={mobilehistory} alt="" />
                                            <p className={styles.mobileMenuText}>최근변경</p>
                                        </div>
                                    </Link>
                                    <Link to='/latestdebate'>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src={mobiledebate} alt="" />
                                            <p>토론</p>
                                        </div>
                                    </Link>
                                    <Link to='/latestdebate'>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src={mobilelogout} alt="" />
                                            <p>로그아웃</p>
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className={styles.mobileHamburger}>
                                    <Link>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src="" alt="" />
                                            <p>로그아웃</p>
                                        </div>
                                    </Link>
                                    <Link to='/signup'>
                                        <div className={styles.mobileHamburgerMenu}>
                                            <img src="" alt="" />
                                            <p>회원가입</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        )}
                        {mobileSearchOpen && (
                            <div className={styles.mobileSearchWrap}>
                                <div className={styles.mobileInputContainer}>
                                    <input
                                        className={styles.mobileHeaderInput}
                                        placeholder='검색어를 입력하세요.'
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (inputValue.trim() !== '') {
                                                    window.location.href = `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`;
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
                                                window.location.href = `/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}`;
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
        )
    }

export default Header;