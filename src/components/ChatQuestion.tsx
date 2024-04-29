import React from 'react'
// @ts-expect-error TS(2307): Cannot find module './ChatQuestion.module.css' or ... Remove this comment to see the full error message
import styles from './ChatQuestion.module.css';
// @ts-expect-error TS(2307): Cannot find module '../img/like.png' or its corres... Remove this comment to see the full error message
import like from '../img/like.png';
// @ts-expect-error TS(2307): Cannot find module '../img/unlike.png' or its corr... Remove this comment to see the full error message
import unlike from '../img/unlike.png';
// @ts-expect-error TS(2307): Cannot find module '../img/reference.png' or its c... Remove this comment to see the full error message
import reference from '../img/reference.png';
// @ts-expect-error TS(2307): Cannot find module '../img/dots.png' or its corres... Remove this comment to see the full error message
import dots from '../img/dots.png';

const ChatQuestion = (props: any) => {
  const {content} = props;
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.questionBox}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.characterContainer}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>나</span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.chatTextWrap}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p className={styles.chatText}>{content}</p>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img src={dots} className={styles.dots} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.iconZip}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img className={styles.icon} src={like} alt="like" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img className={styles.icon} src={unlike} alt="unlike" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img className={styles.icon} src={reference} alt="reference link" />
        </div>
    </div>
  )
}

export default ChatQuestion;
