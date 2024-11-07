import React, { useState, useEffect, FormEvent, useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'
import TypeDrop from '../components/TypeDrop'

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

interface OptionType {
  label: string
  value: string
}

interface WikiCreateProps {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const fetchLoginStatus = async () => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/auth/issignedin`, { withCredentials: true })
  return res.data
}

const WikiCreate = ({ loggedIn, setLoggedIn }: WikiCreateProps) => {
  const nav = useNavigate()
  const location = useLocation()
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const queryClient = useQueryClient()

  const from = location.state?.from || '/'

  useQuery('loginStatus', fetchLoginStatus, {
    onSuccess: (data) => {
      if (data.success) {
        setLoggedIn(true)
        setUserInfo(data.user)
      } else {
        setLoggedIn(false)
        alert('로그인이 필요한 서비스 입니다.')
        nav(from)
      }
    },
    onError: (error: AxiosError) => {
      console.error(error)
      setLoggedIn(false)
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다')
        nav(from)
      } else if (error.response?.status === 500) {
        alert('에러가 발생하였습니다')
        nav(from)
      }
    },
  })

  useEffect(() => {
    track('view_create_wiki', {
      loged_in: loggedIn,
    })
  }, [loggedIn])

  const mutation = useMutation(
    async (newWiki: { title: string; text: string }) => {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/contents/new/${encodeURIComponent(newWiki.title)}`,
        {
          text: newWiki.text,
          type: 'doc',
        },
        {
          withCredentials: true,
        },
      )
      return result.data
    },
    {
      onSuccess: () => {
        alert('문서를 생성해주셔서 감사합니다.')
        nav(`/wiki/${encodeURIComponent(title)}`)
      },
      onError: (error: any) => {
        console.error(error)
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.')
          nav('/signin')
        } else if (error.response?.status === 500) {
          alert('제출에 실패했습니다. 다시 시도해주세요.')
        } else {
          alert(error.response?.data.message || '문제가 발생하였습니다')
        }
      },
    },
  )

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  const onEditorChange = (value: string) => {
    setDesc(value)
  }

  const handleCreateBtn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    track('click_complete_wiki_creation', {
      title,
    })

    if (title.length > 30) {
      alert('제목은 30자 이내로 입력해주세요.')
      return
    }

    const trimmedTitle = title.trim()
    if (desc.trim() === '') {
      alert('내용을 작성해주세요')
      return
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (!isChecked) {
      alert('정책에 맞게 작성하였음을 확인해주세요')
      return
    }

    mutation.mutate({ title: trimmedTitle, text: wikiMarkup })
  }

  const handleSelectedOption = (optionValue: OptionType) => {
    setSelectedOption(optionValue)
  }

  const handleWikiManualClick = useCallback(() => {
    nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')
  }, [nav])

  return (
    <div className={`${styles.container}`}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={`${styles.edit}`}>
        <form onSubmit={handleCreateBtn}>
          <div className={`${styles.wikichar}`}>
            <div className={`${styles.wikichar_title}`}>
              <h4>{'문서 제목'}</h4>
              <input
                required
                type={'text'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'제목을 입력하세요(30자 이내)'}
                className={`${styles.title}`}
              />
            </div>
            <div className={`${styles.wikichar_char}`}>
              <h4>{'위키 작성 방법'}</h4>
              <p role={'presentation'} onClick={handleWikiManualClick} className={styles.wikiManual}>
                {'위키 문법 알아보기!'}
                {'\r'}
                <FaArrowUpRightFromSquare />
              </p>
            </div>
          </div>
          <div>
            <h4>{'문서 내용'}</h4>
            <div className={`${styles.editorbox}`}>
              <Editor value={desc} onChange={onEditorChange} />
            </div>
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
            <input type={'submit'} value={'생성하기'} className={`${styles.submitWiki}`} />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default WikiCreate
