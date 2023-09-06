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
    const [favorite, setFavorite] = useState(Boolean(props.is_favorite));
    const [imageSource, setImageSource] = useState(trueBk);
    const nav = useNavigate();
    const isResult = props.result;

    




    const addBookmark = async () => {
      try{
          const result = await axios.post(`http://localhost:8080/wiki/favorite/${title}`, {
                  
          }, {
              withCredentials: true
          });
          if(result.data.success === true){
              setFavorite(true);
              alert('즐겨찾기에 추가되었습니다');
          }
          
      } catch (error) {
          console.error(error);
          return alert(error.response.data.message);
      }
    };


    const deleteBookmark = async () => {
      try{
          const result = await axios.delete(`http://localhost:8080/wiki/favorite/${title}`, {
              withCredentials: true
          });
          if(result.data.success === true){
            setFavorite(false);
            alert('즐겨찾기에서 삭제되었습니다');
          } else {
            alert('문제가 발생하였습니다')
          }
          
      } catch (error) {
          console.error(error);
          return alert(error.response.data.message);
      }
    };

    

    async function handleClick() {
      try {
        if (favorite === true) {
          await deleteBookmark();
          setFavorite(false); // Update the state first
          setImageSource(falseBk);
        } else if (favorite === false) {
          await addBookmark();
          setFavorite(true); // Update the state first
          setImageSource(trueBk);
        }
      } catch (error) {
        console.error(error);
        // Handle error appropriately
      }
    }
  
  useEffect(() => {
      if( favorite === true){
          setImageSource(trueBk);
  
      } else if (favorite === false){
          setImageSource(falseBk);
  
      }
      
  }, [favorite]);

  

    
  
    return (
      <div className={styles.bkbox}>
        <div className={styles.contents}>
          <div className={styles.title} onClick={() => nav(`/wiki/${title}`)}>{title}</div>
          <div>
            <img src={imageSource} alt="Image" onClick={handleClick} className={isResult ? `${styles.hidden}` : ''}/>
          </div>
          
        </div>
        <div className={styles.content} onClick={() => nav(`/wiki/${title}`)}>
            {content}
          </div>
        
      </div>
    );
    
    
}

export default BookmarkBox