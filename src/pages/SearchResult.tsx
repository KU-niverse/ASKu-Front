import React from "react";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(2307): Cannot find module '../img/SearchResult.svg' or it... Remove this comment to see the full error message
import search from "../img/SearchResult.svg";
// @ts-expect-error TS(2307): Cannot find module './SearchResult.module.css' or ... Remove this comment to see the full error message
import styles from "./SearchResult.module.css";
// @ts-expect-error TS(6142): Module '../components/ResultBox' was resolved to '... Remove this comment to see the full error message
import ResultBox from "../components/ResultBox";
import { useState, useEffect } from "react";
// @ts-expect-error TS(6142): Module '../components/Question' was resolved to 'C... Remove this comment to see the full error message
import Question from "../components/Question";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// @ts-expect-error TS(6142): Module '../components/ResultQues' was resolved to ... Remove this comment to see the full error message
import ResultQues from "../components/ResultQues";
// @ts-expect-error TS(6142): Module '../components/FormatTimeAgo' was resolved ... Remove this comment to see the full error message
import FormatTimeAgo from "../components/FormatTimeAgo";
// @ts-expect-error TS(6142): Module '../components/BookmarkBox' was resolved to... Remove this comment to see the full error message
import BookmarkBox from "../components/BookmarkBox";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";

const data = [
  {
    title: "입실렌티",
    recent_filtered_content:
      "개요 벨 연구소에서 멀틱스 프로젝트에 참여한 바 있던 켄 톰슨, 데니스 리치 등이 멀틱스의 일부 아이디어를 가져와서 소형 컴퓨터에서도 작동할 수 있는 단순한 운영 체제를 만든 후 유닉스(UNIX)라는 이름을 붙였다. 유닉스는 1969년도부터 개발되기 시작하여 1973년 10월에 운영체제 분야의 최상위 학술대회인 ACM Symposium on Operating Systems Principles(SOSP)에서 공개되었다. 하하하하하호호호호호 히히 키키키키키키킼키키키키gggg BSD AT&T에서 학교에 비교적 저렴한 비용으로 연구용 유닉스의 소스 코드를 배포했는데, 이 소스 코드를 확보한 캘리포니아 대학교 버클리 캠퍼스의 대학원생이었던 빌 조이(Bill Joy) 등이 유닉스의 소스 코드를 개선하고 새로운 프로그램을 추가한 BSD를 만들어 1978년에 배포하였다. ​ 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 ꉂꉂ(ᵔᗜᵔ*) 푸항항 리눅스 Linux|리눅스는 유닉스의 직접적인 후계자는 아니지만 유닉스의 설계 개념 등에 영향을 받았다. 리눅스는 유닉스의 POSIX 규격을 거의 대부분 따른다. 따라서 리눅스도 그 족보를 거슬러 올라가면 멀틱스로부터 갈라져나온 셈ㄴㅁㅇㄻㄴㅇ. 분류:멀틱스 rhrhrh 고양이 고양이는 정말 귀여워원하시는 질문이 없으신가요? 새로운 질문을 생",
  },
  {
    title: "입실렌티",
    recent_filtered_content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
  },
  {
    title: "입실렌티",
    recent_filtered_content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
  },
  {
    title: "입실렌티",
    recent_filtered_content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
  },
];
const lists = [
  {
    title: "대동제",
    timestamp: "18:06",
  },
  {
    title: "대동제",
    timestamp: "18:06",
  },
  {
    title: "대동제",
    timestamp: "18:06",
  },
  {
    title: "대동제",
    timestamp: "18:06",
  },
];

