import React from "react";
// @ts-expect-error TS(2307): Cannot find module './MyPage.module.css' or its co... Remove this comment to see the full error message
import styles from "./MyPage.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
// @ts-expect-error TS(2307): Cannot find module '../img/haho.png' or its corres... Remove this comment to see the full error message
import haho from "../img/haho.png";
// @ts-expect-error TS(6142): Module '../components/Mypage/CommentList' was reso... Remove this comment to see the full error message
import CommentList from "../components/Mypage/CommentList";
// @ts-expect-error TS(6142): Module '../components/Mypage/QuestionList' was res... Remove this comment to see the full error message
import QuestionList from "../components/Mypage/QuestionList";
// @ts-expect-error TS(6142): Module '../components/Mypage/Contribute' was resol... Remove this comment to see the full error message
import Contribute from "../components/Mypage/Contribute";
// @ts-expect-error TS(6142): Module '../components/Mypage/Graph' was resolved t... Remove this comment to see the full error message
import Graph from "../components/Mypage/Graph";
import { Link } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/Mypage/MyBadge' was resolved... Remove this comment to see the full error message
import MyBadge from "../components/Mypage/MyBadge";
// @ts-expect-error TS(6142): Module '../components/Mypage/MyProfile' was resolv... Remove this comment to see the full error message
import MyProfile from "../components/Mypage/MyProfile";
// @ts-expect-error TS(6142): Module '../components/Mypage/MyInfo' was resolved ... Remove this comment to see the full error message
import MyInfo from "../components/Mypage/MyInfo";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";
// @ts-expect-error TS(6142): Module '../components/Paging' was resolved to 'C:/... Remove this comment to see the full error message
import Paging from "../components/Paging";

