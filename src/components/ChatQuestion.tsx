import React from 'react'
import styles from './ChatQuestion.module.css'
import like from '../img/like.png'
import unlike from '../img/unlike.png'
import reference from '../img/reference.png'
import dots from '../img/dots.png'

interface ChatQuestionProps {
  content: string
}

const ChatQuestion = ({ content }: ChatQuestionProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div className={styles.questionBox}>
        <div className={styles.characterWrapper}>
          <div className={styles.characterContainer}>
            <span>{'나'}</span>
          </div>
        </div>
        <div className={styles.chatTextWrap}>
          <p className={styles.chatText}>{content}</p>
        </div>
        <img alt={'dots'} src={dots} className={styles.dots} />
        <div className={styles.iconZip}>
          <img className={styles.icon} src={like} alt={'like'} />
          <img className={styles.icon} src={unlike} alt={'unlike'} />
          <img className={styles.icon} src={reference} alt={'reference link'} />
        </div>
      </div>
    </div>
  )
}

export default ChatQuestion
