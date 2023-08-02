import React, { useState } from 'react';
import styles from './ChatAnswer.module.css';
import like from '../img/chatbot_like.png';
import like_hover from '../img/chatbot_like_filled.png';
import unlike from '../img/chatbot_unlike.png';
import unlike_hover from '../img/chatbot_unlike_filled.png';
import referenceIcon from '../img/reference.png';
import dots from '../img/dots.png';
import haho from '../img/3d_haho.png';

const ChatAnswer = (props) => {
    const { content, reference } = props;
    const [likeHovered, setLikeHovered] = useState(false);
    const [unlikeHovered, setUnlikeHovered] = useState(false);

    const handleLikeMouseOver = () => {
        setLikeHovered(true);
    };

    const handleLikeMouseLeave = () => {
        setLikeHovered(false);
    };

    const handleUnlikeMouseOver = () => {
        setUnlikeHovered(true);
    };

    const handleUnlikeMouseLeave = () => {
        setUnlikeHovered(false);
    };

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
                <img
                    id={styles.like}
                    className={styles.icon}
                    src={likeHovered ? like_hover : like}
                    alt="like"
                    onMouseOver={handleLikeMouseOver}
                    onMouseLeave={handleLikeMouseLeave}
                />
                <img
                    id={styles.unlike}
                    className={styles.icon}
                    src={unlikeHovered ? unlike_hover : unlike}
                    alt="unlike"
                    onMouseOver={handleUnlikeMouseOver}
                    onMouseLeave={handleUnlikeMouseLeave}
                />
                <img
                    id={styles.referenceIcon}
                    className={styles.icon}
                    src={referenceIcon}
                    alt="reference link"
                />
            </div>
        </div>
    );
};

export default ChatAnswer;