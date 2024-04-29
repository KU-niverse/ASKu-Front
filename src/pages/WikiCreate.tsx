import React from "react";
import { useState, useEffect } from "react";
import Editor from "../components/Quill";
import styles from "./WikiEdit.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import HtmlToWiki from "../components/Wiki/HtmlToWiki";
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
            if (error.response.status === 401) {
        alert("로그인이 필요합니다.");
        //nav("/signin");
            } else if (error.response.status === 500) {
        alert("제출해 실패했습니다. 다시 시도해주세요.");
        // setWiki(error.response.data.newContent);
      } else {
                alert(error.response.data.message);
      }
    }
  };

  const handleSelectedOption = (optionValue: any) => {
    setSelectedOption(optionValue);
    //console.log(selectedOption);
  };

  return (
        <div className={`${styles.container}`}>
            <Header />

            <div className={`${styles.edit}`}>
                <form onSubmit={handleCreateBtn}>
                    <div className={`${styles.wikichar}`}>
                        <div className={`${styles.wikichar_title}`}>
                            <h4>문서 제목</h4>
                            <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요(30자 이내)"
                className={`${styles.title}`}
              />
            </div>
                        <div className={`${styles.wikichar_char}`}>
              {/* <h4>문서 성격</h4> //문서 성격 선택 기능 제거 (대신 문서 작성 방법 투입 예정)
              <TypeDrop onSelectedOption={handleSelectedOption} /> */}
                            <h4>위키 작성 방법</h4>
                            <p onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')} className={styles.wikiManual}>위키 문법 알아보기!&nbsp;<FaArrowUpRightFromSquare/></p>
            </div>
          </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div className={`${styles.editorbox}`}>
                            <Editor value={desc} onChange={onEditorChange} />
            </div>
          </div>
                    <div className={`${styles.submitbox}`}>
                        <span className={`${styles.chkdiv}`}>
                            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={`${styles.chkbox}`}
              />
                            <a href="https://034179.notion.site/e7421f1ad1064d2dbde0777d53766a7d" target="_blank" rel="noopener noreferrer">
                  정책에 맞게 작성하였음을 확인합니다.
                </a>
            </span>
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
