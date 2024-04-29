import { Link } from 'react-router-dom';
// @ts-expect-error TS(2307): Cannot find module './Footer.module.css' or its co... Remove this comment to see the full error message
import styles from './Footer.module.css';
// @ts-expect-error TS(2307): Cannot find module '../img/logo_gray.png' or its c... Remove this comment to see the full error message
import logoGray from '../img/logo_gray.png';
function Footer() {
    return(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.footer}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={`${styles.textWrap}`}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={`${styles.linkContainer}`}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={`${styles.linkGroup}`}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button className={`${styles.footerTitle}`}>고객 센터</button>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Link to='https://open.kakao.com/o/s74JtHlf' target="_blank">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={`${styles.footerButton}`}>1:1 문의</button>
                            </Link>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Link to='https://034179.notion.site/FAQ-abb7d9dad73947cebd92d866d7f4c5ea?pvs=4' target="_blank">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={`${styles.footerButton}`}>FAQ</button>
                            </Link>
                        </div>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={`${styles.linkGroup}`}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button className={`${styles.footerTitle}`}>서비스</button>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Link to='https://034179.notion.site/e7421f1ad1064d2dbde0777d53766a7d?pvs=4' target="_blank">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={`${styles.footerButton}`}>이용약관</button>
                            </Link>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Link to='https://034179.notion.site/9ccf1d40d79e47ce8bb78e83d780c052' target="_blank">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={`${styles.footerButton}`}>개인정보처리방침</button>
                            </Link>
                        </div>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={`${styles.linkGroup}`}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button className={`${styles.footerTitle}`}>KUniverse</button>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Link to='https://harmonious-authority-301.notion.site/ASKu-9d6da8cb08e640db8f746524c231937e' target='_blank'>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={`${styles.footerButton}`}>팀 소개</button>
                            </Link>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Link to='https://www.instagram.com/asku.wiki/' target='_blank'>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <button className={`${styles.footerButton}`}>인스타그램</button>
                            </Link>
                        </div>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={`${styles.logoWrap}`}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <img src={logoGray} alt='logo_gray' className={`${styles.logoGray}`} />
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Footer;