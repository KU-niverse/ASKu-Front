import React from 'react'
import styles from './WikiGraph.module.css'

interface User {
  nickname: string
  point: number
}

interface Contribution {
  name: string
  value: number
  description: string
  color: string
}

interface WikiGraphProps {
  total_point: number
  users: User[]
}

function WikiGraph({ total_point, users }: WikiGraphProps) {
  const getColor = (index: number): string => {
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
  const contributions: Contribution[] = users.map((user: User, index: number) => ({
    name: user.nickname,
    value: (user.point / total_point) * 100,
    color: getColor(index % 4),
    description: `${((user.point / total_point) * 100).toFixed(2)}%`,
  }))

  // Sort contributions by value in descending order
  contributions.sort((a, b) => b.value - a.value)

  // Select top 3 contributions, and calculate the "Other" contribution
  const topContributions = contributions.slice(0, 3)

  let otherContributionValue = 0
  contributions.slice(3).forEach((contribution: Contribution) => {
    otherContributionValue += contribution.value
  })
  topContributions.push({
    name: '기타',
    value: otherContributionValue,
    description: `${otherContributionValue.toFixed(2)}%`,
    color: getColor(3),
  })

  const radius = 50
  const circumference = 2 * Math.PI * radius

  let cumulativeValue = 0

  return (
    <div className={styles.g_container}>
      <p className={styles.g_name}>문서별 기여도</p>
      <div className={styles.graphAndLegend}>
        <div className={styles.legend}>
          {topContributions.map((item: Contribution) => (
            <div className={styles.legendItem} key={item.name}>
              <div className={styles.legendColor} style={{ background: item.color }} />
              <div className={styles.legendLabel}>
                <span className={styles.legendname}>{item.name}</span>
                <span className={styles.legendper}> {item.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.graphContainer}>
          <svg className={styles.doughnut} viewBox="0 0 120 120">
            {topContributions.map((item, index) => {
              const offset = cumulativeValue * circumference
              const value = item.value / 100
              const strokeDasharray = `${value * circumference} ${circumference}`
              cumulativeValue += value

              return (
                <circle
                  key={item.name}
                  r={radius}
                  cx="60"
                  cy="60"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-offset}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default WikiGraph
