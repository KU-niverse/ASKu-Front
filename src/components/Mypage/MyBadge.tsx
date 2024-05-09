import haho from '../../img/haho.png'
import styles from './MyBadge.module.css'

function MyBadge(key: number, id: number, user_id: number, badge_id: number, time: string) {
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
