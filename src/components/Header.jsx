import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.headerContainer}`}>
                <div>
                <Link to=''>
                    <button>최근 변경</button>
                </Link>
                <Link to=''>
                    <button>토론</button>
                </Link>
                </div>
                <div>
                <Link to=''>
                    <button>회원가입</button>
                </Link>
                <Link to=''>
                    <button>로그인</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;