import { Link } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';

function Header() {
    const [inputValue, setInputValue] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [navContainerRightWidth, setNavContainerRightWidth] = useState('150px');
    const [navContainerRightMargin, setNavContainerRightMargin] = useState('100px');
    const [nicknameText, setNicknameText] = useState('');
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
                    setNicknameText(response.data.message.nickname);
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

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <Link to='/'>
                        <img src={logo} alt='logo' className={styles.logo} />
                    </Link>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.navContainer_left}>
                        <Link to='/history'>
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
                                        window.location.href = `/result/${inputValue}`;
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
                                    window.location.href = `/result/${inputValue}`;
                                    setInputValue('');
                                }
                            }} />
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
                                <img src={alarm} alt='alarm' className={styles.signinButton} />
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
                    <div className={styles.buttonWrap}>
                        <img src={searchIconGray} alt='search_icon_gray' className={styles.mobileButton} />
                        <img src={hamburger} alt='hamburger' className={styles.mobileButton} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;