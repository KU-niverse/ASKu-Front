import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './MoreDebate.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebateList from '../components/Debate/DebateList'
import DebateSearch from '../components/Debate/DebateSearch'
import DebateAdd from '../components/Debate/DebateAdd'
import DebateRecent from '../components/Debate/DebateRecent'


interface Debate {
  id: number;
  doc_id: number;
  user_id: number;
  subject: string;
  created_at: string;
  recent_edited_at: string;
  done_or_not: boolean;
  done_at: string | null;
  is_bad: boolean;
}

interface DebateListData {
  data: Debate[];
}

function MoreDebate() {
  const { title } = useParams()
  const [debateListData, setDebateListData] = useState<DebateListData>({ data: [] })

  useEffect(() => {
    const takeDebateList = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/debate/list/${encodeURIComponent(title)}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          setDebateListData(res.data)
        } else {
        }
      } catch (error) {
        console.error(error)
      }
    }

    takeDebateList()
  }, [title]) // 토론방 목록 가져오기

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>

      <div className={styles.header}>
        <p className={styles.debate}>
          {'토론 ('}
          {title}
          {')'}
        </p>
      </div>

      <div className={styles.debatecontent}>
        <div className={styles.maincontent}>
          <div className={styles.maincontent_box}>
            <p className={styles.title}>{'이 문서의 토론 목록'}</p>
            <div className={styles.menu}>
              <span className={styles.menu1}>{'항목'}</span>
              <span className={styles.menu2}>{'수정 시간'}</span>
            </div>

            {debateListData && debateListData.data && debateListData.data.length === 0 ? (
              <p className={styles.none}>{'아직 생성된 토론방이 없습니다.'}</p>
            ) : (
              debateListData &&
              debateListData.data &&
              debateListData.data.map((data: any) => (
                <DebateList
                  key={data.id}
                  id={data.id}
                  doc_id={data.doc_id}
                  user_id={data.user_id}
                  subject={data.subject}
                  created_at={data.created_at}
                  recent_edited_at={data.recent_edited_at}
                  done_or_not={data.done_or_not}
                  done_at={data.done_at}
                  is_bad={data.is_bad}
                  title={title}
                />
              ))
            )}
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateSearch title={title} />
          </div>
          <div className={styles.debateAdd}>
            <DebateAdd title={title} />
          </div>
          <div className={styles.debateRecent}>
            <DebateRecent title={title} />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MoreDebate
