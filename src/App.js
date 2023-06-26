import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
<<<<<<< HEAD
import ChatbotMobile from './components/ChatbotMobile';
=======
import MyPage from './pages/MyPage';
>>>>>>> ad72e56dd868c983331ae94ae802d760df8cf953
import WikiEdit from './pages/WikiEdit';
import WikiCreate from './pages/WikiCreate';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import WikiViewer from './pages/Wikiviewer';
import MyQuestion from './pages/MyQuestion';


function App() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<ChatbotMobile />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/wikiviewer" element={<WikiViewer />} />
                <Route path="/wikiedit" element={<WikiEdit />} />
                <Route path="/newwiki" element={<WikiCreate />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/completed" element={<SignupComplete />} />
                <Route path="/myquestion" element={<MyQuestion/>} />
            </Routes>
        </Router>
    );
}

export default App;