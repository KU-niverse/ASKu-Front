import React from 'react';
import styles from './Switch.module.css';
import { useState } from 'react';

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={styles.toggleSwitch}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="toggleSwitch"
      />
    
    <label className={styles.label} htmlFor="toggleSwitch">
      <span className={styles.toggleInner}></span>
      <span className={styles.toggleCircle}></span>
    </label>
    </div>
  );
};

export default Switch;