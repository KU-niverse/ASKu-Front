import React from 'react'
import haho from '../img/haho.png'
import styles from './Badge.module.css'
import ThreedotsBadge from './ThreedotsBadge'
import FormatDate from './FormatDate'
import lock from '../img/lock.png'

function Badge({ myBadgeIds, id, name, image, description, event, count }: any) {
  return (
    <div className={`${styles.b_thumb} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
      <div className={`${styles.b_content} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
        <div className={`${styles.b_thumb} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
          <img src={myBadgeIds.has(id) ? image : lock} alt={name} />
        </div>
        <div className={`${styles.b_right} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
          <div className={`${styles.b_listhead} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            <span
              className={`${styles.b_listfronthead} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}
            >
              {myBadgeIds.has(id) ? name : '잠긴 뱃지입니다.'}
            </span>
            <div
              className={`${styles.b_listput} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}
            >
              <ThreedotsBadge badge_id={id} />
            </div>
          </div>
          <div className={`${styles.b_listmid} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            <p className={`${styles.midtext} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
              {description}
            </p>
          </div>
          <div className={`${styles.b_listfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
            <span
              className={`${styles.b_listfrontfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}
            >
              {'달성자 수 : '}
              {count}
              {'명\r'}
            </span>
            {/* <span className={`${styles.b_listlastfoot} ${myBadgeIds.has(id) ? styles.myBadgeStyle : styles.normalBadgeStyle}`}>
              획득일 : {formattedDate}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Badge
