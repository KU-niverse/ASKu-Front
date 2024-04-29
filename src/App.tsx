import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-expect-error TS(6142): Module './pages/Home' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import Home from "./pages/Home";
// @ts-expect-error TS(6142): Module './components/ChatbotMobile' was resolved t... Remove this comment to see the full error message
import ChatbotMobile from "./components/ChatbotMobile";
// @ts-expect-error TS(6142): Module './pages/MyPage' was resolved to 'C:/Users/... Remove this comment to see the full error message
import MyPage from "./pages/MyPage";
// @ts-expect-error TS(6142): Module './pages/WikiEdit' was resolved to 'C:/User... Remove this comment to see the full error message
import WikiEdit from "./pages/WikiEdit";
// @ts-expect-error TS(6142): Module './pages/WikiAllEdit' was resolved to 'C:/U... Remove this comment to see the full error message
import WikiAllEdit from "./pages/WikiAllEdit";
// @ts-expect-error TS(6142): Module './pages/QuestionEdit' was resolved to 'C:/... Remove this comment to see the full error message
import QuestionEdit from "./pages/QuestionEdit";
// @ts-expect-error TS(6142): Module './pages/WikiCreate' was resolved to 'C:/Us... Remove this comment to see the full error message
import WikiCreate from "./pages/WikiCreate";
// @ts-expect-error TS(6142): Module './pages/Signin' was resolved to 'C:/Users/... Remove this comment to see the full error message
import Signin from "./pages/Signin";
// @ts-expect-error TS(6142): Module './pages/Signup' was resolved to 'C:/Users/... Remove this comment to see the full error message
import Signup from "./pages/Signup";
// @ts-expect-error TS(6142): Module './pages/SignupComplete' was resolved to 'C... Remove this comment to see the full error message
import SignupComplete from "./pages/SignupComplete";
// @ts-expect-error TS(6142): Module './pages/Wikiviewer' was resolved to 'C:/Us... Remove this comment to see the full error message
import WikiViewer from "./pages/Wikiviewer";
// @ts-expect-error TS(6142): Module './pages/MyQuestion' was resolved to 'C:/Us... Remove this comment to see the full error message
import MyQuestion from "./pages/MyQuestion";
// @ts-expect-error TS(6142): Module './pages/MyBadge' was resolved to 'C:/Users... Remove this comment to see the full error message
import MyBadge from "./pages/MyBadge";
// @ts-expect-error TS(6142): Module './pages/History' was resolved to 'C:/Users... Remove this comment to see the full error message
import History from "./pages/History";
// @ts-expect-error TS(6142): Module './pages/HistoryDiff' was resolved to 'C:/U... Remove this comment to see the full error message
import HistoryDiff from "./pages/HistoryDiff";
// @ts-expect-error TS(6142): Module './pages/MoreQuestion' was resolved to 'C:/... Remove this comment to see the full error message
import MoreQuestion from "./pages/MoreQuestion";
// @ts-expect-error TS(6142): Module './pages/Test' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import Test from "./pages/Test";
// @ts-expect-error TS(6142): Module './pages/MyComment' was resolved to 'C:/Use... Remove this comment to see the full error message
import MyComment from "./pages/MyComment";
// @ts-expect-error TS(6142): Module './pages/MyBookmark' was resolved to 'C:/Us... Remove this comment to see the full error message
import MyBookmark from "./pages/MyBookmark";
// @ts-expect-error TS(6142): Module './pages/SearchResult' was resolved to 'C:/... Remove this comment to see the full error message
import SearchResult from "./pages/SearchResult";
// @ts-expect-error TS(6142): Module './pages/QnA' was resolved to 'C:/Users/Use... Remove this comment to see the full error message
import QnA from "./pages/QnA";
// @ts-expect-error TS(6142): Module './pages/Debate' was resolved to 'C:/Users/... Remove this comment to see the full error message
import Debate from "./pages/Debate";
// @ts-expect-error TS(6142): Module './pages/MoreDebate' was resolved to 'C:/Us... Remove this comment to see the full error message
import MoreDebate from "./pages/MoreDebate";
// @ts-expect-error TS(6142): Module './pages/LatestDebate' was resolved to 'C:/... Remove this comment to see the full error message
import LatestDebate from "./pages/LatestDebate";
// @ts-expect-error TS(6142): Module './pages/FindId' was resolved to 'C:/Users/... Remove this comment to see the full error message
import FindId from "./pages/FindId";
// @ts-expect-error TS(6142): Module './pages/FindoutId' was resolved to 'C:/Use... Remove this comment to see the full error message
import FindoutId from "./pages/FindoutId";
// @ts-expect-error TS(6142): Module './pages/FindPassword' was resolved to 'C:/... Remove this comment to see the full error message
import FindPassword from "./pages/FindPassword";
// @ts-expect-error TS(6142): Module './pages/ChangeInfo' was resolved to 'C:/Us... Remove this comment to see the full error message
import ChangeInfo from "./pages/ChangeInfo";
// @ts-expect-error TS(6142): Module './pages/ChangePw' was resolved to 'C:/User... Remove this comment to see the full error message
import ChangePw from "./pages/ChangePw";
// @ts-expect-error TS(6142): Module './pages/ResetPw' was resolved to 'C:/Users... Remove this comment to see the full error message
import ResetPw from "./pages/ResetPw";
// @ts-expect-error TS(6142): Module './pages/AllHistory' was resolved to 'C:/Us... Remove this comment to see the full error message
import AllHistory from "./pages/AllHistory";
// @ts-expect-error TS(6142): Module './pages/WikiRawPrev' was resolved to 'C:/U... Remove this comment to see the full error message
import WikiRawPrev from "./pages/WikiRawPrev";
// @ts-expect-error TS(6142): Module './pages/MobileChatbotPage' was resolved to... Remove this comment to see the full error message
import MobileChatBotPage from "./pages/MobileChatbotPage";
import { useState, useEffect } from "react";
// @ts-expect-error TS(6142): Module './pages/Oauth' was resolved to 'C:/Users/U... Remove this comment to see the full error message
import Oauth from "./pages/Oauth";
import RouteChangeTracker from "./RouteChangeTracker";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 뒤로 가기 버튼 클릭 시 새로고침하는 이벤트 핸들러 설정
    window.onpopstate = function (event) {
      window.location.reload();
    };

    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 제거 (cleanup)
      window.onpopstate = null;
    };
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Router>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RouteChangeTracker /> {/* RouteChangeTracker 호출 */}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Routes>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/" element={<Home />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/result/:title" element={<SearchResult />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/chatbot" element={<MobileChatBotPage />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/wiki/:title"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<WikiViewer loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/wikiedit/:title/all"
          element={
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <WikiAllEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          }
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/wikiedit/:main/:section"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<WikiEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/question/edit/:main"
          element={
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <QuestionEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          }
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/wikiedit/:id" element={<WikiEdit />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/newwiki"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<WikiCreate loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/allhistory" element={<AllHistory />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/wiki/preview/:title/:ver" element={<WikiRawPrev />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/history/:title" element={<History />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/history/:title/diff/:ver" element={<HistoryDiff />} />

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/signin"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<Signin loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/signup"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<Signup loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/signup/complete/:auth" element={<SignupComplete />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/findid" element={<FindId />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/findoutid" element={<FindoutId />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/findpw" element={<FindPassword />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/changeinfo" element={<ChangeInfo />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/changepw" element={<ChangePw />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/resetpw/:auth" element={<ResetPw />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/mypage"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<MyPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/chatbot" element={<MobileChatBotPage />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/mybookmark"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<MyBookmark loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/mypage/myquestion" element={<MyQuestion />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/mypage/mybadge" element={<MyBadge />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/wiki/morequestion/:title" element={<MoreQuestion />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/wiki/qna" element={<QnA />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/Test" element={<Test />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/mypage/mycomment" element={<MyComment />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/debate/:title/:subject/" element={<Debate />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/debate/:title" element={<MoreDebate />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/latestdebate" element={<LatestDebate />} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route
          path="/wiki/morequestion/:title/:question_id"
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          element={<QnA />}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Route path="/oauth-kopas/:uuid" element={<Oauth />} />
      </Routes>
    </Router>
  );
}

export default App;
