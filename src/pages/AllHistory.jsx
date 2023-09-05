import React from 'react'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Paging from '../components/Paging';
import FormatTimeAgo from '../components/FormatTimeAgo';

// const data = [
//     {
//         'version': 'v1',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
//     {
//         'version': 'v2',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
//     {
//         'version': 'v3',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
//     {
//         'version': 'v4',
//         'summary': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
//         'user': '하호후리스',
//         'timestamp': '2023.05.26 01:34:32',
//     },
// ]

const AllHistory = () => {
    const [historys, setHistorys] = useState([]);
    const [type, setType] = useState('all');
    const [typeCount, setTypeCount] = useState(0);
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const perPage = 10; // 페이지당 보여줄 컴포넌트 갯수
    // 현재 페이지에 해당하는 데이터만 추출
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleHistorys = historys.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
      setPage(pageNumber); // 페이지 번호 업데이트
    };

    const getHistory = async () => {
        try{
            const result = await axios.get(`https://asku.wiki/api/wiki/historys?type=${type}`);
            setHistorys(result.data.message);
            setTypeCount(result.data.message.length);
            console.log(typeCount);
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
        setType('rollback');
    }
   


  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.header}>
            <span><img src={his2}/>최근 변경</span>
        </div>
        <div className={styles.history}>
            <div className={type === 'all' ? styles.historyList : styles.hidden}>
                <div className={styles.historyTitle}>
                    <p className={styles.listTitle2}>최근 변경된 모든 문서</p>
                    <div className={styles.historyTypes}>
                        <p onClick={allBtn} className={type === 'all' ? styles.clickType : styles.default}>all</p>
                        <p onClick={createBtn} className={type === 'create' ? styles.clickType : styles.default}>create</p>
                        <p onClick={rollBtn} className={type === 'rollback' ? styles.clickType : styles.default}>rollback</p>
                    </div>
                </div>
                {visibleHistorys.map((item) => {
                    const timestamp = FormatTimeAgo(item.created_at);
                    return (
                      <div key={item.timestamp}>
                        <HistoryBox
                          version={item.version}
                          summary={item.summary}
                          user={item.nick}
                          timestamp={timestamp}
                          title={item.doc_title}
                          //title={title}
                          target={item.id}
                          type={type}
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
            <div className={type === 'create' ? styles.historyList : styles.hidden}>
                <div className={styles.historyTitle}>
                    <p className={styles.listTitle2}>새로 생성된 모든 문서</p>
                    <div className={styles.historyTypes}>
                        <p onClick={allBtn} className={type === 'all' ? styles.clickType : styles.default}>all</p>
                        <p onClick={createBtn} className={type === 'create' ? styles.clickType : styles.default}>create</p>
                        <p onClick={rollBtn} className={type === 'rollback' ? styles.clickType : styles.default}>rollback</p>
                    </div>
                </div>
                {visibleHistorys.map((item) => {
                    const timestamp = FormatTimeAgo(item.created_at);
                    return (
                      <div key={item.timestamp}>
                        <HistoryBox
                          version={item.version}
                          summary={item.summary}
                          user={item.nick}
                          timestamp={timestamp}
                          title={item.doc_title}
                          //title={title}
                          target={item.id}
                          type={type}
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
            <div className={type === 'rollback' ? styles.historyList : styles.hidden}>
                <div className={styles.historyTitle}>
                    <p className={styles.listTitle2}>최근 롤백된 모든 문서</p>
                    <div className={styles.historyTypes}>
                        <p onClick={allBtn} className={type === 'all' ? styles.clickType : styles.default}>all</p>
                        <p onClick={createBtn} className={type === 'create' ? styles.clickType : styles.default}>create</p>
                        <p onClick={rollBtn} className={type === 'rollback' ? styles.clickType : styles.default}>rollback</p>
                    </div>
                </div>
                {visibleHistorys.map((item) => {
                    const timestamp = FormatTimeAgo(item.created_at);
                    return (
                      <div key={item.timestamp}>
                        <HistoryBox
                          version={item.version}
                          summary={item.summary}
                          user={item.nick}
                          timestamp={timestamp}
                          title={item.doc_title}
                          //title={title}
                          target={item.id}
                          type={type}
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

export default AllHistory