import React from 'react'
import HSBar from 'react-horizontal-stacked-bar-chart'
import styles from './Graph.module.css'

function Graph({ total_point, docs }: any) {
  const getColor = (index: any) => {
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
  const contributions = docs.map((doc: any) => ({
    name: doc.doc_title,
    value: (doc.doc_point / total_point) * 100,

    // color: getColor(doc.doc_title),
    description: `${((doc.doc_point / total_point) * 100).toFixed(2)}%`,
  }))

  // Sort contributions by value in descending order
  contributions.sort((a: any, b: any) => b.value - a.value)

  // Select top 3 contributions, and calculate the "Other" contribution
  const topContributions = contributions.slice(0, 3)

  // Apply colors to top contributions based on their position
  topContributions.forEach((contribution: any, index: any) => {
    contribution.color = getColor(index) // Assuming getColor function returns appropriate colors
  })

  let otherContributionValue = 0
  contributions.slice(3).forEach((contribution: any) => {
    otherContributionValue += contribution.value
  })
  topContributions.push({
    name: '기타',
    value: otherContributionValue,
    description: `${otherContributionValue.toFixed(2)}%`,
    color: getColor(3),
  })

  // 이름을 10자로 제한하고 넘어가면 "..."으로 처리하는 함수
  const truncateString = (str: any, num: any) => {
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
          <HSBar id={'cb_bar'} height={22} data={topContributions} outlineWidth={0.2} outlineColor={'white'} />
        </div>
      </div>
      <div className={styles.legend}>
        {topContributions.map((item: any, index: any) => (
          <div className={styles.legendItem} key={index}>
            <div className={styles.legendColor} style={{ background: item.color }} />
            <div className={styles.legendLabel}>
              {/* <span className={styles.legendname}>{item.name}</span> */}
              {/* item.name을 8자로 제한하여 표시 */}
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
