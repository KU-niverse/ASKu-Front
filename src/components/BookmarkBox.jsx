import React from 'react'
import falseBk from '../img/bookmark.png'
import trueBk from '../img/bookmarkFill.png'
import styles from './BookmarkBox.module.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BookmarkBox = (props) => {

    const title = props.title;
    const content = props.content;
    const [deleted, setDeleted] = useState(Boolean(props.is_deleted));
    console.log(deleted);
    const [imageSource, setImageSource] = useState(trueBk);
    const nav = useNavigate();

    




    const addBookmark = async () => {
      try{
          const result = await axios.post(`https://asku.wiki/api/wiki/favorite/${title}`, {
                  
          }, {
              withCredentials: true
          });
          if(result.status === 200){
              setDeleted(false);
              console.log(result.data.status);
          }
          
      } catch (error) {
          console.error(error);
          return alert(error.response.data.message);
      }
    };


    const deleteBookmark = async () => {
      try{
          const result = await axios.delete(`https://asku.wiki/api/wiki/favorite/${title}`, {
              withCredentials: true
          });
          if(result.status === 200){
              setDeleted(true);
          } else {
            alert('문제가 발생하였습니다')
          }
          
      } catch (error) {
          console.error(error);
          return alert(error.response.data.message);
      }
    };

    

      // 북마크 이미지 변경
    function handleClick() {
        // 이미지가 변경되었을 때 다른 이미지 경로로 바꾸어줍니다.
      if(deleted === false){
        deleteBookmark();
        setImageSource(falseBk);

      } else if (deleted === true){
        addBookmark();
        setImageSource(trueBk);

      }
    }

    useEffect(() => {
        if(deleted === false){
            setImageSource(trueBk);
    
          } else if (deleted === true){
            setImageSource(falseBk);
    
          }
        
    }, [deleted]);

  

    
  
    return (
      <div className={styles.bkbox}>
        <div className={styles.contents}>
          <div className={styles.title} onClick={() => nav(`/wiki/${title}`)}>{title}</div>
          <div>
            <img src={imageSource} alt="Image" onClick={handleClick} />
          </div>
          
        </div>
        <div className={styles.content} onClick={() => nav(`/wiki/${title}`)}>
            {content}
          </div>
        
      </div>
    );
    
    
}

export default BookmarkBox