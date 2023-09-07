import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ChatbotMobile from './components/ChatbotMobile';
import MyPage from './pages/MyPage';
import WikiEdit from './pages/WikiEdit';
import WikiAllEdit from './pages/WikiAllEdit';
import QuestionEdit from './pages/QuestionEdit';
import WikiCreate from './pages/WikiCreate';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SignupComplete from './pages/SignupComplete';
import WikiViewer from './pages/Wikiviewer';
import MyQuestion from './pages/MyQuestion';
import MyBadge from './pages/MyBadge';
import History from './pages/History';
import HistoryDiff from './pages/HistoryDiff';
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
import ResetPw from './pages/ResetPw';
import AllHistory from './pages/AllHistory';
import WikiRawPrev from './pages/WikiRawPrev';
import MobileChatBotPage from './pages/MobileChatbotPage';
import { useState } from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result/:title" element={<SearchResult />} />
                <Route path="/chatbot" element={<MobileChatBotPage />} />
                <Route path="/wiki/:title" element={<WikiViewer />} />
                <Route path="/wikiedit/:title/all" element={<WikiAllEdit />} />
                <Route path="/wikiedit/:main/:section" element={<WikiEdit />} />
                <Route path="/question/edit/:main" element={<QuestionEdit />} />
                <Route
                  path="/wikiedit/:id"
                  element={
                    <WikiEdit/>
                  }
                />
                <Route path="/newwiki" element={<WikiCreate />} />
                <Route path="/allhistory" element={<AllHistory/>} />
                <Route path='/wiki/preview/:title/:ver' element={<WikiRawPrev/>} />
                <Route path="/history/:title" element={<History />} />
                <Route path="/history/:title/diff/:ver" element={<HistoryDiff />} />


                <Route path="/signin" element={<Signin loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route path="/signup" element={<Signup loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route path="/signup/complete/:auth" element={<SignupComplete />} />
                <Route path="/findid" element={<FindId />} />
                <Route path="/findoutid" element={<FindoutId />} />
                <Route path="/findpw" element={<FindPassword />} />
                <Route path="/changeinfo" element={<ChangeInfo />} />
                <Route path="/changepw" element={<ChangePw />} />
                <Route path="/reset/pw/:auth" element={<ResetPw />} />
                <Route path="/mypage" element={<MyPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>

                <Route path="/chatbot" element={<MobileChatBotPage />} />
                <Route path="/mybookmark" element={<MyBookmark />} />
                <Route path="/mypage/myquestion" element={<MyQuestion/>} />
                <Route path="/mypage/mybadge" element={<MyBadge/>}/>
                <Route path="/wiki/morequestion/:title" element={<MoreQuestion/>}/>
                <Route path="/wiki/qna" element={<QnA/>}/>
                <Route path="/Test" element={<Test/>}/>
                <Route path="/mypage/mycomment" element={<MyComment/>}/>
                <Route path="/debate/:title/:subject/" element={<Debate/>}/>
                <Route path="/debate/:title" element={<MoreDebate/>}/>
                <Route path="/latestdebate" element={<LatestDebate/>}/>
                <Route path="/wiki/morequestion/:title/:id" element={<QnA/>}/>

            </Routes>
        </Router>
    );
}

export default App;