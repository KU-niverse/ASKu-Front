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
            <div
              className={styles.versionContainer}
              onClick={() => {
                const encodedTitle = encodeURIComponent(doc.title)
                nav(`/wiki/${encodedTitle}`)
              }}
              role="button" // 버튼 역할을 추가하여 시각적 의미 부여
              tabIndex={0} // 키보드 접근성 추가
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Enter 또는 스페이스 키로도 nav 호출
                  e.preventDefault()
                  const encodedTitle = encodeURIComponent(doc.title)
                  nav(`/wiki/${encodedTitle}`)
                }
              }}
            >
              <img src={versionimg} alt={'버전이미지'} className={styles.versionIcon} />
            </div>
            <div className={styles.docTitleContainer}>
              <div
                className={styles.docTitle}
                role={'presentation'}
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