const SearchResearch = () => {
  const nav = useNavigate();
  const [isClicked, setIsClicked] = useState(true); //true: 문서 false: 질문

  const { title } = useParams();
  const [docs, setDocs] = useState([]);
  const [historys, setHistorys] = useState([]);
  const [type, setType] = useState("all");
  const [docsCount, setDocsCount] = useState(0);
  const [quesCount, setQuesCount] = useState(0);
  const [ques, setQues] = useState([]);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  const handleDocsClick = (title: any) => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/wiki/${encodedTitle}`);
  };

  const getDocs = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/query/${title}`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setDocs(result.data.message);
        setDocsCount(result.data.message.length);
      }
    } catch (error) {
      console.error(error);
      // return alert(error.response.data.message);
    }
  };

  const getQues = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/question/query/${title}`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setQues(result.data.data);
        setQuesCount(result.data.data.length);
      }
    } catch (error) {
      console.error(error);
      //return alert(error.response.message);
    }
  };

  //최근변경 리스트
  const getHistory = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/historys?type=${type}`
      );
      setHistorys(result.data.message);
    } catch (error) {
      console.error(error);
      //alert(result.data.message);
    }
  };

  useEffect(() => {
    getDocs();
    getQues();
  }, [title]);

  useEffect(() => {
    getHistory();
  }, [type]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.results}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.header}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={search} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h4>"{title}" 검색결과</h4>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.typeWrap}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.type}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button
              onClick={handleButtonClick}
              className={isClicked ? styles.btnRed : styles.btnGray}
            >
              문서
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={isClicked ? styles.numberRed : styles.numberGray}>
                {docs.length}
              </div>
            </button>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button
              onClick={handleButtonClick}
              className={isClicked ? styles.btnGray : styles.btnRed}
            >
              질문
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={isClicked ? styles.numberGray : styles.numberRed}>
                {ques.length}
              </div>
            </button>
          </p>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.title}>최근 변경</p>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.contents}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.boxes}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={isClicked ? "" : styles.hidden}>
              {docs.map((item) => {
                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div
                    // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                    key={item.title}
                    // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                    onClick={() => handleDocsClick(item.title)}
                  >
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <BookmarkBox
                      // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                      title={item.title}
                      // @ts-expect-error TS(2339): Property 'recent_filtered_content' does not exist ... Remove this comment to see the full error message
                      content={item.recent_filtered_content}
                      // @ts-expect-error TS(2339): Property 'is_favorite' does not exist on type 'nev... Remove this comment to see the full error message
                      is_favorite={item.is_favorite}
                      result={true}
                    />
                  </div>
                );
              })}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.linkToNew}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/newwiki" className={styles.link}>
                  원하시는 문서가 없으신가요? 새로운 문서를 생성해보세요
                </Link>
              </div>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={isClicked ? styles.hidden : ""}>
              {ques.map((item) => {
                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className={styles.queboxes}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <ResultQues
                      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                      key={item.id}
                      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                      id={item.id}
                      // @ts-expect-error TS(2339): Property 'doc_id' does not exist on type 'never'.
                      doc_id={item.doc_id}
                      // @ts-expect-error TS(2339): Property 'user_id' does not exist on type 'never'.
                      user_id={item.user_id}
                      // @ts-expect-error TS(2339): Property 'index_title' does not exist on type 'nev... Remove this comment to see the full error message
                      index_title={item.index_title}
                      // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                      content={item.content}
                      // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
                      created_at={item.created_at}
                      // @ts-expect-error TS(2339): Property 'answer_count' does not exist on type 'ne... Remove this comment to see the full error message
                      answer_count={item.answer_count}
                      // @ts-expect-error TS(2339): Property 'is_bad' does not exist on type 'never'.
                      is_bad={item.is_bad}
                      // @ts-expect-error TS(2339): Property 'nickname' does not exist on type 'never'... Remove this comment to see the full error message
                      nick={item.nickname}
                      // @ts-expect-error TS(2339): Property 'like_count' does not exist on type 'neve... Remove this comment to see the full error message
                      like_count={item.like_count}
                      // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                      title={item.title}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.recents}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.recentWrap}>
              {historys.slice(0, 8).map((item) => {
                // @ts-expect-error TS(2339): Property 'created_at' does not exist on type 'neve... Remove this comment to see the full error message
                const timestamp = FormatTimeAgo(item.created_at);
                return (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <ul key={item.title}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link
                      // @ts-expect-error TS(2339): Property 'doc_title' does not exist on type 'never... Remove this comment to see the full error message
                      to={`/wiki/${encodeURIComponent(item.doc_title)}`}
                      className={styles.linkTo}
                    >
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <span className={styles.listTitle}>{item.doc_title}</span>
                    </Link>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={styles.listTimestamp}>{timestamp}</span>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer />
    </div>
  );
};

export default SearchResearch;
