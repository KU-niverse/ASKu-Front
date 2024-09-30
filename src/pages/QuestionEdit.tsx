import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, QueryFunctionContext } from 'react-query'
import axios, { AxiosError } from 'axios'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Editor from '../components/Quill2'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import QuestionFor from '../components/QuestionFor'
import WikiDropDown from '../components/WikiDropDown'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'
import WikiToQuill from '../components/Wiki/WikiToQuill'
import SpinnerMypage from '../components/SpinnerMypage'

interface QuestionEditProps {
  loggedIn: boolean
  setLoggedIn: (loggedIn: boolean) => void
}

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
  text?: string
  version: string
  is_managed?: number
}

const QuestionEdit = ({ loggedIn, setLoggedIn }: QuestionEditProps) => {
  const nav = useNavigate()
  const { main } = useParams<{ main: string }>()
  const location = useLocation()
  const stateData = location.state as any
  const [desc, setDesc] = useState('')
  const [summary, setSummary] = useState('')
  const [version, setVersion] = useState('')
  const [copy, setCopy] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedTitle, setSelectedTitle] = useState(stateData.index_title)
  const [isOptDisabled, setIsOptDisabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [wikiDocs, setWikiDocs] = useState<WikiDocs>({ version: '' })
  const [loading, setLoading] = useState(true)

  const { qid } = stateData
  const from = stateData.from || '/'

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  const onEditorChange = (value: any) => {
    setDesc(value)
  }

  const fetchWiki = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
    const [, url] = queryKey
    const { data } = await axios.get(url, { withCredentials: true })
    return data
  }

  const { data: allWikiData, refetch: refetchAllWiki } = useQuery(
    ['wiki', `${process.env.REACT_APP_HOST}/wiki/contents/${main}`],
    fetchWiki,
    {
      enabled: false,
      onSuccess: (data) => {
        setDesc(WikiToQuill(data.text))
        setVersion(data.version)
        setWikiDocs(data)
      },
      onError: (error: AxiosError) => {
        console.error(error)
        alert('잘못된 접근입니다.')
        nav('/')
      },
    },
  )

  const { data: wikiSectionData, refetch: refetchWikiSection } = useQuery(
    ['wikiSection', `${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${selectedOption}`],
    fetchWiki,
    {
      enabled: false,
      onSuccess: (data) => {
        setDesc(WikiToQuill(`${data.title}\n${data.content}`))
        setVersion(data.version)
        setWikiDocs(data)
      },
      onError: (error: AxiosError) => {
        console.error(error)
        alert('잘못된 접근입니다.')
        nav('/')
      },
    },
  )

  const { data: sameIndexData, refetch: refetchSameIndex } = useQuery(
    ['sameIndex', `${process.env.REACT_APP_HOST}/wiki/contents/question/${qid}`],
    fetchWiki,
    {
      onSuccess: (data) => {
        if (data.based_on_section) {
          setSelectedOption(data.section)
        } else {
          setSelectedOption('all')
          setIsOptDisabled(true)
        }
      },
      onError: (error: AxiosError) => {
        console.error(error)
        alert('로그인이 필요합니다.')
        nav(from)
      },
    },
  )

  useEffect(() => {
    refetchSameIndex()
  }, [qid])

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === 'all') {
        refetchAllWiki()
      } else {
        refetchWikiSection()
      }
      setLoading(false)
    }
  }, [selectedOption])

  useEffect(() => {
    if (userInfo && wikiDocs.is_managed === 1 && userInfo.is_authorized === false) {
      alert('인증받은 유저만 수정이 가능합니다.')
      nav(-1)
    }
  }, [userInfo, wikiDocs])

  const mutation = useMutation((newContent: { url: string; payload: any }) => {
    return axios.post(newContent.url, newContent.payload, { withCredentials: true })
  })

  const addWikiEdit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!desc.trim()) {
      alert('내용을 작성해주세요')
      return
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (!isChecked) {
      alert('정책에 맞게 작성하였음을 확인해주세요')
      return
    }

    if (!summary) {
      alert('히스토리 요약을 작성해주세요')
      return
    }

    const payload = {
      version,
      new_content: wikiMarkup,
      summary,
      is_q_based: 1,
      qid,
      index_title: selectedOption === 'all' ? '전체' : selectedTitle,
    }

    const url =
      selectedOption === 'all'
        ? `${process.env.REACT_APP_HOST}/wiki/contents/${main}`
        : `${process.env.REACT_APP_HOST}/wiki/contents/${main}/section/${selectedOption}`

    mutation.mutate(
      { url, payload },
      {
        onSuccess: () => {
          alert('수정이 완료되었습니다.')
          nav(`/wiki/${main}`)
        },
        onError: (error: AxiosError) => {
          console.error(error)
          if (error.response?.status === 401) {
            alert('login이 필요합니다.')
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
  }

  const handleSelectedOption = (optionValue: any) => {
    setSelectedOption(optionValue)
  }

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
    <div className={styles.container}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.edit}>
        <div>
          <QuestionFor
            nick={stateData.nick}
            content={stateData.content}
            like_count={stateData.like_count}
            created_at={stateData.created_at}
            badge_image={stateData.badge_image}
            id={stateData.qid}
            user_id={stateData.user_id}
            answer_count={stateData.answer_count || 0}
            title={stateData.title || '제목 없음'}
            index_title={stateData.index_title || '전체'}
          />
        </div>
        <form onSubmit={addWikiEdit}>
          <div className={styles.wikiQues_header}>
            <div className={styles.wikichar_title}>
              <h4>{'문서 제목'}</h4>
              <input type={'text'} required disabled value={main} className={styles.title} />
            </div>
            <div className={styles.wikiQues_lists}>
              <h4>{'목차'}</h4>
              <div className={styles.q_dropdown}>
                <WikiDropDown
                  defaultOpt={selectedTitle}
                  onSelectedOption={handleSelectedOption}
                  onSelectedTitle={handleSelectedTitle}
                  title={main}
                  isOptionDisabled={isOptDisabled}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.QuesWikiManu}>
              <h4>{'문서 내용'}</h4>
              <p
                role={'presentation'}
                onClick={() => nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')}
                className={styles.wikiManual}
              >
                {'위키 문법 알아보기!'}&nbsp;
                <FaArrowUpRightFromSquare />
              </p>
            </div>
            <div className={styles.editorbox2}>
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
            <button type={'submit'} className={styles.submitWiki}>
              {'생성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionEdit
