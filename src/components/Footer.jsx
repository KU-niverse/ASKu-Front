import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logoGray from '../img/logo_gray.png';
function Footer() {
    const handleOpenNewTab = () => {
        const url = 'https://www.instagram.com/localhost:8080/'; // 열고자 하는 URL 주소
        window.open(url, '_blank'); // 새 탭으로 URL 열기
    };
    return(
            <div className={`${styles.footer}`}>
                <div className={`${styles.textWrap}`}>
                    <div className={`${styles.linkContainer}`}>
                        <div className={`${styles.linkGroup}`}>
                            <button className={`${styles.footerTitle}`}>고객 센터</button>
                            <Link>
                                <button className={`${styles.footerButton}`}>1:1 문의</button>
                            </Link>
                            <Link>
                                <button className={`${styles.footerButton}`}>FAQ</button>
                            </Link>
                        </div>
                        <div className={`${styles.linkGroup}`}>
                            <button className={`${styles.footerTitle}`}>서비스</button>
                            <Link>
                                <button className={`${styles.footerButton}`}>이용약관</button>
                            </Link>
                            <Link to='https://034179.notion.site/9ccf1d40d79e47ce8bb78e83d780c052' target="_blank">
                                <button className={`${styles.footerButton}`}>개인정보처리방침</button>
                            </Link>
                        </div>
                        <div className={`${styles.linkGroup}`}>
                            <button className={`${styles.footerTitle}`}>K-Universe</button>
                            <Link>
                                <button className={`${styles.footerButton}`}>팀 소개</button>
                            </Link>
                            <Link>
                                <button onClick={handleOpenNewTab} className={`${styles.footerButton}`}>인스타그램</button>
                            </Link>
                        </div>
                        <div className={`${styles.logoWrap}`}>
                            <img src={logoGray} alt='logo_gray' className={`${styles.logoGray}`} />
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Footer;