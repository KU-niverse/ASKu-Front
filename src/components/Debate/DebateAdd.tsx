import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import plus from '../../img/Vector.png'
import styles from './DebateAdd.module.css'

const DebateAdd = ({ title }: any) => {
  const [debateListData, setDebateListData] = useState(null)
  const [isAdd, setIsAdd] = useState(false)
  const [word, setWord] = useState('')
  const [numb, setNumb] = useState(0)

  useEffect(() => {
    const takeDebateList = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/debate/list/${encodeURIComponent(title)}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          setDebateListData(res.data)
          setNumb(res.data.data.length)
        }
      } catch (error) {
        console.error(error)
      }
    }

    takeDebateList()
  }, [title]) // Fetch debate list data when the title changes

  const handleAddBtn = () => {
    setIsAdd(true)
  }

  const debateAdd = async () => {
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
        window.location.reload() // Refresh the page after successful creation
      } else {
        return alert('Failed to add debate.')
      }
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        return alert('로그인이 필요한 서비스 입니다.')
      }
      if (error.response.status === 400) {
        return alert('잘못된 입력입니다. ')
      }
      return alert('에러가 발생하였습니다. 잠시후 다시 시도해주세요')
    }
  }

  const handleNewDebate = () => {
    debateAdd()
  }

  return (
    <div>
      <div className={styles.addTitle}>
        <p className={styles.addTitleMain}>{title}</p>
        <p>
          {'문서의 다른 토론 ('}
          {numb}
          {')'}
        </p>
      </div>

      <div>
        <div className={isAdd ? styles.hidden : styles.inputContainer}>
          <button className={isAdd ? styles.hidden : styles.addBtn} onClick={handleAddBtn}>
            <img src={plus} />
          </button>
        </div>
        <div className={isAdd ? styles.inputContainer : styles.hidden}>
          <input
            className={styles.headerInput}
            type={'text'}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder={'생성할 토론방을 입력하세요.'}
          />
          <button className={styles.createBtn} onClick={handleNewDebate}>
            {'생성\r'}
          </button>
        </div>
      </div>
      <div className={styles.addLists}>
        {debateListData === null ? (
          <p className={styles.none}>{'데이터를 불러오는 중입니다.'}</p>
        ) : debateListData.data.length === 0 ? (
          <p>{'"최근 변경된 토론이 없습니다."'}</p>
        ) : (
          debateListData.data.map((item: any) => (
            <Link
              to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
              state={{ title: item.title, subject: item.subject, id: item.id }}
              className={styles.linkTo}
            >
              <ul key={item.id}>
                <span className={styles.listTitle}>{item.subject}</span>
              </ul>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default DebateAdd
