import React from 'react'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'
import axios from 'axios'
import { useState, useEffect } from 'react'

const data = [
    {
        'version': 'v1',
        'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'user': '하호후리스',
        'timestamp': '2023.05.26 01:34:32',
    },
    {
        'version': 'v2',
        'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'user': '하호후리스',
        'timestamp': '2023.05.26 01:34:32',
    },
    {
        'version': 'v3',
        'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'user': '하호후리스',
        'timestamp': '2023.05.26 01:34:32',
    },
    {
        'version': 'v4',
        'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'user': '하호후리스',
        'timestamp': '2023.05.26 01:34:32',
    },
]


const AllHistory = () => {
    const [historys, setHistorys] = useState([]);
    const [type, setType] = useState('all');
    

    const getHistory = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/wiki/historys?type=${type}`);
            setHistorys(result.data.message);
            console.log(historys);
        } catch (error) {
            console.error(error);
            //alert(result.data.message);
        }
    };

    useEffect(() => {
        getHistory();
        
    }, [type]);

    const allBtn = () =>{
        setType('all');
    }
    const createBtn = () =>{
        setType('create');
    }
    const rollBtn = () =>{
        setType('roll');
    }
   
    function formatTimeAgo(timeDifference) {
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
        if (daysAgo >= 1) {
          return `${daysAgo}일 전`;
        } else {
          const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
          if (hoursAgo >= 1) {
            return `${hoursAgo}시간 전`;
          } else {
            const minutesAgo = Math.floor(timeDifference / (1000 * 60));
            return `${minutesAgo}분 전`;
          }
        }
    }


  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.header}>
            <span><img src={his2}/>히스토리</span>
        </div>
        <div className={styles.history}>
            <div className={styles.historyBtn}><p onClick={allBtn}>all</p><p onClick={createBtn}>create</p><p onClick={rollBtn}>rollback</p></div>
            <div className={type === 'all' ? styles.historyList : styles.hidden}>
                <div className={styles.historyTitle}><p className={styles.listTitle2}>최근 변경된 모든 문서</p></div>
                {historys.map((item) => {
                    const inputDate = new Date(item.created_at);
                    const currentDate = new Date();
                    const timeDifference = Math.abs(currentDate - inputDate);
                    const timestamp = formatTimeAgo(timeDifference);
                    return(
                        <div key={item.timestamp}>
                            <HistoryBox 
                            version={item.version} summary={item.summary} user={item.user_id} timestamp={timestamp}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={type === 'create' ? styles.historyList : styles.hidden}>
                <div className={styles.historyTitle}><p className={styles.listTitle2}>새로 생성된 모든 문서</p></div>
                {historys.map((item) => {
                    return(
                        <div key={item.version}>
                            <HistoryBox 
                            version={item.version} summary={item.summary} user={item.user_id} timestamp={item.created_at}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={type === 'rollback' ? styles.historyList : styles.hidden}>
                <div className={styles.historyTitle}><p className={styles.listTitle2}>최근 롤백된 모든 문서</p></div>
                {historys.map((item) => {
                    return(
                        <div key={item.version}>
                            <HistoryBox 
                            version={item.version} summary={item.summary} user={item.user_id} timestamp={item.created_at}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default AllHistory