import React from 'react';
import styles from './HistoryBox.module.css';
import report from '../img/report.png';
import rollback from '../img/return.png';
import watch from '../img/watch.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import verComp from '../img/verComp.png';


const HistoryBox = (props) => {

    const nav = useNavigate();

    const title = props.title
    const version = props.version;
    const summary = props.summary;
    const user = props.user;
    const timestamp = props.timestamp;

    const handleView = () => {
        nav(`/wiki/preview/${title}/${version}`);
    }

    const handleRollback = async() => {
        try{
            const result = await axios.post(`http://localhost:8080/wiki/historys/${title}/version/${version}`, {
                withCredentials: true,
            }); //전체 텍스트를 가져옴.
            if(result.status === 200){
                alert(result.data.message);
                nav(`/wiki/${title}`);
            } else
            {
                alert('something went wrong');
            }
        } catch (error) {
            if(error.status === 401){
                alert(error.data.message);
                nav('/signin');
            } else if(error.status === 432){
                alert(error.data.message);
            }
        }
    };


    const handleCompare = () => {
        nav(`/history/${title}/diff/${version}`);
    }

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
                <span onClick={handleView}><img src={watch}/>이 버전으로 미리보기</span>
                <span onClick={handleRollback}><img src={rollback}/>이 버전으로 되돌리기</span>
                <span onClick={handleCompare}><img src={verComp}/>전 버전이랑 비교하기</span>
            </div>
        </div>
    </div>
  )
}

export default HistoryBox