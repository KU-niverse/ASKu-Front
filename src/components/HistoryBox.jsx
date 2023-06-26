import React from 'react';
import styles from './HistoryBox.module.css';
import report from '../img/report.png';
import rollback from '../img/return.png';
import watch from '../img/watch.png'


const HistoryBox = (props) => {

    const version = props.version;
    const summary = props.summary;
    const user = props.user;
    const timestamp = props.timestamp;

  return (
    <div className={styles.historyBox}>
        <div className={styles.contents}>
            <div className={styles.contentsOne}>
                <span className={styles.version}>{version}</span>
                <span className={styles.summary}>수정요약: {summary}</span>
            </div>
            <div className={styles.contentsTwo}>
                <span className={styles.user}>{user}</span>
                <span className={styles.timestamp}>{timestamp}</span>
                <span><img src={report}/></span>
            </div>
        </div>
        <div className={styles.versionText}>
            <div></div>
            <div className={styles.versionBtns}>
                <span><img src={rollback}/>이 버전으로 되돌리기</span>
                <span><img src={watch}/>이 버전으로 문서 보기</span>
            </div>
        </div>
    </div>
  )
}

export default HistoryBox