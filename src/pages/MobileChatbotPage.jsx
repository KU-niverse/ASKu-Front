// import styles from './MobileChatBotPage.module.css';
import Header from '../components/Header';
import ChatbotMobile from '../components/ChatbotMobile';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MobileChatBotPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkLoginStatus = async () => {
        try {
            const res = await axios.get("http://localhost:8080
/user/auth/issignedin", { withCredentials: true });
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
    useEffect(() => {
        checkLoginStatus();
    }, []);
    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <ChatbotMobile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </>
    );
}

export default MobileChatBotPage;