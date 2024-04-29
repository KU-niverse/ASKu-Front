import React, { useState, useEffect } from 'react'

import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Editor from '../components/Quill2.tsx'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import QuestionFor from '../components/QuestionFor'
import WikiDropDown from '../components/WikiDropDown.tsx'
import WikiToHtml from '../components/Wiki/WikiToHtml'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'
import WikiToQuill from '../components/Wiki/WikiToQuill'
import SpinnerMypage from '../components/SpinnerMypage'

const QuestionEdit = ({ loggedIn, setLoggedIn }: any) => {
  const nav = useNavigate()
  const [summary, setSummary] = useState('')
  const [version, setVersion] = useState('')
  const [copy, setCopy] = useState(false)
  const { main } = useParams()
  const location = useLocation()
  const stateData = location.state
  const [desc, setDesc] = useState('')
  const [selectedOption, setSelectedOption] = useState('') // 드롭다운 옵션
  const [selectedTitle, setSelectedTitle] = useState(stateData.index_title) // 드롭다운 옵션
  const [isOptDisabled, setIsOptDisabled] = useState(false) // 같은 목차 없을 시 true
  const { qid } = stateData
  const [defaultOpt, setDefaultOpt] = useState(stateData.index_title)
  const [loading, setLoading] = useState(true) // 일단 false로(dropdown불러오기 전에 풀려서 오류)
  const [isChecked, setIsChecked] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [wikiDocs, setWikiDocs] = useState({})

  const from = stateData.from || '/'

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
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  function onEditorChange(value: any) {
    setDesc(value)
  }
  // 일치하는 목차가 없을 경우 전체 문서를 불러옴
  const getAllWiki = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${main}`, {
        withCredentials: true,
      }) // 전체 텍스트를 가져옴.
      if (result.status === 200) {
        setDesc(WikiToQuill(result.data.text))
        setVersion(result.data.version)
        setWikiDocs(result.data)
      }
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        alert(error.response.data.message)
        // nav("/signin");
      } else {
        alert('잘못된 접근입니다.')
      }
    }
  }

  // 해당 섹션의 문서를 가지고 옴
  const getWiki = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${selectedOption}`, {
        withCredentials: true,
      }) // 전체 텍스트를 가져옴.
      if (result.status === 200) {
        setDesc(WikiToQuill(`${result.data.title}\n${result.data.content}`))
        setVersion(result.data.version)
        setWikiDocs(result.data)
      }
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        alert(error.response.data.message)
        return nav('/')
      }
      alert('잘못된 접근입니다.')
    }
  }
  // qid로 같은 목차 존재하는지 확인하는 함수(있으면 그대로, 없으면 전체편집
  const checkSameIndex = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/question/${qid}`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        if (result.data.based_on_section === true) {
          setSelectedOption(result.data.section)
        } else {
          setSelectedOption('all')
          setIsOptDisabled(true)
        }
      }
    } catch (error) {
      setLoading(false)
      if (error.response.status === 401) {
        setLoading(false)
        alert('로그인이 필요합니다.')
        return nav(from)
      }
      setLoading(false)
      alert(error.response.data.message)
      // console.log(error);
      // nav("/");
    }
  }

  // useEffect(() => {
  //     checkSameIndex();
  //   }, [qid]);

  useEffect(() => {
    checkSameIndex()

    setCopy(false)
  }, [])

  useEffect(() => {
    if (userInfo[0] !== undefined) {
      if (wikiDocs.is_managed === 1) {
        if (userInfo[0].is_authorized === 0) {
          alert('인증받은 유저만 수정이 가능합니다.')
          nav(-1)
        }
      }
    }
  }, [userInfo, wikiDocs])

  // 첫 설정이 문제..

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === 'all') {
        getAllWiki()
        setLoading(false)
      } else {
        getWiki()
        setLoading(false)
      }
    } else {
    }

    setCopy(false)
  }, [selectedOption])

  const addWikiEdit = async (e: any) => {
    e.preventDefault()

    // 본문 내용 입력 필수
    if (desc.trim() === '') {
      return alert('내용을 작성해주세요')
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (isChecked === false) {
      return alert('정책에 맞게 작성하였음을 확인해주세요')
    }
    if (summary === '') {
      return alert('히스토리 요약을 작성해주세요')
    }

    if (selectedOption === 'all') {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_HOST}/wiki/contents/${main}`,
          {
            version,
            new_content: wikiMarkup,
            summary,
            is_q_based: 1,
            qid,
            index_title: '전체',
          },
          {
            withCredentials: true,
          },
        )
        if (result.status === 200) {
          alert('수정이 완료되었습니다.')

          nav(`/wiki/${main}`)
        }
      } catch (error) {
        if (error.response.status === 401) {
          setLoading(false)
          alert('login이 필요합니다.')
          nav('/signin')
        } else if (error.response.status === 500) {
          alert('제출에 실패했습니다. 다시 시도해주세요.')
          // setWiki(error.response.data.newContent);
        } else if (error.response.status === 426) {
          alert('기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.')
          setCopy(true)
        }
      }
    } else {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${selectedOption}`,
          {
            version,
            new_content: wikiMarkup,
            summary,
            is_q_based: 1,
            qid,
            index_title: selectedTitle,
          },
          {
            withCredentials: true,
          },
        )
        if (result.status === 200) {
          alert('수정이 완료되었습니다.')
          nav(`/wiki/${main}`)
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert('login이 필요합니다.')
          nav('/signin')
        } else if (error.response.status === 500) {
          alert('제출에 실패했습니다. 다시 시도해주세요.')
          // setWiki(error.response.data.newContent);
        } else if (error.response.status === 426) {
          alert('기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.')
          setCopy(true)
        }
      }
    }
  }
  // dropdown에서 선택한 index 섹션으로 반영
  const handleSelectedOption = (optionValue: any) => {
    setSelectedOption(optionValue)
  }
  // dropdown에서 선택한 index title 반영
  const handleSelectedTitle = (optionValue: any) => {
    setSelectedTitle(optionValue)
  }

  if (loading) {
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  }

  return (
    <div className={`${styles.container}`}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={`${styles.edit}`}>
        <div>
          <QuestionFor
            nick={stateData.nick}
            content={stateData.content}
            like_count={stateData.like_count}
            created_at={stateData.created_at}
          />
        </div>
        <form onSubmit={addWikiEdit}>
          <div className={`${styles.wikiQues_header}`}>
            <div className={`${styles.wikichar_title}`}>
              <h4>{'문서 제목'}</h4>
              <input type={'text'} required disabled={'true'} value={main} className={`${styles.title}`} />
            </div>
            <div className={`${styles.wikiQues_lists}`}>
              <h4>{'목차'}</h4>
              <div className={styles.q_dropdown}>
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
          <div>
            <div className={`${styles.QuesWikiManu}`}>
              <h4>{'문서 내용'}</h4>
              <p onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')} className={styles.wikiManual}>
                {'위키 문법 알아보기!'}&nbsp;{'\r'}
                <FaArrowUpRightFromSquare />
              </p>
            </div>

            <div className={`${styles.editorbox2}`}>
              <Editor value={desc} onChange={onEditorChange} />
            </div>
            <h4>{'히스토리 요약'}</h4>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={`${styles.summary}`}
              maxLength={'60'}
              placeholder={'60자 이내로 작성해주세요'}
            />
          </div>
          <div className={`${styles.submitbox}`}>
            <span className={`${styles.chkdiv}`}>
              <input
                type={'checkbox'}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={`${styles.chkbox}`}
              />
              <a
                href={'https://034179.notion.site/e7421f1ad1064d2dbde0777d53766a7d'}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                {'정책에 맞게 작성하였음을 확인합니다.\r'}
              </a>
            </span>
            <button className={`${styles.submitWiki}`}>{'생성하기'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionEdit
