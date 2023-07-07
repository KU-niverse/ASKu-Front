import React from 'react'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'

const AllHistory = () => {



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
  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.header}>
            <span><img src={his2}/>히스토리</span>
        </div>
        <div className={styles.history}>
            <div className={styles.historyList}>
                <div className={styles.historyTitle}><p className={styles.listTitle2}>모든 문서의 최근 변경 내용</p></div>
                {data.map((item) => {
                    return(
                        <div key={item.version}>
                            <HistoryBox 
                            version={item.version} summary={item.summary} user={item.user} timestamp={item.timestamp}
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