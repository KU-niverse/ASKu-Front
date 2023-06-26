import React from 'react'
import styles from './Switch.module.css'

const Switch = ({isToggled, onToggle}) => {
  return (
    <label className={styles.switch}>
        <input type="checkbox" checked={isToggled} onChange={onToggle}/>
        <span className={`${styles.slider} ${styles.rounded}`}>
            <span className={isToggled ? `${styles.toggleText1}`: `${styles.hidden}`}>최신순</span>
            <span className={isToggled ? `${styles.hidden}` : `${styles.toggleText2}`}>인기순</span>
        </span>
    </label>
  )
}

export default Switch