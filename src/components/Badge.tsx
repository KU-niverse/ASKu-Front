import styles from './Badge.module.css'
import ThreedotsBadge from './ThreedotsBadge'
// import FormatDate from './FormatDate'
import locked from '../img/locked.svg'

function Badge({ myBadgeIds, id, name, image, description, event, count, repBadgeId }: any) {
  const isRepBadge = id === repBadgeId

  return (
    <div className={`${styles.b_content} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
      <div className={`${styles.b_thumb}`}>
        <img src={myBadgeIds.has(id) ? image : locked} alt={name} />
      </div>
      <div className={`${styles.b_info}`}>
        <div className={`${styles.b_achievement}`}>
          <span className={`${styles.b_people} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            {'달성자 수 : '}
            {count}
            {'명\r'}
          </span>
          {/* <span className={`${styles.b_listlastfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
              획득일 : {formattedDate}
            </span> */}
        </div>
        <div className={`${styles.b_badgename}`}>{myBadgeIds.has(id) ? name : '잠긴 뱃지입니다'}</div>
        <div className={`${styles.b_badgedescription}`}>{description}</div>
        <div className={`${styles.b_repbadgebtn}`}>
          <ThreedotsBadge badge_id={id} badge_disabled={!myBadgeIds.has(id)} is_rep_badge={isRepBadge} />
        </div>
      </div>
    </div>
  )
}

export default Badge
