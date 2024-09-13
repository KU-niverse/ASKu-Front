import haho from '../../img/haho.png'
import styles from './MyBadge.module.css'

interface MyBadgeProps {
  key: number
  id: number
  user_id: number
  badge_id: number
  time: Date
}

function MyBadge({ key, id, user_id, badge_id, time }: MyBadgeProps) {
  return (
    <div className={styles.badgegrid}>
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
      <img src={haho} alt={'haho'} />
    </div>
  )
}

export default MyBadge
