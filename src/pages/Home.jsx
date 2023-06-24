import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import styles from './Home.module.css';

function Home() {
    return (
        <div className="pageWrap">
            <Header />
            <div className={`${styles.homeWrap}`}>

            </div>
            <Footer />
        </div>
    )
}

export default Home;