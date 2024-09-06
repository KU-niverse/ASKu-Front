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
  target: number
  type: string
}

interface ErrorResponse {
  status: number
  message: string
}

const HistoryBox = (props: HistoryBoxProps) => {
  const nav = useNavigate()

  const { title, version, summary, user, timestamp, target, type } = props // 구조 분해 할당

  const handleView = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/preview/${encodedTitle}/${version}`)
  }

  // useMutation을 사용하여 롤백 처리
  const { mutate: handleRollback, isLoading: isRollbackLoading } = useMutation<unknown, AxiosError>(
    async () => {
      const returnValue = window.confirm('정말 롤백하시겠습니까?\n(한번 롤백한 문서는 다시 되돌릴 수 없습니다.)')

      if (returnValue) {
        // 사용자가 확인을 누른 경우에만 롤백 요청
        const result = await axios.post(
          `${process.env.REACT_APP_HOST}/wiki/historys/${title}/version/${version}`,
          {},
          { withCredentials: true },
        )
        return result.data.message
      }
      throw new Error('롤백이 취소되었습니다.') // 롤백 취소 시 에러 발생
    },
    {
      onSuccess: (message) => {
        alert(message)
        const encodedTitle = encodeURIComponent(title)
        nav(`/wiki/${encodedTitle}`)
      },
      onError: (error: AxiosError) => {
        console.error(error)
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다')
          nav('/signin')
        } else if (error.response?.status === 432 || error.response?.status === 403) {
          const errorResponse = error.response.data as ErrorResponse
          alert(errorResponse.message)
        }
      },
    },
  )

  const handleCompare = () => {
    if (version === 1) {
      alert('첫번째 히스토리는 지원하지 않는 기능입니다')
    } else {
      const encodedTitle = encodeURIComponent(title)
      nav(`/history/${encodedTitle}/diff/${version}`)
    }
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
      <div className={styles.versionText}>
        <div />
        <div className={styles.versionBtns}>
          <span role={'presentation'} onClick={handleView} className={`${styles.versionbtn}`}>
            <img alt={'RAW버전 미리보기 버튼'} src={watch} />
            {'RAW버전 미리보기\r'}
          </span>
          <span role={'presentation'} onClick={() => handleRollback()} className={`${styles.versionbtn}`}>
            {isRollbackLoading ? (
              '롤백 중...'
            ) : (
              <>
                <img alt={'이 버전으로 되돌리기 버튼'} src={rollback} /> {'이 버전으로 되돌리기\r'}
              </>
            )}
          </span>
          <span role={'presentation'} onClick={handleCompare} className={`${styles.versionbtn}`}>
            <img alt={'전 버전이랑 비교하기 버튼'} src={verComp} />
            {'전 버전이랑 비교하기\r'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HistoryBox
