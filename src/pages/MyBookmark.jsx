import React from 'react'
import BookmarkBox from '../components/BookmarkBox'
import Header from '../components/Header'
import styles from './MyBookmark.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'


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

    const [lists, setLists] = useState([]);

    const getBookmarks = async () => {
        try{
            const result = await axios.get(`http://118.67.130.57:8080/wiki/favorite`, {
                withCredentials: true
            });
            if(result.status === 200){
                setLists(result.data.message);
            }
            
        } catch (error) {
            console.error(error);
            return alert(error.response.data.message);
        }
    };

    useEffect(() => {

        getBookmarks();

    }, []);


  return (
    <div className={styles.container}>
            <Header/>
        <div className={styles.content}>
            <div className={styles.header}>
                <h3>즐겨찾기 한 문서</h3>
                <div className={styles.texts}><span>문서</span><div className={styles.number}>12</div></div>
            </div>
            <div>
                {lists.map((item) => {
                    return(
                        <div key={item.title}>
                            <BookmarkBox
                            title={item.title} content={item.content} deleted={item.is_deleted}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    
    
  )
}

export default MyBookmark