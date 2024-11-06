import React, { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { track } from '@amplitude/analytics-browser'
import { useQuery, useMutation } from 'react-query'
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import WikiToHtml from '../components/Wiki/WikiToHtml'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'
import WikiToQuill from '../components/Wiki/WikiToQuill'
import Footer from '../components/Footer'

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

interface WikiDocs {
  is_managed: number
  title: string
  content: string
  version: string
}

const fetchLoginStatus = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return res.data
}

const fetchWikiContent = async (main: string, section: string) => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${section}`, {
    withCredentials: true,
  })
  return res.data
}

const WikiEdit = ({ loggedIn, setLoggedIn }: { loggedIn: boolean; setLoggedIn: (value: boolean) => void }) => {
  const { main, section } = useParams<{ main: string; section: string }>()
  const location = useLocation()
  const nav = useNavigate()
  const [desc, setDesc] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [version, setVersion] = useState<string>('')
  const [copy, setCopy] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [wikiDocs, setWikiDocs] = useState<WikiDocs | null>(null)

  const from = location.state?.from || '/'
  const index_title = location.state?.index_title || ''

  useQuery('loginStatus', fetchLoginStatus, {
    onSuccess: (data) => {
      if (data.success) {
        setLoggedIn(true)
        setUserInfo(data.user)
      } else {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav('/')
      }
    },
    onError: (error) => {
      console.error(error)
      setLoggedIn(false)
      alert('에러가 발생하였습니다')
      nav('/')
    },
  })

  const { data: wikiData } = useQuery(['wikiContent', main, section], () => fetchWikiContent(main!, section!), {
    onSuccess: (data) => {
      setDesc(WikiToQuill(`${data.title}\n${data.content}`))
      setVersion(data.version)
      setWikiDocs(data)
    },
    onError: (error) => {
      console.error(error)
      alert('잘못된 접근입니다. \n (이미지 최대 용량은 5MB입니다)')
    },
  })

  useEffect(() => {
    if (userInfo && wikiDocs) {
      if (wikiDocs.is_managed === 1 && userInfo.is_authorized === false) {
        alert('인증받은 유저만 수정이 가능합니다.')
        nav(-1)
      }
    }
  }, [userInfo, wikiDocs, nav])

  const mutation = useMutation(
    async (newContent: { version: string; new_content: string; summary: string }) => {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${section}`,
        { ...newContent, is_q_based: 0, qid: 0, index_title },
        { withCredentials: true },
      )
      return result.data
    },
    {
      onSuccess: () => {
        alert('수정이 완료되었습니다.')
        const encodedMain = encodeURIComponent(main!)
        nav(`/wiki/${encodedMain}`)
      },
      onError: (error: any) => {
        console.error(error)
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.')
          nav('/signin')
        } else if (error.response?.status === 500) {
          alert('제출에 실패했습니다. 다시 시도해주세요.')
        } else if (error.response?.status === 426) {
          alert('기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.')
          setCopy(true)
        }
      },
    },
  )

  useEffect(() => {
    track('view_edit_wiki', {
      title: main,
      type: 'section',
      section_id: section,
    })
  }, [main, section])

  const onEditorChange = (value: string) => {
    setDesc(value)
  }

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  const addWikiEdit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (desc.trim() === '') {
      alert('내용을 작성해주세요')
      return
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (!isChecked) {
      alert('정책에 맞게 작성하였음을 확인해주세요')
      return
    }
    if (summary.trim() === '') {
      alert('히스토리 요약을 작성해주세요')
      return
    }

    mutation.mutate({ version, new_content: wikiMarkup, summary })
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
            <h4 className={styles.QuesWikiManuText}>{'문서 내용'}</h4>
            <div className={styles.editorbox}>
              <Editor value={desc} onChange={onEditorChange} />
            </div>
            <h4 className={styles.QuesWikiManuText}>{'히스토리 요약'}</h4>
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
                <p className={`${styles.submitText} ${isChecked ? styles.active : ''}`}>
                  {'정책에 맞게 작성하였음을 확인합니다.\r'}
                </p>
              </a>
            </span>
            <button type={'submit'} className={`${styles.submitWiki} ${isChecked ? styles.active : ''}`}>
              {'생성하기'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default WikiEdit
