import React from 'react'

const Chatbox = () => {
  return (
    <div>
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

export default Chatbox;