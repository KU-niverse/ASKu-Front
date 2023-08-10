import React from 'react';
import styles from './MyPage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import haho from '../img/haho.png';
import CommentList from '../components/Mypage/CommentList'
import QuestionList from '../components/Mypage/QuestionList'
import Contribute from '../components/Mypage/Contribute';
import Graph from "../components/Mypage/Graph";
import { Link } from 'react-router-dom';
import MyBadge from '../components/Mypage/MyBadge';
import MyProfile from '../components/Mypage/MyProfile';
import MyInfo from '../components/Mypage/MyInfo';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpinnerMypage from '../components/SpinnerMypage';

function MyPage({ loggedIn, setLoggedIn }) {
  const [loading, setLoading] = useState(true);
  const [myContribute, setMyContribute] = useState([]);
  const [mypageData, setMypageData] = useState([]);
  const [myQuestion, setMyQuestion] = useState([]);
  const [myDebate, setMyDebate] = useState([]);
  const [myBadge, setMyBadge] = useState([]);
  const [myWiki, setMyWiki] = useState([]);

  //login status 체크하기
  const Navigate = useNavigate();
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(" http://localhost:8080/user/auth/issignedin", { withCredentials: true });
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
        Navigate('/signin');
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      Navigate('/signin');
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
//


//데이터 불러오기
  useEffect(() => {
    const getData = async (url, stateSetter) => {
      try {
        const res = await axios.get(url, { withCredentials: true });
  
        if (res.status === 200 || res.status === 201) {  // 상태 코드에 따라 데이터 처리
          stateSetter(res.data);
        } else if (res.status === 401) {
          console.log(res.data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    getData('http://localhost:8080/user/mypage/info', setMypageData);
    getData('http://localhost:8080/user/mypage/questionhistory', setMyQuestion);
    getData('http://localhost:8080/user/mypage/debatehistory', setMyDebate);
    getData('http://localhost:8080/user/mypage/badgehistory', setMyBadge);
    getData('http://localhost:8080/user/mypage/wikihistory', setMyWiki);
    getData('http://localhost:8080/wiki/contributions', setMyContribute);
  }, []);

  console.log(myBadge)
  console.log(myContribute)
  console.log(mypageData)
  console.log(myDebate)
  console.log(myQuestion)
  console.log(myWiki)

  console.log(myContribute);
  console.log(myContribute.message);


  //


// 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return <div><SpinnerMypage/></div>; 
  }
//


  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>
      <div className={styles.header}>
        <p className={styles.mypage}>MYPAGE</p>
      </div>
      <div className={`${styles.mypagecontent}`}>
        <div className={styles.uppercontent}>
          <div className={styles.leftcontent}>
            <div className={styles.profile}>
              <div className={styles.profileheader}> 
                <p className={styles.title}>내 프로필</p>
                <Link to='/changeinfo'className={styles.edit_link} >
                <button className={styles.edit}>수정하기</button>
                </Link>

              </div>

              {mypageData && mypageData.message && myContribute &&myContribute.message && (
                <MyProfile
                  nick={mypageData.message.nickname}
                  point={mypageData.message.point}
                  badge={mypageData.message.rep_badge}
                  percent={myContribute.message.ranking_percentage}
                />
              )}
            
            </div>                
            <div className={styles.badge}>
              <div className={styles.badgeheader}> 
                <p className={styles.title}>뱃지</p>
                <Link to='/mypage/mybadge'className={styles.b_link} >
                <button className={styles.edit}> 더보기</button>
                </Link>
              </div>


              <div className={styles.badgegrid}>
                {myBadge && myBadge.message &&myBadge.message.length === 0 ? (
                <p>아직 획득한 뱃지가 없습니다.</p>
                ) : (
                  myBadge && myBadge.message && myBadge.message.map((badge) => (
                    <img key={badge.id} src={badge.badge_id} alt='haho'/>
                  ))
                )}
              </div>
            </div>
          </div>
        
          <div className={styles.rightcontent}>
            <div className={styles.info}>
              <div className={styles.infoheader}>
                <p className={styles.title}>내 정보</p>
              </div>
              {mypageData && mypageData.message && (
                <MyInfo
                  name={mypageData.message.name}
                  email={mypageData.message.email}
                  stu_id={mypageData.message.stu_id}
                />
              )}
              <div className={styles.infoedit}>
                  <Link to='/changepw/:auth' >
                  <button className={styles.edit2}>비밀번호 변경</button>
                  </Link>
                  <Link to='/changeinfo' >
                  <button className={styles.edit3}>개인정보 변경</button>
                  </Link>
              </div>
            </div>
            <div className={styles.cb}>
              <p className={styles.title}>기여 목록</p>
              <div className={styles.graph}>
              {myContribute&&myContribute.message&&myContribute.message.docs.length===0 ? (
                <p></p>
              ):(
                myContribute&&myContribute.message&&myContribute.message.docs&&
                  (<Graph 
                    total_point={myContribute.message.point}
                    docs={myContribute.message.docs}
                    />)
              )}            
              </div>
              {myWiki&&myWiki.message&&myWiki.message.length===0 ? (
                <p>아직 기여한 내력이 없습니다.</p>
              ) : (
                myWiki&&myWiki.message&&myWiki.message.slice(0,5).map((wiki)=>(
                  <Contribute
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
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className={`${styles.middlecontent}`}>
          <div className={`${styles.ask}`}>
            <div className={styles.askheader}>
              <p className={styles.title}>내가 쓴 질문</p>
              <Link to='/mypage/myquestion' className={styles.q_link}>
              <button className={styles.edit}>더보기</button>
              </Link>
            </div>
            {myQuestion && myQuestion.message && myQuestion.message.length === 0 ? (
              <p>아직 작성한 질문이 없습니다.</p>
            ) : (
              myQuestion && myQuestion.message && myQuestion.message.slice(0,5).map((question) => (
                <QuestionList
                  key={question.id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
                  id={question.id}
                  content={question.content}
                  time={question.created_at}
                  doc_title={question.index_title}
                />
              ))
            )}
          </div>
        </div>
        <div className={`${styles.downcontent}`}>
          <div className={styles.comment}>
            <div className={styles.commentheader}>
              <p className={styles.title}>내가 쓴 토론</p>
              <Link to='/mypage/mycomment' className={styles.c_link}>
              <button className={styles.edit}>더보기</button>
              </Link>
            </div>
            {myDebate && myDebate.message && myDebate.message.length === 0 ? (
              <p>아직 작성한 토론이 없습니다.</p>
            ) : (
              myDebate && myDebate.message && myDebate.message.slice(0,5).map((debate) => (
                <CommentList
                  key={debate.id}
                  id={debate.id}
                  content={debate.debate_content}
                  time={debate.debate_content_time}
                  doc_title={debate.doc_title}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};



export default MyPage;