import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ChatbotMobile from './components/ChatbotMobile';
import MyPage from './pages/MyPage';
import WikiEdit from './pages/WikiEdit';
import WikiCreate from './pages/WikiCreate';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import WikiViewer from './pages/Wikiviewer';
import MyQuestion from './pages/MyQuestion';
import MyBadge from './pages/MyBadge';
import History from './pages/History';
import HistoryDiff from './pages/HistoryDiff';
import AllHistory from './pages/AllHistory';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import FindoutId from './pages/FindoutId';
import ChangePw from './pages/ChangePw';
import ChangeInfo from './pages/ChangeInfo';
import CheckPw from './pages/CheckPw';
import MoreQuestion from './pages/MoreQuestion';
import QuestionEdit from './pages/QuestionEdit';
import Test from './pages/Test';
import MyComment from './pages/MyComment';

function App() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<ChatbotMobile />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/wikiviewer" element={<WikiViewer />} />
                <Route path="/wikiedit" element={<WikiEdit />} />
                <Route path="/wikiedit/:id" element={<WikiEdit/>}/>
                <Route path="/newwiki" element={<WikiCreate />} />
                <Route path="/question/edit" element={<QuestionEdit />}/>
                <Route path="/allhistory" element={<AllHistory />} />
                <Route path="/history" element={<History />} />
                <Route path="/history/diff" element={<HistoryDiff />} />



                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/completed" element={<SignupComplete />} />
                <Route path="/findid" element={<FindId />} />
                <Route path="/findoutid" element={<FindoutId />} />
                <Route path="/findpw" element={<FindPassword />} />
                <Route path="/changepw" element={<ChangePw />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/checkpw" element={<CheckPw />} />
                <Route path="/changeinfo" element={<ChangeInfo />} />

                <Route path="/chatbot" element={<ChatbotMobile />} />
                <Route path="/mypage/myquestion" element={<MyQuestion/>} />
                <Route path="/mypage/mybadge" element={<MyBadge/>}/>
                <Route path="/wikiviewer/morequestion" element={<MoreQuestion/>}/>
                <Route path="/Test" element={<Test/>}/>
                <Route path="/mypage/mycomment" element={<MyComment/>}/>

            </Routes>
        </Router>
    );
}

export default App;