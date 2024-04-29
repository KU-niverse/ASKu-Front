import React from 'react'
import falseBk from '../img/bookmark.png'
import trueBk from '../img/bookmarkFill.png'
import styles from './BookmarkBox.module.css'

const BookmarkBox = (props: any) => {
  const { title } = props
  const { content } = props
  const { bookmark } = props

  return (
    <div className={styles.bkbox}>
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default BookmarkBox
