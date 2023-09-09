import React, { useState, useEffect } from 'react';
import axios from 'axios';
import like from '../img/like.png'; 
import likeFill from '../img/likeFill.png'; 
import styles from './LikeorNot.module.css'
import { useNavigate } from 'react-router-dom';

const LikeorNot = ({ questionId, like_count, user_id }) => {
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem(`likeStatus_${user_id}_${questionId}`) === 'true'
  );
  const [currentLikeCount, setCurrentLikeCount] = useState(like_count);
  const [loggedIn, setLoggedIn] = useState(false);

  const Navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/auth/issignedin", { withCredentials: true });
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true);
      } else if (res.status === 401) {
        setLoggedIn(false);
        alert("로그인이 필요합니다.")
        Navigate('/signin');
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      alert("로그인이 필요합니다.")
      Navigate('/signin');
    }
  };

  const handleLikeClick = async () => {
    if (!loggedIn) {
      await checkLoginStatus();
    }

    try {
      const res = await axios.post(`http://localhost:8080/question/like/${questionId}`, {}, { withCredentials: true });
      if (res.status === 200) {
        const newIsLiked = !isLiked;
        console.log(res.data.message);
        setCurrentLikeCount(currentLikeCount + 1);
        localStorage.setItem(`likeStatus_${user_id}_${questionId}`, newIsLiked);
        setIsLiked(newIsLiked);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert("이미 좋아요를 눌렀습니다.")
      } else if (error.response && error.response.status === 403) {
        alert("본인의 질문에는 좋아요를 누를 수 없습니다.")
      } else {
        // alert("알 수 없는 오류가 발생했습니다.")
      }
    }
  };

  return (
    <div className={styles.like}>
      <img
        className={styles.likeimg}
        src={isLiked ? likeFill : like}
        alt="like"
        onClick={handleLikeClick}
      />
      <span className={styles.likeCount}>{currentLikeCount}</span>
    </div>
  );
};

export default LikeorNot;
