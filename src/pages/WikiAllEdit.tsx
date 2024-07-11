import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { track } from '@amplitude/analytics-browser'
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'
import WikiToHtml from '../components/Wiki/WikiToHtml'
import WikiToQuill from '../components/Wiki/WikiToQuill'

const WikiEdit = ({ loggedIn, setLoggedIn }) => {
  const { title, section } = useParams()
  const nav = useNavigate()
  const location = useLocation()
  const [desc, setDesc] = useState('')
  const [wiki, setWiki] = useState('')
  const [summary, setSummary] = useState('')
  const [version, setVersion] = useState('')
  const [copy, setCopy] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [wikiDocs, setWikiDocs] = useState({})

  const from = location.state?.from || '/'
  // console.log(from)

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
      } else if (res.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        return nav('/')
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        return nav('/')
      }
      alert('에러가 발생하였습니다')
      return nav('/')
    }
  }
  useEffect(() => {
    checkLoginStatus()
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

  // Amplitude
  useEffect(() => {
    track('view_edit_wiki', {
      title,
      type: 'all',
    })
  }, [])

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  function onEditorChange(value) {
    setDesc(value)
    // console.log(desc);
  }

  useEffect(() => {
    const getWiki = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${title}`, {
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

    getWiki()
  }, [])

  const addWikiEdit = async (e) => {
    e.preventDefault()

    if (desc.trim() === '') {
      alert('내용을 작성해주세요')
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (isChecked === false) {
      alert('정책에 맞게 작성하였음을 확인해주세요')
    }
    if (summary === '') {
      alert('히스토리 요약을 작성해주세요')
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/contents/${title}`,
        {
          version,
          new_content: wikiMarkup,
          summary,
          is_q_based: 0,
          qid: 0,
          index_title: '전체',
        },
        {
          withCredentials: true,
        },
      )
      if (result.status === 200) {
        alert('수정이 완료되었습니다.')
        const encodedTitle = encodeURIComponent(title)
        nav(`/wiki/${encodedTitle}`)
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert('로그인이 필요합니다.')
        nav('/signin')
      } else if (error.response.status === 500) {
        alert('제출해 실패했습니다. 다시 시도해주세요.')
        // setWiki(error.response.data.newContent);
      } else if (error.response.status === 426) {
        alert('기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.')
        setCopy(true)
      }
    }
  }

  return (
    <div className={`${styles.container}`}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />

      <div className={`${styles.edit}`}>
        <form onSubmit={addWikiEdit}>
          <div className={`${styles.wikichar}`}>
            <div className={`${styles.wikichar_title}`}>
              <h4>{'문서 제목'}</h4>
              <input type={'text'} disabled value={title} className={`${styles.title}`} />
            </div>
            <div className={`${styles.wikichar_char}`}>
              {/* <h4>문서 성격</h4> //문서 성격 선택 기능 제거 (대신 문서 작성 방법 투입 예정)
              <TypeDrop onSelectedOption={handleSelectedOption} /> */}
              <h4>{'위키 작성 방법'}</h4>
              <p
                role={'presentation'}
                onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')}
                className={styles.wikiManual}
              >
                {'위키 문법 알아보기!'}&nbsp;{'\r'}
                <FaArrowUpRightFromSquare />
              </p>
            </div>
          </div>
          <div>
            <h4>{'문서 내용'}</h4>
            <div className={`${styles.editorbox}`}>
              <Editor value={desc} onChange={onEditorChange} />
            </div>
            <h4>{'히스토리 요약'}</h4>
            <textarea
              className={`${styles.summary}`}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={60}
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
            <button type={'button'} className={`${styles.submitWiki}`}>
              {'생성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WikiEdit
