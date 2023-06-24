import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import logo from '../img/logo_big.png';
import styles from './Home.module.css';
import searchIcon from '../img/search_icon.png';

function Home() {
    return (
        <div className="pageWrap">
            <Header />
            <div className={styles.homeWrap}>
                <img src={logo} className={styles.logo} alt="logo" />
                <div className={styles.inputContainer}>
                    <input className={styles.searchInput} placeholder='검색어를 입력하세요.' />
                    <img src={searchIcon} alt='icon' className={styles.searchIcon} />
                </div>
                <div className={styles.chatBotContainer}>
                    <div className={styles.chatBot}>

                    </div>
                    <div className={styles.realTime}>
                        <div className={styles.keyWord}>

                        </div>
                        <div className={styles.question}>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;