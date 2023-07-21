import React from 'react'
import plus from '../../img/Vector.png'
import styles from './DebateAdd.module.css'
import { useState } from 'react'
import searchIcon from '../../img/search_icon.png'



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

const DebateAdd = () => {

    const [isAdd, setIsAdd] = useState(false);


    const handleAddBtn = () =>{
        setIsAdd(true);
    }
  return (
    <div>
        <div className={styles.addTitle}>
            <p className={styles.addTitleMain}>행복의 심리학</p>
            <p >문서의 다른 토론 (7)</p>
        </div>
        <button className={isAdd ? styles.hidden: styles.addBtn} onClick={handleAddBtn}><img src={plus}/></button>
        <div className={isAdd ? styles.inputContainer: styles.hidden}>
            <input className={styles.headerInput} placeholder='검색어를 입력하세요.' />
            <button className={styles.createBtn}>생성</button>
        </div>
        <div className={styles.addLists}>
            {lists.map((item) => {
                return(
                    <ul key={item.title}>
                        <span className={styles.listTitle}>{item.title}</span>
                    </ul>
                );
            })}
        </div>
    </div>
  )
}

export default DebateAdd