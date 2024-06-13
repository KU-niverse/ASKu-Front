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
    <div className={styles.questionBox}>
      <div className={styles.characterContainer}>
        <span>{'나'}</span>
      </div>
      <div className={styles.chatTextWrap}>
        <p className={styles.chatText}>{content}</p>
      </div>
      <img alt={'점 아이콘 버튼'} src={dots} className={styles.dots} />
      <div className={styles.iconZip}>
        <img className={styles.icon} src={like} alt={'like'} />
        <img className={styles.icon} src={unlike} alt={'unlike'} />
        <img className={styles.icon} src={reference} alt={'reference link'} />
      </div>
    </div>
  )
}

export default ChatQuestion
