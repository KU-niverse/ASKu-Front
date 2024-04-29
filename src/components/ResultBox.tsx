import React from 'react'
// @ts-expect-error TS(2307): Cannot find module '../img/bookmark.png' or its co... Remove this comment to see the full error message
import falseBk from '../img/bookmark.png'
// @ts-expect-error TS(2307): Cannot find module '../img/bookmarkFill.png' or it... Remove this comment to see the full error message
import trueBk from '../img/bookmarkFill.png'
// @ts-expect-error TS(2307): Cannot find module './BookmarkBox.module.css' or i... Remove this comment to see the full error message
import styles from './BookmarkBox.module.css'

const BookmarkBox = (props: any) => {

    const title = props.title;
    const content = props.content;
    const bookmark = props.bookmark;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.bkbox}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.contents}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.title}>{title}</div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
            {content}
        </div>
    </div>
  )
}

export default BookmarkBox