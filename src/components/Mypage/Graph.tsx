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
  const radius = 50
  const circumference = 2 * Math.PI * radius

  let cumulativeValue = 0

  const getColor = (index: number) => {
    const colors = ['#f9e482', '#f26262', '#6cd395', 'rgba(217, 217, 217, 1)']

    // Ensure index is within the valid range
    const validIndex = Math.min(Math.max(index, 0), colors.length - 1)

    return colors[validIndex]
  }

  // Calculate contributions and sort them
  const contributions = docs.map((doc: Document) => {
    // doc.percentage를 float로 변환, NaN인 경우 0으로 설정
    const percentage = parseFloat(doc.percentage)
    // eslint-disable-next-line no-restricted-globals
    const validPercentage = isNaN(percentage) ? 0 : percentage
    return {
      name: doc.doc_title,
      value: validPercentage * 10000,
      description: `${(validPercentage * 100).toFixed(2)}%`,
      color: '', // Initialize color property
    }
  })

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
    description: `${(otherContributionValue * 0.01).toFixed(2)}%`,
    color: getColor(3),
  })

  // 이름의 길이를 num으로 제한하고 넘어가면 "..."으로 처리하는 함수
  const truncateString = (str: string, num: number) => {
    if (str.length > num) {
      return `${str.slice(0, num)}...`
    }
    return str
  }

  return (
    <div className={styles.g_container}>
      <div className={styles.legend}>
        {updatedTopContributions.map((item: Contribution) => (
          <div className={styles.legendItem} key={item.name}>
            <div className={styles.legendColor} style={{ background: item.color }} />
            <div className={styles.legendLabel}>
              <span className={styles.legendname}>{truncateString(item.name, 15)}</span>
              <span className={styles.legendper}> {item.description}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.graphContainer}>
        <svg className={styles.doughnut} viewBox={'0 0 120 120'}>
          {updatedTopContributions.map((item, index) => {
            const offset = cumulativeValue * circumference
            const value = item.value / 10000
            const strokeDasharray = `${value * circumference} ${circumference}`
            cumulativeValue += value
            return (
              <circle
                key={item.name}
                r={radius}
                cx={'60'}
                cy={'60'}
                fill={'transparent'}
                stroke={item.color}
                strokeWidth={'20'}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-offset}
              />
            )
          })}
        </svg>
        <div className={styles.centerText}>{`${total_point}P`}</div>
      </div>
    </div>
  )
}

export default Graph
