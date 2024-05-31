import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './MyPage.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import haho from '../img/haho.png'
import CommentList from '../components/Mypage/CommentList'
import QuestionList from '../components/Mypage/QuestionList'
import Contribute from '../components/Mypage/Contribute'
import Graph from '../components/Mypage/Graph'
import MyBadge from '../components/Mypage/MyBadge'
import MyProfile from '../components/Mypage/MyProfile'
import MyInfo from '../components/Mypage/MyInfo'

import SpinnerMypage from '../components/SpinnerMypage'
import Paging from '../components/Paging'

interface Badge {
  id: number;
  user_id: number;
  badge_id: number;
  created_at: string;
  is_bad: number;
  image: string;
  name: string;
  description: string;
}

interface BadgeDataProps {
  success: boolean;
  data: Badge[];
  message: string;
}

interface User {
  id: number;
  name: string;
  login_id: string;
  stu_id: string;
  email: string;
  rep_badge_id: number;
  nickname: string;
  created_at: string;
  point: number;
  is_admin: number;
  is_authorized: number;
  restrict_period: string | null;
  restrict_count: number;
  rep_badge_name: string;
  rep_badge_image: string;
}

interface MyPageDataProps {
  success: boolean;
  message: string;
  data: User[];
}

interface WikiHistoryEntry {
  id: number;
  user_id: number;
  doc_id: number;
  text_pointer: string;
  version: number;
  summary: string;
  created_at: string;
  count: number;
  diff: number;
  is_bad: number;
  is_rollback: number;
  is_q_based: number;
  title: string;
}

interface MyWikiProps {
  success: boolean;
  message: string;
  data: WikiHistoryEntry[];
}

interface QuestionEntry {
  id: number;
  doc_id: number;
  user_id: number;
  index_title: string;
  content: string;
  created_at: string;
  answer_or_not: number;
  is_bad: number;
  nickname: string;
  rep_badge: number;
  badge_image: string;
  like_count: number;
  doc_title: string;
  answer_count: number;
}

interface MyQuestionProps {
  success: boolean;
  message: string;
  data: QuestionEntry[];
}

interface Debate {
  debate_id: number;
  debate_subject: string;
  debate_content: string;
  debate_content_time: string;
  is_bad: boolean;
  doc_title: string;
}

interface MyDebateProps {
  success: boolean;
  message: Debate[];
}

interface DocumentContribution {
  doc_title: string;
  doc_id: number;
  doc_point: string;
  percentage: string;
}

interface MyContributionMessage {
  count: number;
  ranking: number;
  ranking_percentage: string;
  point: number;
  docs: DocumentContribution[];
}

interface MyContributionProps {
  status: number;
  success: boolean;
  message: MyContributionMessage;
}

interface MyPageProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

interface ContributeProps {
  key: number;
  user_id: number;
  doc_id: number;
  text_pointer: string;
  version: number;
  summary: string;
  created_at: string;
  count: number;
  diff: number;
  is_bad: number; // 0 또는 1로 나타내는지 여부에 따라 부울 값으로 사용할 수 있습니다.
  is_rollback: number; // 0 또는 1로 나타내는지 여부에 따라 부울 값으로 사용할 수 있습니다.
  is_q_based: number; // 0 또는 1로 나타내는지 여부에 따라 부울 값으로 사용할 수 있습니다.
  title: string;
}


