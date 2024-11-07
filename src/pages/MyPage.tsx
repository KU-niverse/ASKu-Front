import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import styles from './MyPage.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CommentList from '../components/Mypage/CommentList'
import QuestionList from '../components/Mypage/QuestionList'
import Contribute from '../components/Mypage/Contribute'
import Graph from '../components/Mypage/Graph'
import MyProfile from '../components/Mypage/MyProfile'
import SpinnerMypage from '../components/SpinnerMypage'
import Paging from '../components/Paging'
import Arrow from '../img/mypagearrow.svg'
import moreBadgeArrow from '../img/morebadgearrow.svg'
import locked from '../img/locked.svg'
import warning from '../img/warning.svg'

interface UserInfo {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
  nickname: string
  created_at: Date
  point: number
  is_admin: boolean
  is_authorized: boolean
  restrict_period: number | null
  restrict_count: number
  rep_badge_name: string
  rep_badge_image: string
}

interface Badge {
  id: number
  user_id: number
  badge_id: number
  created_at: Date
  is_bad: boolean
  image: string
  name: string
  description: string
}

interface BadgeDataProps {
  success: boolean
  data: Badge[]
  message: string
}

interface User {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
  nickname: string
  created_at: Date
  point: number
  is_admin: boolean
  is_authorized: boolean
  restrict_period: number | null
  restrict_count: number
  rep_badge_name: string
  rep_badge_image: string
}

interface MyPageDataProps {
  success: boolean
  message: string
  data: User[]
}

interface WikiHistoryEntry {
  id: number
  user_id: number
  doc_id: number
  text_pointer: string
  version: number
  summary: string
  created_at: Date
  count: number
  diff: number
  is_bad: boolean
  is_rollback: boolean
  is_q_based: boolean
  title: string
}

interface MyWikiProps {
  success: boolean
  message: string
  data: WikiHistoryEntry[]
}

interface QuestionEntry {
  id: number
  doc_id: number
  user_id: number
  index_title: string
  content: string
  created_at: Date
  answer_or_not: boolean
  is_bad: boolean
  nickname: string
  rep_badge: number
  badge_image: string
  like_count: number
  doc_title: string
  answer_count: number
}

interface MyQuestionProps {
  success: boolean
  message: string
  data: QuestionEntry[]
}

interface Debate {
  debate_id: number
  debate_subject: string
  debate_content: string
  debate_content_time: Date
  is_bad: boolean
  doc_title: string
}

interface MyDebateProps {
  success: boolean
  message: Debate[]
}

interface DocumentContribution {
  doc_title: string
  doc_id: number
  doc_point: string
  percentage: string
}

interface MyContributionMessage {
  count: number
  ranking: number
  ranking_percentage: string
  point: number
  docs: DocumentContribution[]
}

interface MyContributionProps {
  status: number
  success: boolean
  message: MyContributionMessage
}

interface MyPageProps {
  loggedIn: boolean
  setLoggedIn: (loggedIn: boolean) => void
}

