import React from 'react'
import styles from './DebateRecent.module.css'
import FormatTimeAgo from '../FormatTimeAgo';
import axios from 'axios';
import { useState, useEffect } from 'react';


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

const DebateRecent = ({title, recentData}) => {


  


    
  return (
    <div>
        <p className={styles.recentTitle}>최근 토론</p>
        <div className={styles.recentLists}>
            {recentData.length === 0 ? (
              <p>"최근 변경된 토론이 없습니다."</p>
            ) : (
                recentData.map((item) => {

                const timestamp = FormatTimeAgo(item.recent_edited_at);
                return(
                    <ul key={item.title}>
                        <span className={styles.listTitle}>{item.subject}</span>
                        <span className={styles.listTimestamp}>{timestamp}</span>
                    </ul>
                );
              })
            )}
        </div>
    </div>
  )
}

export default DebateRecent