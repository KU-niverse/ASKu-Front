import React from 'react'
import styles from './ChatAnswer.module.css';
import like from '../img/like.png';
import unlike from '../img/unlike.png';
import referenceIcon from '../img/reference.png';
import dots from '../img/dots.png';
import haho from '../img/3d_haho.png';
import like_hover from '../img/like_hover.png';
import unlike_hover from '../img/unlike_hover.png';


const ChatAnswer = (props) => {
    const {content, reference} = props;
    return (
    <div className={styles.answerBox}>
        <div className={styles.characterContainer}>
            <img src={haho} alt="character" className={styles.character} />
        </div>
        <div className={styles.chatTextWrap}>
            <p className={styles.chatText}>{content}</p>
        </div>
        <img src={dots} className={styles.dots} />
        <div className={styles.iconZip}>
            <img id={styles.like} className={styles.icon} src={like} alt="like" />
            <img id={styles.unlike} className={styles.icon} src={unlike} alt="unlike" />
            <img id={styles.referenceIcon} className={styles.icon} src={referenceIcon} alt="reference link" />
        </div>
    </div>
    )
}

export default ChatAnswer