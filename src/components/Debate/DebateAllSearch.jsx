import React from 'react'
import styles from './DebateSearch.module.css'
import searchIcon from '../../img/search_icon.png'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DebateAllSearch = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [onClick, setOnClick] = useState(false);

const nav = useNavigate();


  const searchDebate = async () => {
    try{
        const result = await axios.get(`https://asku.wiki/api/debate/searchall/${word}`, {
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
    searchDebate();
    setOnClick(true);

  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
        handleDebateSearch();
    }
  }

  return (
    <div>
        <p className={styles.searchTitle}>토론 검색</p>
        <div className={styles.inputContainer}>
            <input 
            className={styles.headerInput} 
            type='text' value={word} 
            onChange={e => setWord(e.target.value)} 
            placeholder='검색어를 입력하세요.' 
            onKeyDown={handleKeyDown} // Use onKeyDown instead
            />
            <img src={searchIcon} alt='icon' className={styles.searchIcon} onClick={handleDebateSearch}/>
        </div>
        <div className={onClick ? styles.resultContainer : styles.hidden}>
            {resultCount === 0 ? (
              <p>"검색결과가 없습니다."</p>
            ) : (
              results.map((item) => {
                return  (                           
                <Link to={`/debate/${item.title}/${item.subject}`} state={{ title: item.title, subject: item.subject, id: item.id }} className={styles.linkTo}>
                <ul key={item.id} className={styles.resultList}>
                  {item.subject}
                </ul>
              </Link> )
 
            
            })
            )}
        </div>
    </div>
  )
}

export default DebateAllSearch