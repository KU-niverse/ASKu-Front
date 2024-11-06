/* eslint-disable no-alert */
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './DebateAdd.module.css'
import addButton from '../../img/addButton.svg'
import submit from '../../img/send.png'

interface DebateAddProps {
  title: string
}

const DebateAdd = ({ title }: DebateAddProps) => {
  const [IsClick, setIsClick] = useState(false)
  const [word, setWord] = useState('')
  const [num, setNum] = useState(0)

  const handleClick = () => {
    setIsClick(true)
  }

  // eslint-disable-next-line consistent-return
  const useCreateDebate = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/debate/new/${encodeURIComponent(title)}`,
        {
          subject: word,
        },
        {
          withCredentials: true,
        },
      )
      if (response.data.success) {
        alert(response.data.message)
        window.location.reload() // 토론 생성 후 새로고침
      } else {
        return alert('Failed to add debate.')
      }
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        return alert('로그인이 필요한 서비스 입니다.')
      }
      if (error.response.status === 400) {
        alert('잘못된 입력입니다. ')
      } else {
        return alert('에러가 발생하였습니다. 잠시후 다시 시도해주세요')
      }
    }
  }

  const handleCreate = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCreateDebate()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleCreate()
    }
  }

  useEffect(() => {
    const takeDebateList = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/debate/list/${encodeURIComponent(title)}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          setNum(res.data.data.length)
        }
      } catch (error) {
        console.error(error)
      }
    }

    takeDebateList()
  }, [title])

  return (
    <div>
      <div className={styles.addPart}>
        <b className={styles.addTitle}>
          {title}
          {' 토론방 생성'}
        </b>
        <p className={styles.subTitle}>
          {'문서의 다른 토론('}
          {num}
          {')'}
        </p>
      </div>

      <div>
        <button className={IsClick ? styles.none : styles.addButton} onClick={handleClick} type={'submit'}>
          <img src={addButton} alt={'생성'} className={styles.plusIcon} />
        </button>
        <div className={IsClick ? styles.addInput : styles.none}>
          <div className={styles.textbox}>
            <textarea
              className={styles.textarea}
              placeholder={'생성할 토론방을 입력하세요.'}
              // eslint-disable-next-line arrow-parens
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={handleKeyDown}
            >
              {word}
            </textarea>
            <img
              className={word ? styles.sendBtn_red : styles.sendBtn_grey}
              role={'presentation'}
              src={submit}
              alt={'submit'}
              onClick={handleCreate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebateAdd
