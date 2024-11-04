import React from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './HistoryBox.module.css'
import dots from '../img/dots.png'
import rollback from '../img/redo.svg'
import rawView from '../img/watch.svg'
import verCmp from '../img/verComp.svg'
import ThreedotsReport from './ThreedotsReport'
import versionimg from '../img/version.svg'

interface HistoryBoxProps {
  title: string
  version: number
  summary: string
  user: string
  timestamp: string
  target: number
  type: string
  newest: number
}

interface ErrorResponse {
  status: number
  message: string
}

const HistoryBox = (props: HistoryBoxProps) => {
  const nav = useNavigate()

  const { title, version, summary, user, timestamp, target, type, newest } = props // 구조 분해 할당

  const handleRawView = () => {
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
      <div className={styles.contentsOne}>
        <div className={styles.bigversionContainer}>
          <img className={styles.bigversionimg} src={versionimg} alt={'버전이미지'} />
          <div className={styles.bigversion}>
            {'V'}
            {version}
          </div>
        </div>
      </div>
      <div className={styles.verticalLine} />
      {/* 웹 뷰 오른쪽 contents */}
      <div className={styles.contentsTwo}>
        <div className={styles.summaryContainer}>
          <div className={styles.summaryTitle}>{'수정 요약: '}</div>
          <div className={styles.summary}>{summary}</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.infoLine}>
            <div className={styles.user}>{user}</div>
            <div className={styles.timestamp}>{timestamp}</div>
            <div className={styles.threedot}>
              <ThreedotsReport type={1} target={target} />
            </div>
          </div>
          <div className={styles.allversionBtns}>
            <span role={'presentation'} onClick={handleRawView} className={`${styles.versionbtn}`}>
              <img className={styles.rawviewimg} src={rawView} alt={'RAW 버전 미리보기 버튼'} />
              {'RAW버전 미리보기\r'}
            </span>
            <span
              role={'presentation'}
              onClick={version === newest ? () => alert('최신 버전으로는 롤백할 수 없습니다.') : () => handleRollback()}
              className={`${styles.versionbtn}`}
            >
              {isRollbackLoading ? (
                '롤백 중...'
              ) : (
                <>
                  <img className={styles.rollbackimg} src={rollback} alt={'이 버전으로 되돌리기 버튼'} />{' '}
                  {'이 버전으로 되돌리기\r'}
                </>
              )}
            </span>
            <span role={'presentation'} onClick={handleCompare} className={`${styles.versionbtn}`}>
              <img className={styles.vercmpimg} src={verCmp} alt={'전 버전이랑 비교하기 버튼'} />
              {'전 버전이랑 비교하기\r'}
            </span>
          </div>
        </div>
      </div>

      {/* 모바일 뷰 오른쪽 contents */}
      <div className={styles.mobileContentsTwo}>
        <div className={styles.infoLine}>
          <div className={styles.user}>{user}</div>
          <div className={styles.timestamp}>{timestamp}</div>
          <div className={styles.threedot}>
            <ThreedotsReport type={1} target={target} />
          </div>
        </div>
        <div className={styles.summaryContainer}>
          <div className={styles.summaryTitle}>{'수정 요약: '}</div>
          <div className={styles.summary}>{summary}</div>
        </div>
        <div className={styles.allversionBtns}>
          <span role={'presentation'} onClick={handleRawView} className={`${styles.versionbtn}`}>
            <img className={styles.rawviewimg} src={rawView} alt={'RAW 버전 미리보기 버튼'} />
            {'RAW버전 미리보기\r'}
          </span>
          <span role={'presentation'} onClick={handleCompare} className={`${styles.versionbtn}`}>
            <img className={styles.vercmpimg} src={verCmp} alt={'전 버전이랑 비교하기 버튼'} />
            {'전 버전이랑 비교하기\r'}
          </span>
          <span
            role={'presentation'}
            onClick={version === newest ? () => alert('최신 버전으로는 롤백할 수 없습니다.') : () => handleRollback()}
            className={`${styles.versionbtn}`}
          >
            {isRollbackLoading ? (
              '롤백 중...'
            ) : (
              <>
                <img className={styles.rollbackimg} src={rollback} alt={'이 버전으로 되돌리기 버튼'} />{' '}
                {'이 버전으로 되돌리기\r'}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HistoryBox
