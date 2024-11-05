import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './RandomDoc.module.css'
import versionimg from '../img/version.svg'

// 랜덤 문서 데이터 타입 정의
interface RandomDocItem {
  title: string
}
interface RandomDocProps {
  randomDocs?: RandomDocItem[]
}

// 랜덤 문서 컴포넌트 정의
const RandomDoc: React.FC<RandomDocProps> = ({ randomDocs }) => {
  const nav = useNavigate()

  return (
    <div className={styles.randomDocContainer}>
      {randomDocs?.map((doc) => (
        <div className={styles.contentsOne}>
          <div key={doc.title} className={styles.contents}>
            <div className={styles.versionContainer}>
              <img src={versionimg} alt={'버전이미지'} className={styles.versionIcon} />
            </div>
            <div className={styles.docTitleContainer}>
              <div
                role={'presentation'}
                className={styles.docTitle}
                onClick={() => {
                  const encodedTitle = encodeURIComponent(doc.title)
                  nav(`/wiki/${encodedTitle}`)
                }}
              >
                {doc.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
RandomDoc.defaultProps = {
  randomDocs: [],
}

export default RandomDoc
