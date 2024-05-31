import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styles from './History.module.css'
import Header from '../components/Header'
import his2 from '../img/his2.png'
import HistoryBox from '../components/HistoryBox'

import Paging from '../components/Paging'
import Footer from '../components/Footer'

const data = [
  {
    version: 'v1',
    summary: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    user: '하호후리스',
    timestamp: '2023.05.26 01:34:32',
  },
  {
    version: 'v2',
    summary: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    user: '하호후리스',
    timestamp: '2023.05.26 01:34:32',
  },
  {
    version: 'v3',
    summary: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    user: '하호후리스',
    timestamp: '2023.05.26 01:34:32',
  },
  {
    version: 'v4',
    summary: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    user: '하호후리스',
    timestamp: '2023.05.26 01:34:32',
  },
]

type HistoryItem = {
  version: number;
  summary: string;
  user: string;
  timestamp: string;
  is_bad?: boolean; 
  nick?: string; 
  id?: string; 
};

const History = () => {
  const { title } = useParams<{ title: string }>();
  const [lists, setLists] = useState<HistoryItem[]>([]);
  const [typeCount, setTypeCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const perPage = 6;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleHistorys = lists.slice(startIndex, endIndex);
  const [blank, setBlank] = useState<boolean>(false);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };


  const getWiki = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys/${title}`, {
        withCredentials: true,
      })
      if (result.status === 200) {
        setLists(result.data.historys)
        setTypeCount(result.data.historys.length)
        if (result.data.historys.length === 0) {
          setBlank(true)
        }
      }
    } catch (error) {
      console.error(error)
      return alert(error.response.data.message)
    }
  }

  useEffect(() => {
    getWiki()
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.header}>
        <span>
          <img src={his2} />
          {'히스토리\r'}
        </span>
      </div>
      <div className={styles.history}>
        <div className={styles.historyList}>
          <div className={styles.historyTitle}>
            <p className={styles.listTitle}>{title}</p>
            <p className={styles.listTitle2}>{'문서의 변경 내용'}</p>
          </div>
          {blank ? (
            <div>{'아직 히스토리가 없습니다'}</div>
          ) : (
            visibleHistorys.map((item) => {
              const isFirst = false
              if (item.is_bad === true) {
                return null // 패스 (무시)
              }

              return (
                <div key={item.version}>
                  <HistoryBox
                    version={item.version}
                    summary={item.summary}
                    user={item.nick}
                    timestamp={item.timestamp}
                    title={title}
                    target={item.id}
                  />
                </div>
              )
            })
          )}

          <Paging total={typeCount} perPage={perPage} activePage={page} onChange={handlePageChange} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default History
