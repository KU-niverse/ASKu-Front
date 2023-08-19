import React from 'react'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Paging from '../components/Paging';




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
    const [typeCount, setTypeCount] = useState(0);
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const perPage = 6; // 페이지당 보여줄 컴포넌트 갯수
    // 현재 페이지에 해당하는 데이터만 추출
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleHistorys = lists.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
      setPage(pageNumber); // 페이지 번호 업데이트
    };

    

    const getWiki = async () => {
        try{
            const result = await axios.get(`https://localhost:8080/wiki/historys/${title}`, {
                withCredentials: true
            });
            if(result.status === 200){
                setLists(result.data.historys);
                setTypeCount(result.data.historys.length)
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
                {visibleHistorys.map((item) => {
                    if (item.is_bad === 1) {
                        return null; // 패스 (무시)
                      }
                    return(
                        <div key={item.version}>
                            <HistoryBox 
                            version={item.version} summary={item.summary} user={item.nick} timestamp={item.timestamp} title={title}
                            />
                        </div>
                    );
                })}
                <Paging
                    total={typeCount}
                    perPage={perPage}
                    activePage={page}
                    onChange={handlePageChange}
                  />
            </div>
        </div>
    </div>
  )
}

export default History