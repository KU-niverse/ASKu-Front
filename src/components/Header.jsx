import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../img/logo.png';
import searchIcon from '../img/search_icon.png';
import searchIconGray from '../img/search_icon_gray.png';
import hamburger from '../img/hamburger.png';

function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt='logo' className={styles.logo} />
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.navContainer}>
                        <Link to=''>
                            <button className={styles.headerButton}>최근 변경</button>
                        </Link>
                        <Link to=''>
                            <button className={styles.headerButton}>토론</button>
                        </Link>
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.headerInput} placeholder=' 검색어를 입력하세요.' />
                        <img src={searchIcon} alt='icon' className={styles.searchIcon} />
                    </div>
                    <div className={styles.navContainer}>
                        <Link to=''>
                            <button className={styles.headerButton}>회원가입</button>
                        </Link>
                        <Link to=''>
                            <button className={styles.headerButton}>로그인</button>
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