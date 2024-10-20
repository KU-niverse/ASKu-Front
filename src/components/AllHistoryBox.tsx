import { useNavigate } from 'react-router-dom'
import styles from './HistoryBox.module.css'
import ThreedotsReport from './ThreedotsReport'
import versionimg from '../img/version.svg'
import rawView from '../img/watch.svg'
import verCmp from '../img/verComp.svg'

interface HistoryBoxProps {
  title: string
  version: number
  summary: string
  user: string
  timestamp: string
  target: number
  type: string
}

const AllHistoryBox = (props: HistoryBoxProps) => {
  const { title, version, summary, user, timestamp, target, type } = props
  const nav = useNavigate()

  const handleRawView = () => {
    const encodedTitle = encodeURIComponent(title)
    nav(`/wiki/preview/${encodedTitle}/${version}`)
  }

  const handleCompare = () => {
    if (type === 'create') {
      alert('새로 생성된 문서 히스토리는 지원하지 않는 기능입니다')
    } else if (version === 1) {
      alert('첫번째 히스토리는 지원하지 않는 기능입니다')
    } else {
      const encodedTitle = encodeURIComponent(title)
      nav(`/history/${encodedTitle}/diff/${version}`)
    }
  }

  return (
    <div className={styles.allHistoryBox}>
      <div className={styles.contentsOne}>
        <div className={styles.versionContainer}>
          <img className={styles.versionimg} src={versionimg} alt={'버전이미지'} />
          <div className={styles.version}>
            {'V'}
            {version}
          </div>
        </div>
        <div className={styles.docTitleContainer}>
          <div
            role={'presentation'}
            className={styles.docTitle}
            onClick={() => {
              const encodedTitle = encodeURIComponent(title)
              nav(`/wiki/${encodedTitle}`)
            }}
          >
            {title}
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
              {'RAW 버전 미리보기\r'}
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
            {'RAW 버전 미리보기\r'}
          </span>
          <span role={'presentation'} onClick={handleCompare} className={`${styles.versionbtn}`}>
            <img className={styles.vercmpimg} src={verCmp} alt={'전 버전이랑 비교하기 버튼'} />
            {'전 버전이랑 비교하기\r'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllHistoryBox
