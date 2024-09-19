import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PopularDoc.module.css'
import watch from '../img/watch.png'
import verComp from '../img/verComp.png'
// import versionimg from '../img/version.svg'

interface HistoryBoxProps {
  title: string
  version: number
}

const PopularDoc = (props: HistoryBoxProps) => {
  const nav = useNavigate()

  const { title, version } = props // 구조 분해 할당

  return (
    <div className={styles.historyBox}>
      <div className={styles.contents}>
        <div className={styles.contentsOne}>
          <span className={styles.version}>
            {'V'}
            {version}
          </span>
        </div>
      </div>
      <div className={styles.allversionText}>
        <div className={styles.allversionBtns}>
          <div className={styles.docTitle}>
            <span
              role={'presentation'}
              onClick={() => {
                const encodedTitle = encodeURIComponent(title)
                nav(`/wiki/${encodedTitle}`)
              }}
            >
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularDoc
