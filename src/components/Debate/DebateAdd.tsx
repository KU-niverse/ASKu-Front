import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import plus from '../../img/Vector.png'
import styles from './DebateAdd.module.css'

interface DebateItem {
  id: number
  title: string
  subject: string
}

interface DebateListResponse {
  success: boolean
  data: DebateItem[]
}

function useDebateList(title: string) {
  return useQuery<DebateListResponse, AxiosError>(
    ['debateList', title],
    async () => {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/debate/list/${encodeURIComponent(title)}`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      enabled: !!title, // title이 있을 때만 쿼리 실행
      retry: false,
      onError: (error: AxiosError) => {
        console.error('토론 목록 가져오기 에러:', error)
        // 필요에 따라 에러 처리 로직 추가
      },
    },
  )
}

function useCreateDebate(title: string) {
  return useMutation<DebateListResponse, AxiosError, { subject: string }>(
    async ({ subject }) => {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/debate/new/${encodeURIComponent(title)}`,
        { subject },
        { withCredentials: true },
      )
      return response.data
    },
    {
      onSuccess: () => {
        alert('토론이 성공적으로 생성되었습니다.')
        window.location.reload()
      },
      onError: (error: AxiosError) => {
        console.error('토론 생성 에러:', error)
        if (error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.')
        } else if (error.response?.status === 400) {
          alert('잘못된 입력입니다.')
        } else {
          alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
        }
      },
    },
  )
}

const DebateAdd = ({ title }: { title: string }) => {
  const [isAdd, setIsAdd] = useState(false)
  const [word, setWord] = useState('')

  const { isLoading, error, data: debateListData } = useDebateList(title)
  const { mutate: createDebate } = useCreateDebate(title)

  const handleAddBtn = () => {
    setIsAdd(true)
  }

  const handleNewDebate = () => {
    createDebate({ subject: word })
    setWord('') // 입력 필드 초기화
    setIsAdd(false)
  }

  return (
    <div>
      <div className={styles.addTitle}>
        <p className={styles.addTitleMain}>{title}</p>
        <p>
          {'문서의 다른 토론 ('}
          {debateListData?.data.length ?? 0} {/* 옵셔널 체이닝 및 nullish 병합 연산자 사용 */}
          {')'}
        </p>
      </div>

      <div>
        <div className={isAdd ? styles.hidden : styles.inputContainer}>
          <button
            type="button"
            className={isAdd ? styles.hidden : styles.addBtn}
            onClick={handleAddBtn}
            aria-label="토론방 추가 버튼"
          >
            <img src={plus} alt="토론방 추가 버튼" />
          </button>
        </div>
        <div className={isAdd ? styles.inputContainer : styles.hidden}>
          <input
            className={styles.headerInput}
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="생성할 토론방을 입력하세요."
          />
          <button type="button" className={styles.createBtn} onClick={handleNewDebate}>
            생성
          </button>
        </div>
      </div>

      <div className={styles.addLists}>
        {isLoading ? (
          <p className={styles.none}>{'데이터를 불러오는 중입니다.'}</p>
        ) : error ? (
          <p className={styles.none}>{'에러: 토론 목록을 불러오지 못했습니다.'}</p>
        ) : debateListData?.data.length === 0 ? ( // 옵셔널 체이닝 사용
          <p>{'"최근 변경된 토론이 없습니다."'}</p>
        ) : (
          debateListData?.data.map((item: DebateItem) => (
            <Link
              key={item.id}
              to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
              state={{ title: item.title, subject: item.subject, id: item.id }}
              className={styles.linkTo}
            >
              <ul>
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
