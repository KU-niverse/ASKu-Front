import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './Switch.module.css' or its co... Remove this comment to see the full error message
import styles from './Switch.module.css'

const Switch = ({
  isToggled,
  onToggle
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <label className={styles.switch}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input type="checkbox" checked={isToggled} onChange={onToggle}/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={`${styles.slider} ${styles.rounded}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={isToggled ? `${styles.toggleText1}`: `${styles.hidden}`}>희귀순</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={isToggled ? `${styles.hidden}` : `${styles.toggleText2}`}>최신순</span>
        </span>
    </label>
  )
}

export default Switch