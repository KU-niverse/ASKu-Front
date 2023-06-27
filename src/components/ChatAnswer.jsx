import React from 'react'
import styles from './ChatAnswer.module.css';
import like from '../img/like.png';
import unlike from '../img/unlike.png';
import reference from '../img/reference.png';
import dots from '../img/dots.png';
import haho from '../img/3d_haho.png';

const ChatAnswer = () => {
  return (
    <div className={styles.defaultChat}>
        <div className={styles.characterContainer}>
            <img src={haho} alt="character" className={styles.character} />
        </div>
        <p className={styles.chatText}>안녕하세요. 저에게 무엇이든 질문해 주세요.</p>
        <img src={dots} className={styles.dots} />
        <div className={styles.iconZip}>
            <img className={styles.icon} src={like} alt="like" />
            <img className={styles.icon} src={unlike} alt="unlike" />
            <img className={styles.icon} src={reference} alt="reference link" />
        </div>
    </div>
  )
}

export default ChatAnswer