import React from 'react';
import styles from './LatestDebate.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import LatestDebateList from '../components/Debate/LatestDebateList';
import DebateSearch from '../components/Debate/DebateSearch';
import DebateAdd from '../components/Debate/DebateAdd';
import DebateRecent from '../components/Debate/DebateRecent';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


function LatestDebate() {
  const [debateListData, setDebateListData] = useState([]);

  useEffect(() => {
    const takeDebateList = async () =>{
      try{
        const res = await axios.get( `https://asku.wiki/debate/all/recent`, {withCredentials: true});
        if(res.status === 200){
          setDebateListData(res.data);
        }
        else{
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
      console.log('DebateListData:', debateListData);
    }
    takeDebateList();
  }, []); //토론방 목록 가져오기
  
  console.log(debateListData.data)
  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>

      <div className={styles.header}>
        <p className={styles.debate}>토론</p>
      </div>

      <div className={styles.debatecontent}>
 
        <div className={styles.maincontent}>
          <div className={styles.maincontent_box}>
            <p className={styles.title}>
              최근 토론
            </p>
            <div className={styles.menu}>
              <span className={styles.menu1}>
                항목
              </span>
              <span className={styles.menu2}>
                수정 시간
              </span>
            </div>
            {debateListData && debateListData.data && debateListData.data.length === 0 ? (
              <p>아직 생성된 토론방이 없습니다.</p>
            ) : (
              debateListData && debateListData.data && debateListData.data.map((data) => (
                <LatestDebateList
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
                  title={data.title}
                />
              ))
            )}


          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.debateSearch}>
            <DebateSearch/>
          </div>
          <div className={styles.debateAdd}>
            <DebateAdd/>
          </div>
          <div className={styles.debateRecent}>
            <DebateRecent/>
          </div>
          
        </div>
      </div>
      <div>
          <Footer />
      </div>
    </div>
  );
};




export default LatestDebate;