const MyPage = ({ loggedIn, setLoggedIn }: MyPageProps) => {
  const [type, setType] = useState<string>('myprofile')
  const [page, setPage] = useState(1) // 현재 페이지 상태 추가: 기여 목록, 질문 목록, 토론 목록에서 사용
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const contributionPerPage = 5 // 기여 목록 페이지당 항목 수
  const questionPerPage = 10 // 질문 목록 페이지당 항목 수
  const debatePerPage = 10 // 토론 목록 페이지당 항목 수

  const signOut = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/signout`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        alert(result.data.message)
        setLoggedIn(false)
        window.location.href = '/'
      }
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  const fetchMyPageData = async (): Promise<MyPageDataProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })
    return res.data
  }

  const handleClickBtn = (selected: string) => {
    setType(selected)
    setPage(1)
  }

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
      const res = await axios.get(`${process.env.REACT_APP_HOST}/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
      } else if (res.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        Navigate(from)
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response?.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        Navigate(from)
      }
      alert('에러가 발생하였습니다')
      Navigate(from)
    }
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const fetchMyQuestion = async (): Promise<MyQuestionProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/questionhistory/latest`, {
      withCredentials: true,
    })
    return res.data
  }

  const fetchMyDebate = async (): Promise<MyDebateProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/debatehistory`, { withCredentials: true })
    return res.data
  }

  const fetchMyBadge = async (): Promise<BadgeDataProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/badgehistory`, { withCredentials: true })
    return res.data
  }

  const fetchMyWiki = async (): Promise<MyWikiProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/wikihistory`, { withCredentials: true })
    return res.data
  }

  const fetchMyContribute = async (): Promise<MyContributionProps> => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contributions`, { withCredentials: true })
    return res.data
  }

  const { data: mypageData, isLoading: loadingMypage, error: mypageError } = useQuery('mypageData', fetchMyPageData)
  const {
    data: myQuestion,
    isLoading: loadingMyQuestion,
    error: myQuestionError,
  } = useQuery('myQuestion', fetchMyQuestion)
  const { data: myDebate, isLoading: loadingMyDebate, error: myDebateError } = useQuery('myDebate', fetchMyDebate)
  const { data: myBadge, isLoading: loadingMyBadge, error: myBadgeError } = useQuery('myBadge', fetchMyBadge)
  const { data: myWiki, isLoading: loadingMyWiki, error: myWikiError } = useQuery('myWiki', fetchMyWiki)
  const {
    data: myContribute,
    isLoading: loadingMyContribute,
    error: myContributeError,
  } = useQuery('myContribute', fetchMyContribute)

  if (loadingMypage || loadingMyQuestion || loadingMyDebate || loadingMyBadge || loadingMyWiki || loadingMyContribute) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  if (mypageError || myQuestionError || myDebateError || myBadgeError || myWikiError || myContributeError) {
    return <div>{'Error loading data'}</div>
  }

  return (
    <div className={styles.pagewrap}>
      <div className={styles.headerContainer}>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
      {/* 웹 뷰 */}
      <div className={styles.myPageContainer}>
        <div className={styles.navContainer}>
          <div className={styles.navSubContainer}>
            <div className={styles.userGreeting}>
              {`안녕하세요,`}
              <br />
              {`${mypageData.data[0].nickname} 님!`}
            </div>
            <div className={styles.allNavigators}>
              <button
                type={'button'}
                onClick={() => handleClickBtn('myprofile')}
                className={type === 'myprofile' ? styles.nowNav : styles.defaultNav}
              >
                {'내 프로필'}
                <div className={styles.navArrow}>
                  <img alt={'myPageNavArrow'} src={Arrow} />
                </div>
              </button>
              <button
                type={'button'}
                onClick={() => handleClickBtn('mycontribution')}
                className={type === 'mycontribution' ? styles.nowNav : styles.defaultNav}
              >
                {'기여 목록'}
                <div className={styles.navArrow}>
                  <img alt={'myPageNavArrow'} src={Arrow} />
                </div>
              </button>
              <button
                type={'button'}
                onClick={() => handleClickBtn('myquestion')}
                className={type === 'myquestion' ? styles.nowNav : styles.defaultNav}
              >
                {'내가 쓴 질문'}
                <div className={styles.navArrow}>
                  <img alt={'myPageNavArrow'} src={Arrow} />
                </div>
              </button>
              <button
                type={'button'}
                onClick={() => handleClickBtn('mydebate')}
                className={type === 'mydebate' ? styles.nowNav : styles.defaultNav}
              >
                {'내가 쓴 토론'}
                <div className={styles.navArrow}>
                  <img alt={'myPageNavArrow'} src={Arrow} />
                </div>
              </button>
            </div>
            <button type={'button'} onClick={signOut} className={styles.logout}>
              {'로그아웃'}
            </button>
          </div>
        </div>
        <div className={styles.contentContainer}>
          {type === 'myprofile' ? (
            <div className={styles.contentSubContainer}>
              <div className={styles.profileContainer}>
                <div className={styles.profileHeader}>
                  <div className={styles.contentTitle}>{'내 프로필'}</div>
                </div>
                <div className={styles.profileBox}>
                  {mypageData && mypageData.data && myBadge && myBadge.data && myContribute && myContribute.message && (
                    <MyProfile
                      nick={mypageData.data[0].nickname}
                      point={mypageData.data[0].point}
                      badge={mypageData.data[0].rep_badge_name}
                      badgeimg={mypageData.data[0].rep_badge_image}
                      percent={parseFloat(myContribute.message.ranking_percentage).toFixed(2)}
                    />
                  )}
                </div>
              </div>
              <div className={styles.badgeHeader}>
                <div className={styles.contentTitle}>
                  {'뱃지 '}
                  <span className={styles.contentNum}>
                    {'('}
                    {myBadge && myBadge.data ? myBadge.data.length : 0}
                    {')'}
                  </span>
                </div>
              </div>
              <div className={styles.badgeContent}>
                <div className={styles.badgesContainer}>
                  {myBadge &&
                    myBadge.data &&
                    myBadge.data
                      .slice(0, 4)
                      .map((badge: Badge) => (
                        <img
                          title={badge.name}
                          key={badge.id}
                          src={badge.image}
                          alt={badge.name}
                          className={styles.badgeImage}
                        />
                      ))}
                  {myBadge && myBadge.data && myBadge.data.length < 4
                    ? Array(4 - myBadge.data.length).fill(
                      <div className={styles.lockedImage}>
                        <img src={locked} alt={'locked'} />
                      </div>,
                    )
                    : null}
                </div>
                <button type={'button'} onClick={() => Navigate('/mypage/mybadge')} className={styles.moreBadge}>
                  <span className={styles.moreBadgeText}>{'뱃지 더보기'}</span>
                  <span className={styles.moreBadgeImg}>
                    <img alt={'morebadge'} src={moreBadgeArrow} className={styles.moreBadgeImgContent} />
                  </span>
                </button>
              </div>
            </div>
          ) : type === 'mycontribution' ? (
            <div className={styles.contentSubContainer}>
              <div className={styles.contributeHeader}>
                <div className={styles.contentTitle}>
                  {'기여 목록 '}
                  <span className={styles.contentNum}>
                    {'('}
                    {myWiki && myWiki.data ? myWiki.data.length : 0}
                    {')'}
                  </span>
                </div>
              </div>
              {myWiki && myWiki.message && myWiki.data.length === 0 ? (
                <div className={styles.noList}>
                  <div className={styles.warningsign}>
                    <img alt={'warningsign'} src={warning} />
                  </div>
                  <div className={styles.warningtext}>
                    {'아직 기여한'}
                    <br />
                    {'내역이 없습니다'}
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.contributionBox}>
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
                  </div>
                  <div className={styles.contributionList}>
                    {myWiki &&
                      myWiki.message &&
                      myWiki.data
                        .slice((page - 1) * contributionPerPage, page * contributionPerPage)
                        .map((wiki: WikiHistoryEntry) => (
                          <div className={styles.contributionElement}>
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
                          </div>
                        ))}
                  </div>
                  <div className={styles.paginationWrapper}>
                    {myWiki.data && myWiki.data.length > contributionPerPage && (
                      <Paging
                        total={myWiki.data.length}
                        perPage={contributionPerPage}
                        activePage={page}
                        onChange={handlePageChange}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : type === 'myquestion' ? (
            <div className={styles.contentSubContainer}>
              <div className={styles.questionHeader}>
                <div className={styles.contentTitle}>
                  {'내가 쓴 질문 '}
                  <span className={styles.contentNum}>
                    {'('}
                    {myQuestion && myQuestion.data ? myQuestion.data.length : 0}
                    {')'}
                  </span>
                </div>
              </div>
              {myQuestion && myQuestion.message && myQuestion.data.length === 0 ? (
                <div className={styles.noList}>
                  <div className={styles.warningsign}>
                    <img alt={'warningsign'} src={warning} />
                  </div>
                  <div className={styles.warningtext}>
                    {'아직 작성한'}
                    <br />
                    {'질문이 없습니다'}
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.questionList}>
                    {myQuestion &&
                      myQuestion.message &&
                      myQuestion.data &&
                      myQuestion.data
                        .slice((page - 1) * questionPerPage, page * questionPerPage)
                        .map((question: QuestionEntry) => (
                          <div className={styles.questionElement}>
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
                              like_count={question.like_count}
                              doc_title={question.doc_title}
                              answer_count={question.answer_count}
                            />
                          </div>
                        ))}
                  </div>
                  <div className={styles.paginationWrapper}>
                    {myQuestion.data && myQuestion.data.length > questionPerPage && (
                      <Paging
                        total={myQuestion.data.length}
                        perPage={questionPerPage}
                        activePage={page}
                        onChange={handlePageChange}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : type === 'mydebate' ? (
            <div className={styles.contentSubContainer}>
              <div className={styles.debateHeader}>
                <div className={styles.contentTitle}>
                  {'내가 쓴 토론 '}
                  <span className={styles.contentNum}>
                    {'('}
                    {myDebate && myDebate.message ? myDebate.message.length : 0}
                    {')'}
                  </span>
                </div>
              </div>
              {myDebate && myDebate.message && myDebate.message.length === 0 ? (
                <div className={styles.noList}>
                  <div className={styles.warningsign}>
                    <img alt={'warningsign'} src={warning} />
                  </div>
                  <div className={styles.warningtext}>
                    {'아직 작성한'}
                    <br />
                    {'토론이 없습니다'}
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.debateList}>
                    {myDebate &&
                      myDebate.message &&
                      myDebate.message.slice((page - 1) * debatePerPage, page * debatePerPage).map((debate: Debate) => (
                        <div className={styles.debateElement}>
                          <CommentList
                            key={debate.debate_id} // 여기에 키 추가
                            id={debate.debate_id}
                            subject={debate.debate_subject}
                            content={debate.debate_content}
                            time={debate.debate_content_time}
                            doc_title={debate.doc_title}
                          />
                        </div>
                      ))}
                  </div>
                  <div className={styles.paginationWrapper}>
                    {myDebate.message && myDebate.message.length > debatePerPage && (
                      <Paging
                        total={myDebate.message.length}
                        perPage={debatePerPage}
                        activePage={page}
                        onChange={handlePageChange}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* 모바일 뷰 */}
      <div className={styles.mobileMyPageContainer}>
        <div className={styles.mobileProfileContainer}>
          <div className={styles.mobileProfileBox}>
            {mypageData && mypageData.data && myBadge && myBadge.data && myContribute && myContribute.message && (
              <MyProfile
                nick={mypageData.data[0].nickname}
                point={mypageData.data[0].point}
                badge={mypageData.data[0].rep_badge_name}
                badgeimg={mypageData.data[0].rep_badge_image}
                percent={parseFloat(myContribute.message.ranking_percentage).toFixed(2)}
              />
            )}
          </div>
        </div>
        <div className={styles.mobileNavContainer}>
          <button type={'button'} onClick={() => Navigate('/mypage/mycontribution')} className={styles.mobileNavBtn}>
            <div className={styles.mobileNavText}>{'나의 기여 목록'}</div>
            <div className={styles.navArrow}>
              <img className={styles.mobileNavArrowImg} alt={'myPageMobileNavArrow'} src={Arrow} />
            </div>
          </button>
          <button type={'button'} onClick={() => Navigate('/mypage/mybadge')} className={styles.mobileNavBtn}>
            <div className={styles.mobileNavText}>{'나의 뱃지 목록'}</div>
            <div className={styles.navArrow}>
              <img className={styles.mobileNavArrowImg} alt={'myPageMobileNavArrow'} src={Arrow} />
            </div>
          </button>
          <button type={'button'} onClick={() => Navigate('/mypage/myquestion')} className={styles.mobileNavBtn}>
            <div className={styles.mobileNavText}>{'내가 쓴 질문'}</div>
            <div className={styles.navArrow}>
              <img className={styles.mobileNavArrowImg} alt={'myPageMobileNavArrow'} src={Arrow} />
            </div>
          </button>
          <button type={'button'} onClick={() => Navigate('/mypage/mycomment')} className={styles.mobileNavBtn}>
            <div className={styles.mobileNavText}>{'내가 쓴 토론'}</div>
            <div className={styles.navArrow}>
              <img className={styles.mobileNavArrowImg} alt={'myPageMobileNavArrow'} src={Arrow} />
            </div>
          </button>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default MyPage
