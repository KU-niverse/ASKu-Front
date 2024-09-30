import React from 'react'
import styles from './ChatQuestion.module.css'
import like from '../img/like.png'
import unlike from '../img/unlike.png'
import reference from '../img/reference.png'
import dots from '../img/dots.png'
import catIcon from '../img/cutiecat.svg'

interface ChatQuestionProps {
  content: string
}

const ChatQuestion = ({ content }: ChatQuestionProps) => {
  return (
    <div className={styles.questionBox}>
      <p className={styles.chatText}>{content}</p>
      <img src={catIcon} alt={'character'} className={styles.character} />
      <img alt={'dots'} src={dots} className={styles.dots} />
      <div className={styles.iconZip}>
        <img className={styles.icon} src={like} alt={'like'} />
        <img className={styles.icon} src={unlike} alt={'unlike'} />
        <img className={styles.icon} src={reference} alt={'reference link'} />
      </div>
    </div>
  )
}

export default ChatQuestion
