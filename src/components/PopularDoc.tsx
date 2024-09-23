import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PopularDoc.module.css'
import versionimg from '../img/version.svg'

interface HistoryBoxProps {
  title: string
  version: number
}

const PopularDoc = (props: HistoryBoxProps) => {
  const nav = useNavigate()

  const { title, version } = props // 구조 분해 할당

  return (
    <div className={styles.contents}>
      <div className={styles.contentsOne}>
        <div className={styles.versionContainer}>
          <img src={versionimg} alt={'버전이미지'} className={styles.versionIcon} />
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
    </div>
  )
}

export default PopularDoc
