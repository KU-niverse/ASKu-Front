import React from 'react'
import styles from './ChatQuestion.module.css';
import like from '../img/like.png';
import unlike from '../img/unlike.png';
import reference from '../img/reference.png';
import dots from '../img/dots.png';

const ChatQuestion = () => {
  return (
    <div className={styles.questionBox}>
        <div className={styles.characterContainer}>
            <span>나</span>
        </div>
        <p className={styles.chatText}>고려대 의예과의 졸업요건을 알려줘.</p>
        <img src={dots} className={styles.dots} />
    </div>
  )
}

export default ChatQuestion;