import React, { useState, useEffect } from 'react';
import plus from '../../img/Vector.png';
import styles from './DebateAdd.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DebateAdd = ({ title }) => {
  const [debateListData, setDebateListData] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [word, setWord] = useState('');
  const [numb, setNumb] = useState(0);

  useEffect(() => {
    const takeDebateList = async () => {
      try {
        const res = await axios.get(`https://asku.wiki/api/debate/list/${title}`, { withCredentials: true });
        if (res.status === 200) {
          setDebateListData(res.data);
          setNumb(res.data.data.length);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    takeDebateList();
  }, [title]); // Fetch debate list data when the title changes

  const handleAddBtn = () => {
    setIsAdd(true);
  };

  const debateAdd = async () => {
    try {
      const response = await axios.post(
        `https://asku.wiki/api/debate/new/${title}`,
        {
          subject: word,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        window.location.reload(); // Refresh the page after successful creation
      } else {
        return alert('Failed to add debate.');
      }
    } catch (error) {
      console.error(error);
      return alert(error.response.data.message);
    }
  };

  const handleNewDebate = () => {
    debateAdd();
  };

  return (
    <div>
       <div className={styles.addTitle}>
            <p className={styles.addTitleMain}>{title}</p>
            <p >문서의 다른 토론 ({numb})</p>
        </div>
        
        <div>
            <div className={isAdd ? styles.hidden : styles.inputContainer}>
                <button className={isAdd ? styles.hidden: styles.addBtn} onClick={handleAddBtn}><img src={plus}/></button>
            </div>
            <div className={isAdd ? styles.inputContainer: styles.hidden}>
                <input className={styles.headerInput} type="text" value={word} onChange={e => setWord(e.target.value)} placeholder='생성할 토론방을 입력하세요.' />
                <button className={styles.createBtn} onClick={handleNewDebate}>생성</button>
            </div>
        </div>
      <div className={styles.addLists}>
        {debateListData === null ? (
          <p className={styles.none}>데이터를 불러오는 중입니다.</p>
        ) : debateListData.data.length === 0 ? (
          <p>"최근 변경된 토론이 없습니다."</p>
        ) : (
          debateListData.data.map((item) => (
            <Link to={`/debate/${title}/${item.subject}/${item.id}`} className={styles.linkTo}>
            <ul key={item.id}>
              <span className={styles.listTitle}>{item.subject}</span>
            </ul></Link>
          ))
        )}
      </div>
    </div>
  );
};

export default DebateAdd;
