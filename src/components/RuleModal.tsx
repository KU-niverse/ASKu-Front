import React from 'react'
import styles from './RuleModal.module.css' // Create a CSS module for styling

const RuleModal = ({ isOpen, onClose, ruleContent }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{'관련 학칙'}</h2>
          <button type={'button'} className={styles.closeButton} onClick={onClose}>
            {'X\r'}
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>{ruleContent}</p>
        </div>
      </div>
    </div>
  )
}

export default RuleModal
