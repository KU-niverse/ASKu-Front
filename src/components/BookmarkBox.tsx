import React from "react";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmarkfalse.png' or i... Remove this comment to see the full error message
import falseBk from "../img/bookmarkfalse.png";
// @ts-expect-error TS(2307): Cannot find module '../img/bookmarkFill.png' or it... Remove this comment to see the full error message
import trueBk from "../img/bookmarkFill.png";
// @ts-expect-error TS(2307): Cannot find module './BookmarkBox.module.css' or i... Remove this comment to see the full error message
import styles from "./BookmarkBox.module.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookmarkBox = (props: any) => {
  const title = props.title;
  const content = props.content;
  const [favorite, setFavorite] = useState(Boolean(props.is_favorite));
  const [imageSource, setImageSource] = useState(trueBk);
  const nav = useNavigate();
  const isResult = props.result;

  const addBookmark = async () => {
    try {
      const result = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/favorite/${title}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (result.data.success === true) {
        setFavorite(true);
        alert("즐겨찾기에 추가되었습니다");
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  const deleteBookmark = async () => {
    try {
      const result = await axios.delete(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/favorite/${title}`,
        {
          withCredentials: true,
        }
      );
      if (result.data.success === true) {
        setFavorite(false);
        alert("즐겨찾기에서 삭제되었습니다");
      } else {
        alert("문제가 발생하였습니다");
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
    if (favorite === true) {
      setImageSource(trueBk);
    } else if (favorite === false) {
      setImageSource(falseBk);
    }
  }, [favorite]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.bkbox}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.contents}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          className={styles.title}
          onClick={() => nav(`/wiki/${encodeURIComponent(title)}`)}
        >
          {title}
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img
            src={imageSource}
            alt="Image"
            onClick={handleClick}
            className={isResult ? `${styles.hidden}` : ""}
          />
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div
        className={styles.content}
        onClick={() => nav(`/wiki/${encodeURIComponent(title)}`)}
      >
        {content}
      </div>
    </div>
  );
};

export default BookmarkBox;
