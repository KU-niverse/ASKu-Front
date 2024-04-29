import React from "react";
import { useState, useEffect } from "react";
// @ts-expect-error TS(6142): Module '../components/Quill' was resolved to 'C:/U... Remove this comment to see the full error message
import Editor from "../components/Quill";
// @ts-expect-error TS(2307): Cannot find module './WikiEdit.module.css' or its ... Remove this comment to see the full error message
import styles from "./WikiEdit.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/Wiki/HtmlToWiki' was resolve... Remove this comment to see the full error message
import HtmlToWiki from "../components/Wiki/HtmlToWiki";
// @ts-expect-error TS(6142): Module '../components/TypeDrop' was resolved to 'C... Remove this comment to see the full error message
import TypeDrop from "../components/TypeDrop";
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';


const WikiCreate = ({
  loggedIn,
  setLoggedIn
}: any) => {
  const nav = useNavigate();
  const location = useLocation();
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState(null); //드롭다운 옵션
  const [isChecked, setIsChecked] = useState(false);

  const from = location.state?.from || '/';
  //console.log(from)

  //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
        return nav('/');
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
        return nav('/');
      }else{
        alert("에러가 발생하였습니다");
        return nav('/');
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);




  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
  };

  function onEditorChange(value: any) {
    setDesc(value);
    //console.log(value);
  }

  const handleCreateBtn = async (e: any) => {
    e.preventDefault();

    if (title.length > 30) {
      // 30자를 초과하는 경우 alert를 띄우고 이전 값으로 되돌림
      return alert("제목은 30자 이내로 입력해주세요.");
       // 함수 종료
    }
    const trimedTitle = title.trim();
    if (desc.trim() === "") {
      return alert("내용을 작성해주세요");
    }

    const wikiMarkup = HtmlToWiki(desc);
    //console.log(selectedOption);

    if (isChecked === false) {
      return alert("정책에 맞게 작성하였음을 확인해주세요");
    }

    try {
      const result = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/contents/new/${trimedTitle}`,
        {
          text: wikiMarkup,
          type: 'doc',
        },
        {
          withCredentials: true,
        }
      );
      if (result.data.success === true) {
        alert("문서를 생성해주셔서 감사합니다.");
        nav(`/wiki/${encodeURIComponent(title)}`);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
        //nav("/signin");
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      } else if (error.response.status === 500) {
        alert("제출해 실패했습니다. 다시 시도해주세요.");
        // setWiki(error.response.data.newContent);
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
      }
    }
  };

  const handleSelectedOption = (optionValue: any) => {
    setSelectedOption(optionValue);
    //console.log(selectedOption);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`${styles.container}`}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={`${styles.edit}`}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form onSubmit={handleCreateBtn}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={`${styles.wikichar}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.wikichar_title}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h4>문서 제목</h4>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요(30자 이내)"
                className={`${styles.title}`}
              />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.wikichar_char}`}>
              {/* <h4>문서 성격</h4> //문서 성격 선택 기능 제거 (대신 문서 작성 방법 투입 예정)
              <TypeDrop onSelectedOption={handleSelectedOption} /> */}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h4>위키 작성 방법</h4>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')} className={styles.wikiManual}>위키 문법 알아보기!&nbsp;<FaArrowUpRightFromSquare/></p>
            </div>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <h4>문서 내용</h4>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${styles.editorbox}`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Editor value={desc} onChange={onEditorChange} />
            </div>
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
            <input
              type="submit"
              value="생성하기"
              className={`${styles.submitWiki}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WikiCreate;
