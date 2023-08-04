import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../img/logo.png';
import searchIcon from '../img/search_icon.png';
import searchIconGray from '../img/search_icon_gray.png';
import hamburger from '../img/hamburger.png';
import alarm from '../img/bell.png';
import bookmark from '../img/bookmark_grey.png';
import mypage from '../img/mypage_btn.png';
import { useState } from 'react';

function Header() {
    const [inputValue, setInputValue] = useState('');
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
                            if (e.key === 'Enter') { // 엔터키를 누를 때
                                e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
                                if (inputValue.trim() !== '') {
                                    window.location.href = `/result/${inputValue}`; // 페이지 이동
                                }
                            }
                        }} />
                        <img
                        src={searchIcon}
                        alt='icon'
                        className={styles.searchIcon}
                        onClick={() => {
                                if (inputValue.trim() !== '') {
                                    window.location.href = `/result/${inputValue}`; // 페이지 이동
                                }
                            }} />
                    </div>
                    <div className={styles.navContainer_right}>
                        {/* <Link to='/signup'>
                            <button className={styles.headerButton}>회원가입</button>
                        </Link>
                        <Link to='/signin'>
                            <button className={styles.headerButton}>로그인</button>
                        </Link> */}
                        <img 
                        src={bookmark}
                        alt='bookmark_gray'
                        className={styles.signinButton}
                        onClick={() => window.location.href = '/mybookmark'} />
                        <img src={alarm} alt='alarm' className={styles.signinButton} />
                        <button className={styles.headerButton}>로그아웃</button>
                        <Link to='/mypage'>
                            <div className={styles.mypageWrap}>
                                <p className={styles.nicknameText}>가나다 님</p>
                                <img src={mypage} alt='mypage' className={styles.mypageBtn} />
                            </div>
                        </Link>
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