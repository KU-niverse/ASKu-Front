import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ChatbotMobile from './components/ChatbotMobile';
import MyPage from './pages/MyPage';
import WikiEdit from './pages/WikiEdit';
import QuestionEdit from './pages/QuestionEdit';
import WikiCreate from './pages/WikiCreate';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import WikiViewer from './pages/Wikiviewer';
import MyQuestion from './pages/MyQuestion';
import MyBadge from './pages/MyBadge';
import History from './pages/History';
import MoreQuestion from './pages/MoreQuestion';
import Test from './pages/Test';
import MyComment from './pages/MyComment';
import MyBookmark from './pages/MyBookmark';
import SearchResult from './pages/SearchResult';
import QnA from './pages/QnA';
import Debate from './pages/Debate'
import MoreDebate from './pages/MoreDebate';
import LatestDebate from './pages/LatestDebate';
import FindId from './pages/FindId';
import FindoutId from './pages/FindoutId';
import FindPassword from './pages/FindPassword';
import ChangeInfo from './pages/ChangeInfo';
import ChangePw from './pages/ChangePw';
import HistoryDiff from './pages/HistoryDiff';

function App() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<SearchResult />} />
                <Route path="/chatbot" element={<ChatbotMobile />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/wiki/:title" element={<WikiViewer />} />
                <Route path="/wikiedit" element={<WikiEdit />} />
                <Route path="/questionedit" element={<QuestionEdit />} />
                <Route
                  path="/wikiedit/:id"
                  element={
                    <WikiEdit/>
                  }
                />
                <Route path="/newwiki" element={<WikiCreate />} />
                <Route path="/history" element={<History />} />
                <Route path="/history/diff" element={<HistoryDiff />} />



                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/complete/:auth" element={<SignupComplete />} />
                <Route path="/findid" element={<FindId />} />
                <Route path="/findoutid" element={<FindoutId />} />
                <Route path="/findpw" element={<FindPassword />} />
                <Route path="/changeinfo" element={<ChangeInfo />} />
                <Route path="/changepw/:auth" element={<ChangePw />} />
                <Route path="/mypage" element={<MyPage />} />

                <Route path="/chatbot" element={<ChatbotMobile />} />
                <Route path="/mybookmark" element={<MyBookmark />} />
                <Route path="/mypage/myquestion" element={<MyQuestion/>} />
                <Route path="/mypage/mybadge" element={<MyBadge/>}/>
                <Route path="/wikiviewer/morequestion/:title" element={<MoreQuestion/>}/>
                <Route path="/wikiviewer/qna" element={<QnA/>}/>
                <Route path="/Test" element={<Test/>}/>
                <Route path="/mypage/mycomment" element={<MyComment/>}/>
                <Route path="/debate" element={<Debate/>}/>
                <Route path="/moredebate" element={<MoreDebate/>}/>
                <Route path="/latestdebate" element={<LatestDebate/>}/>

            </Routes>
        </Router>
    );
}

export default App;