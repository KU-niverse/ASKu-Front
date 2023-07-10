import React from 'react'
import Header from '../components/Header'
import search from '../img/search_icon.png'
import styles from './SearchResult.module.css'
import BookmarkBox from '../components/BookmarkBox'

const SearchResearch = () => {


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
    
  return (
    <div>
        <Header/>
        <div className={styles.results}>
            <div className={styles.header}>
                <img src={search}/>
                <h4>"입실렌티" 검색결과</h4>
            </div>
            <div className={styles.type}>
                <button>문서<div className={styles.number}>12</div></button>
                <button>질문<div className={styles.number}>12</div></button>
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
    </div>
  )
}

export default SearchResearch