function MyPage({
  loggedIn,
  setLoggedIn
}: any) {
  const [loading, setLoading] = useState(true);
  const [myContribute, setMyContribute] = useState([]);
  const [mypageData, setMypageData] = useState([]);
  const [myQuestion, setMyQuestion] = useState([]);
  const [myDebate, setMyDebate] = useState([]);
  const [myBadge, setMyBadge] = useState([]);
  const [myWiki, setMyWiki] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const perPage = 12; // 페이지당 보여줄 컴포넌트 갯수
  const handlePageChange = (pageNumber: any) => {
    setPage(pageNumber); // 페이지 번호 업데이트
  };

  //login status 체크하기
  const Navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + "/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
        return Navigate(from);
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
        return Navigate(from);
      } else {
        alert("에러가 발생하였습니다");
        return Navigate(from);
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  //

  //데이터 불러오기
  useEffect(() => {
    const getData = async (url: any, stateSetter: any) => {
      try {
        const res = await axios.get(url, { withCredentials: true });

        if (res.status === 200 || res.status === 201) {
          // 상태 코드에 따라 데이터 처리
          stateSetter(res.data);
        } else if (res.status === 401) {
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    getData(process.env.REACT_APP_HOST + "/user/mypage/info", setMypageData);
    getData(
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      process.env.REACT_APP_HOST + `/user/mypage/questionhistory/latest`,
      setMyQuestion
    );
    getData(
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      process.env.REACT_APP_HOST + "/user/mypage/debatehistory",
      setMyDebate
    );
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    getData(process.env.REACT_APP_HOST + "/user/mypage/badgehistory", setMyBadge);
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    getData(process.env.REACT_APP_HOST + "/user/mypage/wikihistory", setMyWiki);
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    getData(process.env.REACT_APP_HOST + "/wiki/contributions", setMyContribute);
  }, []);

  //

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SpinnerMypage />
      </div>
    );
  }
  //

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className={styles.mypage}>MYPAGE</p>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={`${styles.mypagecontent}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.uppercontent}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.leftcontent}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.profile}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.profileheader}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className={styles.title}>내 프로필</p>
                {/* <Link to='/changeinfo'className={styles.edit_link} >
                <button className={styles.edit}>수정하기</button>
                </Link> */}
              </div>

              {mypageData &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                mypageData.data &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                myBadge.data &&
                myContribute &&
                // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                myContribute.message && (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MyProfile
                    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                    nick={mypageData.data[0].nickname}
                    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                    point={mypageData.data[0].point}
                    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                    badge={mypageData.data[0].rep_badge_name}
                    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                    badgeimg={mypageData.data[0].rep_badge_image}
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                    percent={myContribute.message.ranking_percentage.toFixed(2)}
                  />
                )}
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.badge}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.badgeheader}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className={styles.title}>뱃지 <span style={{ color: "#9F132E" }}>({myBadge && myBadge.data ? myBadge.data.length : 0})</span></p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/mypage/mybadge" className={styles.b_link}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.edit}> 더보기</button>
                </Link>
              </div>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.badgegrid}>
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                {myBadge && myBadge.data && myBadge.data.length === 0 ? (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p>아직 획득한 뱃지가 없습니다.</p>
                ) : (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <>
                    {myBadge &&
                      // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                      myBadge.data &&
                      // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                      myBadge.data
                        .slice((page - 1) * perPage, page * perPage)
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        .map((badge: any) => <img
                        title={badge.name}
                        key={badge.id}
                        src={badge.image}
                        alt={badge.name}
                        className={styles.badgeImage}
                      />)}
                  </>
                )}
              </div>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.paginationWrapper}>
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                {myBadge.data && myBadge.data.length > perPage && (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Paging
                    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                    total={myBadge.data.length}
                    perPage={perPage}
                    activePage={page}
                    onChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.rightcontent}>
            
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.cb}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className={styles.title2}>기여 목록 <span style={{ color: "#9F132E" }}>({myWiki && myWiki.data ? myWiki.data.length : 0})</span></p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.graph}>
                {myContribute &&
                  // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                  myContribute.message &&
                  // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                  myContribute.message.docs.length === 0 ? (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p></p>
                ) : (
                  myContribute &&
                  // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                  myContribute.message &&
                  // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                  myContribute.message.docs && (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Graph
                      // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                      total_point={myContribute.message.point}
                      // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                      docs={myContribute.message.docs}
                    />
                  )
                )}
              </div>
              // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
              {myWiki && myWiki.message && myWiki.data.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>아직 기여한 내역이 없습니다.</p>
              ) : (
                myWiki &&
                // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                myWiki.message &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                myWiki.data
                  .slice(0, 7)
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  .map((wiki: any) => <Contribute
                  key={wiki.id}
                  user_id={wiki.user_id}
                  doc_id={wiki.doc_id}
                  text_pointer={wiki.textpointer}
                  version={wiki.version}
                  summary={wiki.summary}
                  created_at={wiki.created_at}
                  count={wiki.count}
                  diff={wiki.diff}
                  is_bad={wiki.is_bad}
                  is_rollback={wiki.is_rollback}
                  is_q_based={wiki.is_q_based}
                  title={wiki.title}
                />)
              )}
            </div>
          
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.ask}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.askheader}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className={styles.title}>내가 쓴 질문 <span style={{ color: "#9F132E" }}>({myQuestion && myQuestion.data ? myQuestion.data.length : 0})</span></p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/mypage/myquestion" className={styles.q_link}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.edit}>더보기</button>
                </Link>
              </div>
              {myQuestion &&
                // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                myQuestion.message &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                myQuestion.data.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>아직 작성한 질문이 없습니다.</p>
              ) : (
                myQuestion &&
                // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                myQuestion.message &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                myQuestion.data &&
                // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never[]'.
                myQuestion.data.slice(0, 5).map((question: any) => <QuestionList
                  key={question.id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
                  id={question.id}
                  doc_id={question.doc_id}
                  user_id={question.user_id}
                  index_title={question.index_title}
                  content={question.content}
                  time={question.created_at}
                  is_bad={question.is_bad}
                  nickname={question.nickname}
                  rep_badge={question.rep_badge}
                  badge_image={question.badge_image}
                  like_count={question.like_count}
                  doc_title={question.doc_title}
                  answer_count={question.answer_count}
                />)
              )}
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.comment}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.commentheader}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className={styles.title}>내가 쓴 토론 <span style={{ color: "#9F132E" }}>({myDebate && myDebate.message ? myDebate.message.length : 0})</span></p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/mypage/mycomment" className={styles.c_link}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.edit}>더보기</button>
                </Link>
              </div>
              // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
              {myDebate && myDebate.message && myDebate.message.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>아직 작성한 토론이 없습니다.</p>
              ) : (
                myDebate &&
                // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                myDebate.message &&
                // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never[]... Remove this comment to see the full error message
                myDebate.message
                  .slice(0, 5)
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  .map((debate: any) => <CommentList
                  key={debate.id}
                  id={debate.debate_id}
                  subject={debate.debate_subject}
                  content={debate.debate_content}
                  time={debate.debate_content_time}
                  doc_title={debate.doc_title}
                />)
              )}
            </div>
          </div>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer />
      </div>
    </div>
  );
}

export default MyPage;
