import React from "react";
import { useState, useEffect } from "react";
// @ts-expect-error TS(6142): Module '../components/Quill2.js' was resolved to '... Remove this comment to see the full error message
import Editor from "../components/Quill2.js";
// @ts-expect-error TS(2307): Cannot find module './WikiEdit.module.css' or its ... Remove this comment to see the full error message
import styles from "./WikiEdit.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/QuestionFor' was resolved to... Remove this comment to see the full error message
import QuestionFor from "../components/QuestionFor";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/WikiDropDown.jsx' was resolv... Remove this comment to see the full error message
import WikiDropDown from "../components/WikiDropDown.jsx";
import axios from "axios";
// @ts-expect-error TS(6142): Module '../components/Wiki/WikiToHtml' was resolve... Remove this comment to see the full error message
import WikiToHtml from "../components/Wiki/WikiToHtml";
// @ts-expect-error TS(6142): Module '../components/Wiki/HtmlToWiki' was resolve... Remove this comment to see the full error message
import HtmlToWiki from "../components/Wiki/HtmlToWiki";
// @ts-expect-error TS(6142): Module '../components/Wiki/WikiToQuill' was resolv... Remove this comment to see the full error message
import WikiToQuill from "../components/Wiki/WikiToQuill";
// @ts-expect-error TS(6142): Module '../components/SpinnerMypage' was resolved ... Remove this comment to see the full error message
import SpinnerMypage from "../components/SpinnerMypage";
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const QuestionEdit = ({
  loggedIn,
  setLoggedIn
}: any) => {
  const nav = useNavigate();
  const [summary, setSummary] = useState("");
  const [version, setVersion] = useState("");
  const [copy, setCopy] = useState(false);
  const { main } = useParams();
  const location = useLocation();
  const stateData = location.state;
  const [desc, setDesc] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); //드롭다운 옵션
  const [selectedTitle, setSelectedTitle] = useState(stateData.index_title); //드롭다운 옵션
  const [isOptDisabled, setIsOptDisabled] = useState(false); //같은 목차 없을 시 true
  const qid = stateData.qid;
  const [defaultOpt, setDefaultOpt] = useState(stateData.index_title);
  const [loading, setLoading] = useState(true); //일단 false로(dropdown불러오기 전에 풀려서 오류)
  const [isChecked, setIsChecked] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [wikiDocs, setWikiDocs] = useState({});

  const from = stateData.from || '/';

  // //로그인 체크 후 우회
  // const checkLoginStatus = async () => {
  //   try {
  //     const res = await axios.get(
  //       process.env.REACT_APP_HOST+"/user/auth/issignedin",
  //       { withCredentials: true }
  //     );
  //     if (res.status === 201 && res.data.success === true) {
  //       setLoggedIn(true);
  //     } else if (res.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return nav(from);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoggedIn(false);
  //     if (error.response.status === 401) {
  //       setLoggedIn(false);
  //       //alert("로그인이 필요한 서비스 입니다.");
  //       return nav(from);
  //     }else{
  //       alert("에러가 발생하였습니다");
  //       return nav(from);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);



  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
  };

  function onEditorChange(value: any) {
    setDesc(value);
  }
  //일치하는 목차가 없을 경우 전체 문서를 불러옴
  const getAllWiki = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/contents/${main}`,
        {
          withCredentials: true,
        }
      ); //전체 텍스트를 가져옴.
      if (result.status === 200) {
        setDesc(WikiToQuill(result.data.text));
        setVersion(result.data.version);
        setWikiDocs(result.data);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        //nav("/signin");
      } else {
        alert("잘못된 접근입니다.");
      }
    }
  };

  //해당 섹션의 문서를 가지고 옴
  const getWiki = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/contents/${main}/section/${selectedOption}`,
        {
          withCredentials: true,
        }
      ); //전체 텍스트를 가져옴.
      if (result.status === 200) {
        setDesc(WikiToQuill(result.data.title + "\n" + result.data.content));
        setVersion(result.data.version);
        setWikiDocs(result.data);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        return nav('/');
      } else {
        alert("잘못된 접근입니다.");
      }
    }
  };
  //qid로 같은 목차 존재하는지 확인하는 함수(있으면 그대로, 없으면 전체편집
  const checkSameIndex = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/wiki/contents/question/${qid}`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        if (result.data.based_on_section === true) {
          setSelectedOption(result.data.section);
        } else {
          setSelectedOption("all");
          setIsOptDisabled(true);
        }
      }
    } catch (error) {
      setLoading(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoading(false);
        alert("로그인이 필요합니다.");
        return nav(from);
      } else {
        setLoading(false);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        //console.log(error);
        //nav("/");
      }
    }
  };

  // useEffect(() => {
  //     checkSameIndex();
  //   }, [qid]);

  useEffect(() => {
    checkSameIndex();

    setCopy(false);
  }, []);


  useEffect(() => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (userInfo[0] !== undefined) {
      // @ts-expect-error TS(2339): Property 'is_managed' does not exist on type '{}'.
      if (wikiDocs.is_managed === 1) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (userInfo[0].is_authorized === 0) {
          alert("인증받은 유저만 수정이 가능합니다.");
          nav(-1);
        }
      }
    }
  }, [userInfo, wikiDocs]);

  //첫 설정이 문제..

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === "all") {
        getAllWiki();
        setLoading(false);
      } else {
        getWiki();
        setLoading(false);
      }
    } else {
    }

    setCopy(false);
  }, [selectedOption]);

  const addWikiEdit = async (e: any) => {
    e.preventDefault();

    //본문 내용 입력 필수
    if (desc.trim() === "") {
      return alert("내용을 작성해주세요");
    }

    const wikiMarkup = HtmlToWiki(desc);

    if (isChecked === false) {
      return alert("정책에 맞게 작성하였음을 확인해주세요");
    }
    if (summary === "") {
      return alert("히스토리 요약을 작성해주세요");
    }

    if (selectedOption === "all") {
      try {
        const result = await axios.post(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/wiki/contents/${main}`,
          {
            version: version,
            new_content: wikiMarkup,
            summary: summary,
            is_q_based: 1,
            qid: qid,
            index_title: "전체",
          },
          {
            withCredentials: true,
          }
        );
        if (result.status === 200) {
          alert("수정이 완료되었습니다.");

          nav(`/wiki/${main}`);
        }
      } catch (error) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response.status === 401) {
          setLoading(false);
          alert("login이 필요합니다.");
          nav("/signin");
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        } else if (error.response.status === 500) {
          alert("제출에 실패했습니다. 다시 시도해주세요.");
          // setWiki(error.response.data.newContent);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        } else if (error.response.status === 426) {
          alert("기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.");
          setCopy(true);
        }
      }
    } else {
      try {
        const result = await axios.post(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/wiki/contents/${main}/section/${selectedOption}`,
          {
            version: version,
            new_content: wikiMarkup,
            summary: summary,
            is_q_based: 1,
            qid: qid,
            index_title: selectedTitle,
          },
          {
            withCredentials: true,
          }
        );
        if (result.status === 200) {
          alert("수정이 완료되었습니다.");
          nav(`/wiki/${main}`);
        }
      } catch (error) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response.status === 401) {
          alert("login이 필요합니다.");
          nav("/signin");
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        } else if (error.response.status === 500) {
          alert("제출에 실패했습니다. 다시 시도해주세요.");
          // setWiki(error.response.data.newContent);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        } else if (error.response.status === 426) {
          alert("기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.");
          setCopy(true);
        }
      }
    }
  };
  //dropdown에서 선택한 index 섹션으로 반영
  const handleSelectedOption = (optionValue: any) => {
    setSelectedOption(optionValue);
  };
  //dropdown에서 선택한 index title 반영
  const handleSelectedTitle = (optionValue: any) => {
    setSelectedTitle(optionValue);
  };

  if (loading) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SpinnerMypage />
      </div>
    );
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.container}`}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={`${styles.edit}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <QuestionFor
            nick={stateData.nick}
            content={stateData.content}
            like_count={stateData.like_count}
            created_at={stateData.created_at}
          />
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form onSubmit={addWikiEdit}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.wikiQues_header}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.wikichar_title}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h4>문서 제목</h4>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input
                type="text"
                required
                // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'boolean |... Remove this comment to see the full error message
                disabled="true"
                value={main}
                className={`${styles.title}`}
              />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.wikiQues_lists}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h4>목차</h4>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.q_dropdown}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <WikiDropDown
                  defaultOpt={defaultOpt}
                  onSelectedOption={handleSelectedOption}
                  onSelectedTitle={handleSelectedTitle}
                  title={main}
                  isOptionDisabled={isOptDisabled}
                />
              </div>
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.QuesWikiManu}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h4>문서 내용</h4>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')} className={styles.wikiManual}>위키 문법 알아보기!&nbsp;<FaArrowUpRightFromSquare /></p>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.editorbox2}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Editor value={desc} onChange={onEditorChange} />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <h4>히스토리 요약</h4>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={`${styles.summary}`}
              // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
              maxLength="60"
              placeholder="60자 이내로 작성해주세요"
            ></textarea>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.submitbox}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={`${styles.chkdiv}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={`${styles.chkbox}`}
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <a href="https://034179.notion.site/e7421f1ad1064d2dbde0777d53766a7d" target="_blank" rel="noopener noreferrer">
                  정책에 맞게 작성하였음을 확인합니다.
                </a>
            </span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className={`${styles.submitWiki}`}>생성하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEdit;
