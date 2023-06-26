import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ChatbotMobile from './components/ChatbotMobile';
import WikiEdit from './pages/WikiEdit';
import WikiCreate from './pages/WikiCreate';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import MyPage from './pages/MyPage';

function App() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<ChatbotMobile />} />
                <Route path="/wikiedit" element={<WikiEdit />} />
                <Route path="/newwiki" element={<WikiCreate />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/completed" element={<SignupComplete />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </Router>
    );
}

export default App;