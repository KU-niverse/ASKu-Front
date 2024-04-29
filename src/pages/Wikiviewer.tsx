// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
import { Link } from "react-router-dom/dist";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom/dist";
import axios from "axios";
// @ts-expect-error TS(2307): Cannot find module './Wikiviewer.module.css' or it... Remove this comment to see the full error message
import styles from "./Wikiviewer.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmarkfalse.svg' or i... Remove this comment to see the full error message
import falseBk from "../img/bookmarkfalse.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmarkFill.svg' or it... Remove this comment to see the full error message
import trueBk from "../img/bookmarkFill.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/debate.svg' or its corr... Remove this comment to see the full error message
import debate from "../img/debate.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/his.svg' or its corresp... Remove this comment to see the full error message
import his from "../img/his.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/minilike.svg' or its co... Remove this comment to see the full error message
import minilike from "../img/minilike.svg";
// @ts-expect-error TS(6142): Module '../components/WikiBox' was resolved to 'C:... Remove this comment to see the full error message
import WikiBox from "../components/WikiBox";
// @ts-expect-error TS(6142): Module '../components/Switch' was resolved to 'C:/... Remove this comment to see the full error message
import Switch from "../components/Switch";
import { useParams } from "react-router-dom/dist";
// @ts-expect-error TS(6142): Module '../components/Wiki/WikiGraph' was resolved... Remove this comment to see the full error message
import WikiGraph from "../components/Wiki/WikiGraph";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";



