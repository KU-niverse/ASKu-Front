import React from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './HistoryBox.module.css'
import dots from '../img/dots.png'
import rollback from '../img/return.png'
import watch from '../img/watch.png'
import verComp from '../img/verComp.png'
import ThreedotsReport from './ThreedotsReport'

interface HistoryBoxProps {
  title: string
  version: number
  summary: string
  user: string
  timestamp: string
  doctitle: string
  target: number
  type: string
}

const HistoryBox = (props: HistoryBoxProps) => {
  const nav = useNavigate()

  const { title, version, summary, user, timestamp, doctitle, target, type } = props // 구조 분해 할당

  const handleView = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/preview/${encodedTitle}/${version}`)
  }

  const { mutate: handleRollback, isLoading: isRollbackLoading } = useMutation(
    async () => {
      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${version}`,
        {},
        { withCredentials: true },
      )
      return result.data
    },
    {
      onSuccess: (data) => {
        alert(data.message)
        const encodedTitle = encodeURIComponent(title)
        nav(`/wiki/${encodedTitle}`)
      },
      onError: (error: AxiosError) => {
        console.error(error)
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다')
          nav('/signin')
        } else if (error.response?.status === 432) {
          alert(error.response.data)
        }
      },
    },
  )

  const handleCompare = () => {
    if (type === 'create') {
      alert('새로 생성된 문서 히스토리는 지원하지 않는 기능입니다')
    }
    if (version === 1) {
      alert('첫번째 히스토리는 지원하지 않는 기능입니다')
    }
    const encodedTitle = encodeURIComponent(title)
    nav(`/history/${encodedTitle}/diff/${version}`)
  }

  return (
    <div className={styles.historyBox}>
      <div className={styles.contents}>
        <div className={styles.contentsOne}>
          <span className={styles.version}>
            {'V'}
            {version}
          </span>
          <span className={styles.summary}>
            {'수정요약: '}
            {summary}
          </span>
        </div>
        <div className={styles.contentsTwo}>
          <span className={styles.user}>{user}</span>
          <span className={styles.timestamp}>{timestamp}</span>
          <span className={styles.threedot}>
            <ThreedotsReport type={1} target={target} />
          </span>
        </div>
      </div>
      <div className={styles.allversionText}>
        <div className={styles.allversionBtns}>
          <div className={styles.docTitle}>
            <span
              role={'presentation'}
              className={styles.docTitle}
              onClick={() => {
                const encodedTitle = encodeURIComponent(title)
                nav(`/wiki/${encodedTitle}`)
              }}
            >
              {title}
            </span>
          </div>
          <div className={styles.allVerBtn}>
            <span role={'presentation'} onClick={handleView} className={`${styles.versionbtn}`}>
              <img src={watch} alt={'RAW버전 미리보기 버튼'} />
              {'RAW버전 미리보기\r'}
            </span>
            <span role={'presentation'} onClick={handleCompare} className={`${styles.versionbtn}`}>
              <img src={verComp} alt={'전 버전이랑 비교하기 버튼'} />
              {'전 버전이랑 비교하기\r'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryBox