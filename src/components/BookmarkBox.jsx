import React from 'react'
import falseBk from '../img/bookmark.png'
import trueBk from '../img/bookmarkFill.png'
import styles from './BookmarkBox.module.css'

const BookmarkBox = (props) => {

    const title = props.title;
    const content = props.content;
    const bookmark = props.bookmark;

  return (
    <div className={styles.bkbox}>
        <div className={styles.contents}>
            <div className={styles.title}>{title}</div>
            <div><img src={falseBk}/></div>
        </div>
        <div>
            {content}
        </div>
    </div>
  )
}

export default BookmarkBox