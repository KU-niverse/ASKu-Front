import React from 'react'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



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

const History = (props) => {

    const {title} = useParams();
    const [lists, setLists] = useState([]);

    

    const getWiki = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/wiki/historys/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                setLists(result.data.historys);
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    };

    useEffect(() => {

        getWiki();

    }, []);


  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.header}>
            <span><img src={his2}/>히스토리</span>
        </div>
        <div className={styles.history}>
            <div className={styles.historyList}>
                <div className={styles.historyTitle}><p className={styles.listTitle}>{title}</p><p className={styles.listTitle2}>문서의 변경 내용</p></div>
                {lists.map((item) => {
                    return(
                        <div key={item.version}>
                            <HistoryBox 
                            version={item.version} summary={item.summary} user={item.user_id} timestamp={item.timestamp} title={title}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default History