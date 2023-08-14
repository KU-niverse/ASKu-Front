import React, { useState } from 'react';
import axios from 'axios';
import like from '../img/like.png'; 
import likeFill from '../img/likeFill.png'; 
import styles from './LikeorNot.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LikeorNot = ({ questionId, like_count, nick}) => {
  const [isLiked, setIsLiked] = useState(false); // 버튼 상태 추가
  const [currentLikeCount, setCurrentLikeCount] = useState(like_count);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState(nick);

  //login status 체크하기
  const Navigate = useNavigate();
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(" ${process.env.REACT_APP_HOST}/user/auth/issignedin", { withCredentials: true });
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
    try {
      const res = await axios.post(`${process.env.REACT_APP_HOST}/question/like/${questionId}`,{},{ withCredentials: true });
      if (res.status === 200) {
        const newIsLiked=!isLiked;
        setIsLiked(newIsLiked)
        console.log(res.data.message);
        setCurrentLikeCount(currentLikeCount + 1);
        localStorage.setItem(`likeStatus_${questionId}`, newIsLiked);
        // 현재 로그인한 사용자의 닉네임을 가져온다
        localStorage.setItem(`likeStatus_${userNickname}_${questionId}`, newIsLiked);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if(error.response && error.response.status === 400){ 
        alert("이미 좋아요를 눌렀습니다.")
      } else if(error.response && error.response.status === 401){
        alert("본인의 질문에는 좋아요를 누를 수 없습니다.")
      } else{
        alert("알 수 없는 오류가 발생했습니다.")
      }
    }
  };//좋아요 누르기


  useEffect(() => {
    const savedIsLiked = localStorage.getItem(`likeStatus_${userNickname}_${questionId}`);
    if (savedIsLiked) {
      setIsLiked(savedIsLiked === 'true');
    }
  }, [userNickname, questionId]);
//좋아요 누른 기록을 로컬에 저장



  return (
    <div className={styles.like}>
      <img
        className={styles.likeimg}
        src={isLiked ? likeFill : like}
        alt="like"
        onClick={()=>{
          checkLoginStatus();
          handleLikeClick(questionId)}
        }
      />
      <span className={styles.likeCount}>{currentLikeCount}</span>
    </div>
  );
};

export default LikeorNot;
