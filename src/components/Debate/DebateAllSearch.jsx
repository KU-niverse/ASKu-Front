import React from 'react'
import styles from './DebateSearch.module.css'
import searchIcon from '../../img/search_icon.png'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DebateAllSearch = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [onClick, setOnClick] = useState(false);

const nav = useNavigate();


  const searchDebate = async () => {
    try{
        const result = await axios.get(`http://localhost:8080/debate/searchall/${word}`, {
            withCredentials: true
        });
        if(result.status === 200){
                setResults(result.data.data);
                setResultCount(result.data.data.length);
        }
        
    } catch (error) {
        console.error(error);
        return alert(error.response.message);
    }
};

  const handleDebateSearch = () => {
    console.log(word);
    searchDebate();
    setOnClick(true);

  }

  return (
    <div>
        <p className={styles.searchTitle}>토론 검색</p>
        <div className={styles.inputContainer}>
            <input className={styles.headerInput} type='text' value={word} onChange={e => setWord(e.target.value)} placeholder='검색어를 입력하세요.' />
            <img src={searchIcon} alt='icon' className={styles.searchIcon} onClick={handleDebateSearch}/>
        </div>
        <div className={onClick ? styles.resultContainer : styles.hidden}>
            {resultCount === 0 ? (
              <p>"검색결과가 없습니다."</p>
            ) : (
              results.map((item) => {
                return <ul key={item.id} className={styles.resultList} onClick={() => nav(`/debate/${item.title}/${item.subject}/${item.id}`)}>{item.subject}</ul>;
              })
            )}
        </div>
    </div>
  )
}

export default DebateAllSearch