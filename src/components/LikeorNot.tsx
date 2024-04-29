import React, { useState, useEffect } from "react";
import axios from "axios";
// @ts-expect-error TS(2307): Cannot find module '../img/like.png' or its corres... Remove this comment to see the full error message
import like from "../img/like.png";
// @ts-expect-error TS(2307): Cannot find module '../img/likeFill.png' or its co... Remove this comment to see the full error message
import likeFill from "../img/likeFill.png";
// @ts-expect-error TS(2307): Cannot find module './LikeorNot.module.css' or its... Remove this comment to see the full error message
import styles from "./LikeorNot.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const LikeorNot = ({
  questionId,
  like_count,
  user_id
}: any) => {
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem(`likeStatus_${user_id}_${questionId}`) === "true"
  );
  const [currentLikeCount, setCurrentLikeCount] = useState(like_count);
  const [loggedIn, setLoggedIn] = useState(false);

  const Navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

 //로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/auth/issignedin",
        { withCredentials: true }
      );
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        setLoggedIn(false);
      }else{
        alert("에러가 발생하였습니다");
      }
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  

  const handleLikeClick = async () => {
    if (!loggedIn) {
      await checkLoginStatus();
    }

    const newIsLiked = !isLiked;
    setCurrentLikeCount(currentLikeCount + (newIsLiked ? 1 : -1));
    // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
    localStorage.setItem(`likeStatus_${user_id}_${questionId}`, newIsLiked);
    setIsLiked(newIsLiked);

    try {
      const res = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/question/like/${questionId}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
      }
    } catch (error) {
      console.error(error);
      setCurrentLikeCount(currentLikeCount);
      setIsLiked(isLiked);

      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.status === 400) {
        alert("이미 좋아요를 눌렀습니다.");
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      } else if (error.response && error.response.status === 401) {
        //setLoggedIn(false);
        alert("로그인이 필요한 서비스 입니다.");
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      } else if (error.response && error.response.status === 403) {
        alert("본인의 질문에는 좋아요를 누를 수 없습니다.");
      } else {
      }
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.like}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <img
        className={styles.likeimg}
        src={isLiked ? likeFill : like}
        alt="like"
        onClick={handleLikeClick}
      />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className={styles.likeCount}>{currentLikeCount}</span>
    </div>
  );
};

export default LikeorNot;
