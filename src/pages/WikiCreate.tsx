import { useState, useEffect, FormEvent, useCallback } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css'
import Header from '../components/Header'
import HtmlToWiki from '../components/Wiki/HtmlToWiki'

interface WikiCreateProps {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

interface OptionType {
  label: string
  value: string
}

const WikiCreate = ({ loggedIn, setLoggedIn }: WikiCreateProps) => {
  const nav = useNavigate()
  const location = useLocation()
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [selectedOption, setSelectedOption] = useState(null) // 드롭다운 옵션
  const [isChecked, setIsChecked] = useState(false)

  const from = location.state?.from || '/'
  // console.log(from)

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
    checkLoginStatus()
  }, [])

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  function onEditorChange(value: string) {
    setDesc(value)
    // console.log(value);
  }

  const handleCreateBtn = async (e: FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault()

    if (title.length > 30) {
      alert('제목은 30자 이내로 입력해주세요.')
      return false
    }

    const trimmedTitle = title.trim()
    if (desc.trim() === '') {
      alert('내용을 작성해주세요')
      return false
    }

    const wikiMarkup = HtmlToWiki(desc)

    if (!isChecked) {
      alert('정책에 맞게 작성하였음을 확인해주세요')
      return false
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/contents/new/${encodeURIComponent(trimmedTitle)}`,
        {
          text: wikiMarkup,
          type: 'doc',
        },
        {
          withCredentials: true,
        },
      )

      if (result.data.success === true) {
        alert('문서를 생성해주셔서 감사합니다.')
        nav(`/wiki/${encodeURIComponent(trimmedTitle)}`)
        return true
      }
      alert('문제가 발생하였습니다')
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
      alert(error.response?.data.message)
      return false
    }
  }

  const handleSelectedOption = (optionValue: OptionType) => {
    setSelectedOption(optionValue)
    // console.log(selectedOption);
  }

  const handleWikiManualClick = useCallback(() => {
    nav('/wiki/ASKu%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95')
  }, [nav])

  return (
    <div className={`${styles.container}`}>
      <Header />

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
            <div className={`${styles.editorbox}`}>
              <Editor value={desc} onChange={() => onEditorChange} />
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
    </div>
  )
}

export default WikiCreate
