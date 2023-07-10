import React from 'react'
import BookmarkBox from '../components/BookmarkBox'
import Header from '../components/Header'
import styles from './MyBookmark.module.css'


const data = [
    {
        'title': 'v1',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'bookmark': 'true',
    },
    {
        'title': 'v2',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'bookmark': 'true',
    },
    {
        'title': 'v3',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'bookmark': 'true',
    },
    {
        'title': 'v4',
        'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        'bookmark': 'true',
    },
]

const MyBookmark = () => {
  return (
    <div className={styles.content}>
        <Header/>
        <div className={styles.header}>
            <h3>즐겨찾기 한 문서</h3>
            <div className={styles.texts}><span>문서</span><div className={styles.number}>12</div></div>
        </div>
        <div>
            {data.map((item) => {
                return(
                    <div key={item.title}>
                        <BookmarkBox
                        title={item.title} content={item.content} bookmark={item.bookmark}
                        />
                    </div>
                );
            })}
        </div>
    </div>
    
  )
}

export default MyBookmark