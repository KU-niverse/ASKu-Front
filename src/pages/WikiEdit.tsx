import { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import WikiToHtml from '../components/Wiki/WikiToHtml'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'
import WikiToQuill from '../components/Wiki/WikiToQuill'

interface WikiEditProps {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserInfo {
  is_authorized: number
}

interface WikiDocs {
  is_managed: number
  title: string
  content: string
  version: string
}

const WikiEdit = ({ loggedIn, setLoggedIn }: WikiEditProps) => {
  const { main, section } = useParams<{ main: string; section: string }>()
  const location = useLocation()

  const nav = useNavigate()
  const [desc, setDesc] = useState<string>('')
  const [wiki, setWiki] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [version, setVersion] = useState<string>('')
  const [copy, setCopy] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [wikiDocs, setWikiDocs] = useState<WikiDocs | null>(null)

  const from = location.state?.from || '/'
  const index_title = location.state?.index_title || ''

  // 로그인 체크 후 우회
  const checkLoginStatus = async (): Promise<void> => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
        return
      }
      if (res.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav('/')
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response?.status === 401) {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav('/')
        return
      }
      alert('에러가 발생하였습니다')
      nav('/')
    }
  }

  useEffect(() => {
    if (userInfo && wikiDocs) {
      if (wikiDocs.is_managed === 1 && userInfo.is_authorized === 0) {
        alert('인증받은 유저만 수정이 가능합니다.')
        nav(-1)
      }
    }
  }, [userInfo, wikiDocs, nav])

  useEffect(() => {
    checkLoginStatus()
  }, [])

  useEffect(() => {
    const wikiMarkup = HtmlToWiki(desc)
    console.log(wikiMarkup)
  }, [desc])

  const onEditorChange = (value: string) => {
    setDesc(value)
  }

  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  useEffect(() => {
    const getWiki = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${section}`, {
          withCredentials: true,
        })
        if (result.status === 200) {
          setDesc(WikiToQuill(`${result.data.title}\n${result.data.content}`))
          setVersion(result.data.version)
          setWikiDocs(result.data)
        }
      } catch (error) {
        console.error(error)
        if (error.response?.status === 401) {
          alert(error.response.data.message)
        } else {
          alert('잘못된 접근입니다. \n (이미지 최대 용량은 5MB입니다)')
        }
      }
    }

    getWiki()
    setCopy(false)
  }, [main, section])

  const addWikiEdit = async (e: FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault()

    if (desc.trim() === '') {
      alert('내용을 작성해주세요')
      return false
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (!isChecked) {
      alert('정책에 맞게 작성하였음을 확인해주세요')
      return false
    }
    if (summary.trim() === '') {
      alert('히스토리 요약을 작성해주세요')
      return false
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${section}`,
        {
          version,
          new_content: wikiMarkup,
          summary,
          is_q_based: 0,
          qid: 0,
          index_title,
        },
        {
          withCredentials: true,
        },
      )

      if (result.status === 200) {
        alert('수정이 완료되었습니다.')
        const encodedMain = encodeURIComponent(main)
        nav(`/wiki/${encodedMain}`)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.')
        return false
      }
      if (error.response?.status === 500) {
        alert('제출에 실패했습니다. 다시 시도해주세요.')
        return false
      }
      if (error.response?.status === 426) {
        alert('기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.')
        setCopy(true)
        return false
      }
      return false
    }
  }

  return (
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.edit}>
        <form onSubmit={addWikiEdit}>
          <div className={styles.wikichar}>
            <div className={styles.wikichar_title}>
              <h4>{'문서 제목'}</h4>
              <input type={'text'} disabled value={main} className={styles.title} />
            </div>
            <div className={styles.wikichar_char}>
              {/* <h4>문서 성격</h4> //문서 성격 선택 기능 제거 (대신 문서 작성 방법 투입 예정)
              <TypeDrop onSelectedOption={handleSelectedOption} /> */}
              <h4>{'위키 작성 방법'}</h4>
              <p
                role={'presentation'}
                onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')}
                className={styles.wikiManual}
              >
                {'위키 문법 알아보기!'}
                {'\r'}
                <FaArrowUpRightFromSquare />
              </p>
            </div>
          </div>
          <div>
            <h4>{'문서 내용'}</h4>
            <div className={styles.editorbox}>
              <Editor value={desc} onChange={onEditorChange} />
            </div>
            <h4>{'히스토리 요약'}</h4>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={styles.summary}
              maxLength={60}
              placeholder={'60자 이내로 작성해주세요'}
            />
          </div>
          <div className={styles.submitbox}>
            <span className={styles.chkdiv}>
              <input type={'checkbox'} checked={isChecked} onChange={handleCheckboxChange} className={styles.chkbox} />
              <a
                href={'https://034179.notion.site/e7421f1ad1064d2dbde0777d53766a7d'}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                {'정책에 맞게 작성하였음을 확인합니다.\r'}
              </a>
            </span>
            <input type={'submit'} value={'생성하기'} className={styles.submitWiki} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default WikiEdit
