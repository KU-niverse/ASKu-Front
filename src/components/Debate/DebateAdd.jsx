import React from 'react'
import plus from '../../img/Vector.png'
import styles from './DebateAdd.module.css'
import { useState } from 'react'
import searchIcon from '../../img/search_icon.png'
import axios from 'axios';



const lists = [
    {
        'title': '여기 틀린거 같습니다',
    },
    {
        'title': '여기 틀린거 같습니다',
    },
    {
        'title': '여기 틀린거 같습니다',
    },
    {
        'title': '여기 틀린거 같습니다',
    },
]

const DebateAdd = ({title, debateList}) => {

    const [isAdd, setIsAdd] = useState(false);
    const [word, setWord] = useState('');


    const handleAddBtn = () =>{
        setIsAdd(true);
    }
    const debateAdd = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/debate/new/${title}`, {
               subject : word,
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                alert(response.data.message);
                window.location.reload(); // 성공 시 페이지 새로고침

            } else {
                return alert('이상해');
            }
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    }
    const handleNewDebate = () => {
        debateAdd();
    }
  return (
    <div>
        <div className={styles.addTitle}>
            <p className={styles.addTitleMain}>행복의 심리학</p>
            <p >문서의 다른 토론 (7)</p>
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
            {debateList.map((item) => {
                return(
                    <ul key={item.id}>
                        <span className={styles.listTitle}>{item.subject}</span>
                    </ul>
                );
            })}
        </div>
    </div>
  )
}

export default DebateAdd