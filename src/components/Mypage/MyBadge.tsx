import haho from '../../img/haho.png'
import styles from './MyBadge.module.css'

function MyBadge(key: any, id: any, user_id: any, badge_id: any, time: any) {
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
