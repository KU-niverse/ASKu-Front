import React from 'react'
import styles from './Switch.module.css'

interface SwitchProps {
  isToggled: boolean
  onToggle: () => void
}

const Switch = ({ isToggled, onToggle }: SwitchProps) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch} htmlFor={'toggleSwitch'}>
        <input type={'checkbox'} id={'toggleSwitch'} checked={isToggled} onChange={onToggle} />
        <span className={`${styles.slider} ${styles.rounded}`}>
          <span className={isToggled ? `${styles.toggleText1}` : `${styles.hidden}`}>{'인기순'}</span>
          <span className={isToggled ? `${styles.hidden}` : `${styles.toggleText2}`}>{'최신순'}</span>
        </span>
      </label>
    </div>
  )
}

export default Switch
