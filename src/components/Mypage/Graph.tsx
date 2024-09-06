import React from 'react'
import HSBar from 'react-horizontal-stacked-bar-chart'
import styles from './Graph.module.css'

interface Document {
  doc_title: string // 문서 제목
  doc_id: number // 문서 ID
  doc_point: string // 문서 포인트
  percentage: string // 백분율 (문자열)
}

interface GraphProps {
  total_point: number // 전체 포인트
  docs: Document[] // 문서 목록
}

interface Contribution {
  name: string
  value: number
  description: string
  color?: string // Optional
}

function Graph({ total_point, docs }: GraphProps) {
  const getColor = (index: number) => {
    const colors = [
      'rgba(251, 108, 108, 1)',
      'rgba(255, 214, 0, 1)',
      'rgba(251, 193, 108, 1)',
      'rgba(217, 217, 217, 1)',
    ]

    // Ensure index is within the valid range
    const validIndex = Math.min(Math.max(index, 0), colors.length - 1)

    return colors[validIndex]
  }

  // Calculate contributions and sort them
  const contributions = docs.map((doc: Document) => ({
    name: doc.doc_title,
    value: parseFloat(doc.percentage) * 10000,
    description: `${(parseFloat(doc.percentage) * 100).toFixed(2)}%`,
    color: '', // Initialize color property
  }))

  // Sort contributions by value in descending order
  contributions.sort((a: Contribution, b: Contribution) => b.value - a.value)

  // Select top 3 contributions, and calculate the "Other" contribution
  const topContributions = contributions.slice(0, 3)

  // Apply colors to top contributions based on their position
  const updatedTopContributions = topContributions.map((contribution: Contribution, index: number) => ({
    ...contribution,
    color: getColor(index),
  }))

  let otherContributionValue = 0
  contributions.slice(3).forEach((contribution: Contribution) => {
    otherContributionValue += contribution.value
  })

  updatedTopContributions.push({
    name: '기타',
    value: otherContributionValue,
    description: `${otherContributionValue.toFixed(2)}%`,
    color: getColor(3),
  })

  // 이름을 10자로 제한하고 넘어가면 "..."으로 처리하는 함수
  const truncateString = (str: string, num: number) => {
    if (str.length > num) {
      return `${str.slice(0, num)}...`
    }
    return str
  }

  return (
    <div className={styles.g_container}>
      <p className={styles.g_name}>{'문서별 기여도'}</p>
      <div
        style={{
          borderRadius: '100px',
          height: '22px',
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 'calc(100% + 2px)',
            height: '100%',
            position: 'absolute',
            left: '-1px',
            top: '50%', // 중앙으로 위치시킵니다
            transform: 'translateY(-50%)', // 높이의 50%만큼 위로 이동시킵니다
          }}
        >
          <HSBar id={'cb_bar'} height={22} data={updatedTopContributions} outlineWidth={0.2} outlineColor={'white'} />
        </div>
      </div>
      <div className={styles.legend}>
        {updatedTopContributions.map((item: Contribution) => (
          <div className={styles.legendItem} key={item.name}>
            <div className={styles.legendColor} style={{ background: item.color }} />
            <div className={styles.legendLabel}>
              <span className={styles.legendname}>{truncateString(item.name, 8)}</span>
              <span className={styles.legendper}> {item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Graph
