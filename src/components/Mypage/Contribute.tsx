import styles from './Contribute.module.css'

interface ContributeProps {
  user_id: number
  doc_id: number
  text_pointer: string
  version: number
  summary: string
  created_at: Date
  count: number
  diff: number
  is_bad: boolean
  is_rollback: boolean
  is_q_based: boolean
  title: string
}

function Contribute({
  title,
  user_id,
  doc_id,
  text_pointer,
  version,
  summary,
  created_at,
  count,
  diff,
  is_bad,
  is_rollback,
  is_q_based,
}: ContributeProps) {
  // 주어진 created_at 값을 그대로 사용하여 Date 객체 생성
  const utcDate = new Date(created_at)

  // UTC 시간에 9시간을 더함
  utcDate.setHours(utcDate.getHours() + 9)

  // 날짜와 시간을 표시
  // const formattedDate = utcDate.toISOString().replace('T', ' ').replace('.000Z', '').replace(/-/g, '.')

  // 날짜만 표시
  const formattedDate = utcDate.toISOString().slice(0, 10).replace(/-/g, '.')
  const maxLength = 80

  // 글자 수가 maxLength를 넘으면 뒤에 "..."을 붙이고 아니면 그대로 반환
  const truncateContent = (text: string) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
  }
  const displayDiff = diff < 0 ? 0 : diff

  return (
    <div className={styles.cb_list}>
      <div className={styles.cb_front}>
        <span className={styles.cb_index}>
          {title}
          <span className={styles.cb_summary}>
            {' - '}
            {summary}
          </span>
        </span>
      </div>
      <div className={styles.back}>
        <span className={styles.cb_num}>
          {'+'}
          {displayDiff}
          {'p'}
        </span>
        <span className={styles.cb_time}>{formattedDate}</span>
      </div>
    </div>
  )
}

export default Contribute
