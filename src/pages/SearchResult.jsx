import React from 'react'
import Header from '../components/Header'
import search from '../img/search_icon.png'
import styles from './SearchResult.module.css'
import ResultBox from '../components/ResultBox'

const SearchResearch = () => {


    const data = [
        {
            'title': '입실렌티',
            'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        },
        {
            'title': '입실렌티',
            'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        },
        {
            'title': '입실렌티',
            'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        },
        {
            'title': '입실렌티',
            'content': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        },
    ]
    const lists = [
        {
            'title': '대동제',
            'timestamp': '18:06',
        },
        {
            'title': '대동제',
            'timestamp': '18:06',
        },
        {
            'title': '대동제',
            'timestamp': '18:06',
        },
        {
            'title': '대동제',
            'timestamp': '18:06',
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
            <div className={styles.typeWrap}>
                <p className={styles.type}>
                    <button>문서<div className={styles.number}>12</div></button>
                    <button>질문<div className={styles.number}>12</div></button>
                </p>
                <p className={styles.title}>최근 변경</p>
            </div>
            <div className={styles.contents}>
                <div className={styles.boxes}>
                    <div>
                        {data.map((item) => {
                            return(
                                <div key={item.title}>
                                    <ResultBox
                                    title={item.title} content={item.content} bookmark={item.bookmark}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.recents}>
                    <div className={styles.recentWrap}>
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
            </div>

        </div>
    </div>
  )
}

export default SearchResearch