function WikiViewer({
  loggedIn,
  setLoggedIn
}: any) {
  const myDivRef = useRef([]);
  const nav = useNavigate();
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBookmark, setIsBookmark] = useState(false);
  const { title } = useParams();
  const [allText, setAllText] = useState("");
  const [allContent, setAllContent] = useState([]);
  const [ques, setQues] = useState([]);
  const [contribute, setContribute] = useState([]);
  const [totalPoint, setTotalPoint] = useState(null);
  const [flag, setFlag] = useState(0);
  const [blank, setBlank] = useState(false);
  //문서: 아직 내용이 없습니다. 전체 편집에서 작성해보세요!
  //기여도: 문서를 편집한 회원이 없습니다. 전체 편집으로 기여해보세요!
  // 질문: 해당 문서에 대한 질문이 없습니다.
  const [favorite, setFavorite] = useState(false);
  const [imageSource, setImageSource] = useState(falseBk);
  // const [isZero, setIsZero] = useState(false);

  const flagToggle = () => {
    if (isToggled === false) {
      setFlag(0);
    } else {
      setFlag(1);
    }
  };

  useEffect(() => {
    flagToggle();
  }, [isToggled]);

  useEffect(() => {
    getQues();
  }, [flag]);

  function handleClick(index: any) {
    // @ts-expect-error TS(2339): Property 'scrollIntoView' does not exist on type '... Remove this comment to see the full error message
    myDivRef.current[index].scrollIntoView({ behavior: "smooth" });
  }

  //

  //북마크 추가
  const addBookmark = async () => {
    try {
      const result = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/favorite/${title}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (result.data.success === true) {
        setFavorite(true);
        alert("즐겨찾기에 추가되었습니다");
      } else {
        alert("문제가 발생하였습니다");
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        nav("/signin");
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
      }
    }
  };

  //북마크 해제
  const deleteBookmark = async () => {
    try {
      const result = await axios.delete(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/favorite/${title}`,
        {
          withCredentials: true,
        }
      );
      if (result.data.success === true) {
        setFavorite(false);
        alert("즐겨찾기에서 삭제되었습니다");
      } else {
        alert("문제가 발생하였습니다");
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  // 북마크 이미지 변경
  // 북마크 이미지 변경
  // function handleClickBookmark() {
  //     // 이미지가 변경되었을 때 다른 이미지 경로로 바꾸어줍니다.
  //     if(deleted === false){
  //         deleteBookmark();
  //         setImageSource(falseBk);

  //       } else if (deleted === true){
  //         addBookmark();
  //         setImageSource(trueBk);

  //       }
  // }

  async function handleClickBookmark() {
    try {
      if (favorite === true) {
        await deleteBookmark();
        setFavorite(false); // Update the state first
        setImageSource(falseBk);
      } else if (favorite === false) {
        await addBookmark();
        setFavorite(true); // Update the state first
        setImageSource(trueBk);
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }
  // 로그인중인지 체크
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
        return nav('/signin');
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
        return nav('/signin');
      } else {
        alert("에러가 발생하였습니다");
        return nav('/');
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (favorite === true) {
      setImageSource(trueBk);
    } else if (favorite === false) {
      setImageSource(falseBk);
    }
  }, [favorite]);

  //버튼 링크 연결 함수들
  const linkToHistory = () => {
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    const encodedTitle = encodeURIComponent(title);
    nav(`/history/${encodedTitle}`);
  };

  const linkToAllEdit = () => {
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    const encodedTitle = encodeURIComponent(title);
    nav(`/wikiedit/${encodedTitle}/all`, { state: { from: location.pathname } });
  };

  const linkToDebate = () => {
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    const encodedTitle = encodeURIComponent(title);
    nav(`/debate/${encodedTitle}`);
  };

  //contents가 비었으면 글이라도 띄우도록.
  //위키 데이터 가져오기
  const getWiki = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/contents/${title}`
      );
      setAllContent(result.data.contents);

      setFavorite(result.data.is_favorite);
      //console.log(favorite);

      if (result.data.is_favorite === true) {
        setImageSource(trueBk);
      } else if (result.data.is_favorite === false) {
        setImageSource(falseBk);
      }
    } catch (error) {
      console.error(error);
      //alert(result.data.message);
    }
  };

  //질문 데이터 가져오기
  const getQues = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/question/view/${flag}/${encodeURIComponent(title)}`
      );
      setQues(result.data.data);

      if (result.data.data.length === 0) {
        setBlank(true); //어차피 문서 내용 없으나 질문 없으나 다 이거 띄워야 되니까 최적화 코드로 하자.
      } else {
        setBlank(false);
      }
    } catch (error) {
      console.error(error);
      //alert(result.data.message);
    }
  };
  //질문 데이터 가져오기
  const getContribute = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/contributions/${title}`
      );
      //console.log('기여도');
      setContribute(result.data.message);
      //console.log(contribute);

      if (contribute.length !== 0) {
        //console.log(contribute);
        const total = contribute.reduce(
          // @ts-expect-error TS(2339): Property 'point' does not exist on type 'never'.
          (acc, item) => acc + parseInt(item.point),
          0
        );
        // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        setTotalPoint(total);
      } else {
        //console.log('기여도 없음');
      }

      if (!contribute) {
        setBlank(true); //어차피 문서 내용 없으나 질문 없으나 다 이거 띄워야 되니까 최적화 코드로 하자.
      } else {
        setBlank(false);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      //alert(result.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getWiki();
      getQues();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!totalPoint) {
      getContribute();
    }
  }, [totalPoint, contribute]);

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

  //데이터 불러오기

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.wikiviewer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikititle}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h1>
            {title}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img
              src={imageSource}
              alt="Image"
              onClick={handleClickBookmark}
              className={styles.bookmarkImg}
            />
          </h1>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikititleBtn}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button onClick={linkToDebate} className={styles.wikititleBtnOne}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img src={debate} />
              &nbsp;토론하기
            </button>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button onClick={linkToHistory} className={styles.wikititleBtnTwo}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img src={his} />
              &nbsp;히스토리
            </button>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikiBoxLists}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikilist}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.wikilistTitle}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h2>목차</h2>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button onClick={linkToAllEdit}>전체 편집</button>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              {allContent.map((item) => {
                // @ts-expect-error TS(2339): Property 'index' does not exist on type 'never'.
                const tabCount = item.index.split(".").length - 1;
                const tabs = "\u00a0\u00a0\u00a0".repeat(tabCount); // 탭은 유니코드 공백 문자 사용

                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <li
                    // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                    onClick={() => handleClick(item.section)}
                    // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                    key={item.section}
                  >
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={styles.wikiIndex}>
                      {tabs}
                      // @ts-expect-error TS(2339): Property 'index' does not exist on type 'never'.
                      {item.index}.
                    </span>{" "}
                    // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                    {item.title}
                  </li>
                );
              })}
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikiask}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.wikiaskTitle}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h2>질문</h2>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Switch
                isToggled={isToggled}
                onToggle={() => setIsToggled(!isToggled)}
              />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={blank === false ? styles.quesWrap : styles.hidden}>
              {ques.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className={styles.noneComment}>"질문이 존재하지 않습니다"</p>
              ) : (
                ques.map((item, index) => {
                  if (index >= 5) {
                    return null; // 패스 (무시)
                  }
                  return (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={styles.queslist}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <hr className={styles.customHr}></hr>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <ul
                        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                        key={item.id}
                        onClick={() => {
                          // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                          const encodedTitle = encodeURIComponent(title);
                          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                          nav(`/wiki/morequestion/${encodedTitle}/${item.id}`, {
                            state: {
                              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                              question_id: item.id,
                              // @ts-expect-error TS(2339): Property 'user_id' does not exist on type 'never'.
                              user_id: item.user_id,
                              // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                              content: item.content,
                              // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
                              created_at: item.created_at,
                              // @ts-expect-error TS(2339): Property 'like_count' does not exist on type 'neve... Remove this comment to see the full error message
                              like_count: item.like_count,
                              // @ts-expect-error TS(2339): Property 'nickname' does not exist on type 'never'... Remove this comment to see the full error message
                              nick: item.nickname,
                              // @ts-expect-error TS(2339): Property 'index_title' does not exist on type 'nev... Remove this comment to see the full error message
                              index_title: item.index_title,
                              // @ts-expect-error TS(2339): Property 'answer_count' does not exist on type 'ne... Remove this comment to see the full error message
                              answer_count: item.answer_count,
                              title: title,
                            },
                          })
                        }}
                        className={styles.quesul}
                      >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <span className={styles.quesTitle}>
                          // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                          Q.&nbsp;{item.content}
                        </span>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <span className={styles.quesNum}>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <span>{item.like_count}</span>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <img src={minilike} />
                        </span>
                      </ul>
                    </div>
                  );
                })
              )}
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.wikiaskFoot}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link to={`/wiki/morequestion/${encodeURIComponent(title)}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className={styles.addQues}>나도 질문하기</button>
              </Link>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link to={`/wiki/morequestion/${encodeURIComponent(title)}`}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className={styles.moreQues}>더보기</button>
              </Link>
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.wikigraph}>
            {contribute && totalPoint ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WikiGraph total_point={totalPoint} users={contribute} />
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className={styles.noneComment}>"기여도가 존재하지 않습니다"</p>
            )}
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.wikicontent}>
          {allContent.length === 0 ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.noneComment}>
                "위키 문서가 없습니다.{" "}
              </span>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span
                className={styles.newComment}
                onClick={() => nav("/newwiki")}
              >
                새 문서를 생성해주세요"
              </span>
            </p>
          ) : (
            allContent.map((item) => {
              //0. 들어가며 일시 질문 및 편집 막기 위해 판단
              let isZero;

              // @ts-expect-error TS(2339): Property 'index' does not exist on type 'never'.
              if (item.index === "0") {
                isZero = true;
              } else {
                isZero = false;
              }

              return (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div
                  // @ts-expect-error TS(2322): Type 'HTMLDivElement | null' is not assignable to ... Remove this comment to see the full error message
                  ref={(el) => (myDivRef.current[item.section] = el)}
                  // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                  key={item.section}
                >
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <WikiBox
                    // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                    title={item.title}
                    // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                    content={item.content}
                    // @ts-expect-error TS(2339): Property 'index' does not exist on type 'never'.
                    index={item.index}
                    // @ts-expect-error TS(2339): Property 'section' does not exist on type 'never'.
                    section={item.section}
                    main={title}
                    isZero={isZero}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer />
    </div>
  );
}

export default WikiViewer;
