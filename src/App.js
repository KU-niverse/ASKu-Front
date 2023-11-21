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
import { useState, useEffect } from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      const handlePageShow = (event) => {
          if (event.persisted) {
              // bfcache로 페이지가 복원되었을 때 실행해야하는 로직
              // event.persisted가 true인 경우에 새로고침하는 로직
              window.location.reload();
              console.log("새로고침");
          } else {
              // persisted가 true가 아닌 경우는 정상적으로 페이지가 로드된 경우
          }
      };

      // pageshow 이벤트 핸들러 등록
      window.addEventListener('pageshow', handlePageShow);

      return () => {
          // 컴포넌트 언마운트 시 이벤트 핸들러 제거 (cleanup)
          window.removeEventListener('pageshow', handlePageShow);
      };
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result/:title" element={<SearchResult />} />
                <Route path="/chatbot" element={<MobileChatBotPage />} />
                <Route path="/wiki/:title" element={<WikiViewer loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route path="/wikiedit/:title/all" element={<WikiAllEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route path="/wikiedit/:main/:section" element={<WikiEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route path="/question/edit/:main" element={<QuestionEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route
                  path="/wikiedit/:id"
                  element={
                    <WikiEdit/>
                  }
                />
                <Route path="/newwiki" element={<WikiCreate loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
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
                <Route path="/resetpw/:auth" element={<ResetPw />} />
                <Route path="/mypage" element={<MyPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>

                <Route path="/chatbot" element={<MobileChatBotPage />} />
                <Route path="/mybookmark" element={<MyBookmark loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                <Route path="/mypage/myquestion" element={<MyQuestion/>} />
                <Route path="/mypage/mybadge" element={<MyBadge/>}/>
                <Route path="/wiki/morequestion/:title" element={<MoreQuestion/>}/>
                <Route path="/wiki/qna" element={<QnA/>}/>
                <Route path="/Test" element={<Test/>}/>
                <Route path="/mypage/mycomment" element={<MyComment/>}/>
                <Route path="/debate/:title/:subject/" element={<Debate/>}/>
                <Route path="/debate/:title" element={<MoreDebate/>}/>
                <Route path="/latestdebate" element={<LatestDebate/>}/>
                <Route path="/wiki/morequestion/:title/:question_id" element={<QnA/>}/>

            </Routes>
        </Router>
    );
}

export default App;