function MyPage({ loggedIn, setLoggedIn }: MyPageProps) {
  const [loading, setLoading] = useState(true)
  const [myContribute, setMyContribute] = useState<MyContributionProps>()
  const [mypageData, setMypageData] = useState<MyPageDataProps>()
  const [myQuestion, setMyQuestion] = useState<MyQuestionProps>()
  const [myDebate, setMyDebate] = useState<MyDebateProps>()
  const [myBadge, setMyBadge] = useState<BadgeDataProps>({ success: false, data: [], message: '' });
  const [myWiki, setMyWiki] = useState<MyWikiProps>()
  const [page, setPage] = useState(1) // 현재 페이지 상태 추가
  const perPage = 12 // 페이지당 보여줄 컴포넌트 갯수
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber) // 페이지 번호 업데이트
  }

  // login status 체크하기
  const Navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
      } else if (res.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        return Navigate(from)
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        return Navigate(from)
      }
      alert('에러가 발생하였습니다')
      return Navigate(from)
    }
  }
  useEffect(() => {
    checkLoginStatus()
  }, [])
  //

  // 데이터 불러오기
  useEffect(() => {
    const getData = async (url: string, stateSetter: any) => { //any 타입 추론불가
      try {
        const res = await axios.get(url, { withCredentials: true })

        if (res.status === 200 || res.status === 201) {
          // 상태 코드에 따라 데이터 처리
          stateSetter(res.data)
        } else if (res.status === 401) {
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    getData(`${process.env.REACT_APP_HOST}/user/mypage/info`, setMypageData)
    getData(`${process.env.REACT_APP_HOST}/user/mypage/questionhistory/latest`, setMyQuestion)
    getData(`${process.env.REACT_APP_HOST}/user/mypage/debatehistory`, setMyDebate)
    getData(`${process.env.REACT_APP_HOST}/user/mypage/badgehistory`, setMyBadge)
    getData(`${process.env.REACT_APP_HOST}/user/mypage/wikihistory`, setMyWiki)
    getData(`${process.env.REACT_APP_HOST}/wiki/contributions`, setMyContribute)
  }, [])

  //

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }
  //

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.header}>
        <p className={styles.mypage}>{'MYPAGE'}</p>
      </div>
      <div className={`${styles.mypagecontent}`}>
        <div className={styles.uppercontent}>
          <div className={styles.leftcontent}>
            <div className={styles.profile}>
              <div className={styles.profileheader}>
                <p className={styles.title}>{'내 프로필'}</p>
                {/* <Link to='/changeinfo'className={styles.edit_link} >
                <button className={styles.edit}>수정하기</button>
                </Link> */}
              </div>

              {mypageData && mypageData.data && myBadge.data && myContribute && myContribute.message && (
                <MyProfile
                  nick={mypageData.data[0].nickname}
                  point={mypageData.data[0].point}
                  badge={mypageData.data[0].rep_badge_name}
                  badgeimg={mypageData.data[0].rep_badge_image}
                  percent={parseFloat(myContribute.message.ranking_percentage).toFixed(2)}
                />
              )}
            </div>
            <div className={styles.badge}>
              <div className={styles.badgeheader}>
                <p className={styles.title}>
                  {'뱃지 '}
                  <span style={{ color: '#9F132E' }}>
                    {'('}
                    {myBadge && myBadge.data ? myBadge.data.length : 0}
                    {')'}
                  </span>
                </p>
                <Link to={'/mypage/mybadge'} className={styles.b_link}>
                  <button className={styles.edit}>{' 더보기'}</button>
                </Link>
              </div>

              <div className={styles.badgegrid}>
                {myBadge && myBadge.data && myBadge.data.length === 0 ? (
                  <p>{'아직 획득한 뱃지가 없습니다.'}</p>
                ) : (
                  <>
                    {myBadge &&
                      myBadge.data &&
                      myBadge.data
                        .slice((page - 1) * perPage, page * perPage)
                        .map((badge: Badge) => (
                          <img
                            title={badge.name}
                            key={badge.id}
                            src={badge.image}
                            alt={badge.name}
                            className={styles.badgeImage}
                          />
                        ))}
                  </>
                )}
              </div>

              <div className={styles.paginationWrapper}>
                {myBadge.data && myBadge.data.length > perPage && (
                  <Paging total={myBadge.data.length} perPage={perPage} activePage={page} onChange={handlePageChange} />
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightcontent}>
            <div className={`${styles.cb}`}>
              <p className={styles.title2}>
                {'기여 목록 '}
                <span style={{ color: '#9F132E' }}>
                  {'('}
                  {myWiki && myWiki.data ? myWiki.data.length : 0}
                  {')'}
                </span>
              </p>
              <div className={styles.graph}>
                {myContribute && myContribute.message && myContribute.message.docs.length === 0 ? (
                  <p />
                ) : (
                  myContribute &&
                  myContribute.message &&
                  myContribute.message.docs && (
                    <Graph total_point={myContribute.message.point} docs={myContribute.message.docs} />
                  )
                )}
              </div>
              {myWiki && myWiki.message && myWiki.data.length === 0 ? (
                <p>{'아직 기여한 내역이 없습니다.'}</p>
              ) : (
                myWiki &&
                myWiki.message &&
                myWiki.data
                  .slice(0, 7)
                  .map((wiki: WikiHistoryEntry) => (
                    <Contribute
                      key={wiki.id}
                      user_id={wiki.user_id}
                      doc_id={wiki.doc_id}
                      text_pointer={wiki.text_pointer}
                      version={wiki.version}
                      summary={wiki.summary}
                      created_at={wiki.created_at}
                      count={wiki.count}
                      diff={wiki.diff}
                      is_bad={wiki.is_bad}
                      is_rollback={wiki.is_rollback}
                      is_q_based={wiki.is_q_based}
                      title={wiki.title}
                    />
                  ))
              )}
            </div>

            <div className={`${styles.ask}`}>
              <div className={styles.askheader}>
                <p className={styles.title}>
                  {'내가 쓴 질문'}{' '}
                  <span style={{ color: '#9F132E' }}>
                    {'('}
                    {myQuestion && myQuestion.data ? myQuestion.data.length : 0}
                    {')\r'}
                  </span>
                </p>
                <Link to={'/mypage/myquestion'} className={styles.q_link}>
                  <button className={styles.edit}>{'더보기'}</button>
                </Link>
              </div>
              {myQuestion && myQuestion.message && myQuestion.data.length === 0 ? (
                <p>{'아직 작성한 질문이 없습니다.'}</p>
              ) : (
                myQuestion &&
                myQuestion.message &&
                myQuestion.data &&
                myQuestion.data.slice(0, 5).map((question: QuestionEntry) => (
                  <QuestionList
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
                  />
                ))
              )}
            </div>
            <div className={styles.comment}>
              <div className={styles.commentheader}>
                <p className={styles.title}>
                  {'내가 쓴 토론'}{' '}
                  <span style={{ color: '#9F132E' }}>
                    {'('}
                    {myDebate && myDebate.message ? myDebate.message.length : 0}
                    {')\r'}
                  </span>
                </p>
                <Link to={'/mypage/mycomment'} className={styles.c_link}>
                  <button className={styles.edit}>{'더보기'}</button>
                </Link>
              </div>
              {myDebate && myDebate.message && myDebate.message.length === 0 ? (
                <p>{'아직 작성한 토론이 없습니다.'}</p>
              ) : (
                myDebate &&
                myDebate.message &&
                myDebate.message
                  .slice(0, 5)
                  .map((debate: Debate) => (
                    <CommentList
                      //key={debate.id} 미사용 변수
                      id={debate.debate_id}
                      subject={debate.debate_subject}
                      content={debate.debate_content}
                      time={debate.debate_content_time}
                      doc_title={debate.doc_title}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MyPage
