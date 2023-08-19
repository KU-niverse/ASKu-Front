import React from 'react'
import falseBk from '../img/bookmark.png'
import trueBk from '../img/bookmarkFill.png'
import styles from './BookmarkBox.module.css'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const BookmarkBox = (props) => {

    const title = props.title;
    const content = props.content;
    const [deleted, setDeleted] = useState(props.deleted);
    const [imageSource, setImageSource] = useState(trueBk);
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };





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
              console.log(result.data.status);
          } else {
            alert('문제가 발생하였습니다')
          }
          
      } catch (error) {
          console.error(error);
          return alert(error.response.data.message);
      }
    };

    

    const handleClick = () => {
      // 이미지가 변경되었을 때 다른 이미지 경로로 바꾸어줍니다.
      if(deleted === false){
        deleteBookmark();
        setImageSource(falseBk);

      } else if (deleted === true){
        addBookmark();
        setImageSource(trueBk);

      }
      
    };


    const contentRef = useRef(null);

    useEffect(() => {
      if (contentRef.current) {
        const element = contentRef.current;
        if (element.scrollHeight > element.clientHeight) {
          setExpanded(true);
        }
      }
    }, []);
  
    return (
      <div className={styles.bkbox}>
        <div className={styles.contents}>
          <div className={styles.title}>{title}</div>
          <div>
            <img src={imageSource} alt="Image" onClick={handleClick} />
          </div>
        </div>
        <div className={`${styles.content}`} ref={contentRef}>
          {expanded ? (
            content
          ) : (
            <>
              {content}
              <span className={styles.moreLink} onClick={toggleExpand}>
                더보기
              </span>
            </>
          )}
        </div>
      </div>
    );
    
    
}

export default BookmarkBox