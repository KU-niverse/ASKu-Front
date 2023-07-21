import React from 'react'
import styles from './DebateRecent.module.css'


const lists = [
    {
        'title': '대동제',
        'timestamp': 'n 분전',
    },
    {
        'title': '대동제',
        'timestamp': 'n 분전',
    },
    {
        'title': '대동제',
        'timestamp': 'n 분전',
    },
    {
        'title': '대동제',
        'timestamp': 'n 분전',
    },
]

const DebateRecent = () => {

    
  return (
    <div>
        <p className={styles.recentTitle}>최근 토론</p>
        <div className={styles.recentLists}>
            {lists.map((item) => {
                return(
                    <ul key={item.title}>
                        <span className={styles.listTitle}>{item.title}</span>
                        <span className={styles.listTimestamp}>{item.timestamp}</span>
                    </ul>
                );
            })}
        </div>
    </div>
  )
}

export default DebateRecent