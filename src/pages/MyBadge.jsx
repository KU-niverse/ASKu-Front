import React from 'react';
import styles from './MyBadge.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import SwitchBadge from '../components/SwitchBadge';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


//이렇게 작성
function MyBadge() {
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현


  const [myBadge, setMyBadge] = useState([]);
  useEffect(() => {
  const takeMyBadge = async () =>{
    try{
      const res = await axios.get( `http://118.67.130.57:8080/user/mypage/badgehistory`, {withCredentials: true});
      if(res.status === 201){
        setMyBadge(res.data);
      }
      if(res.status === 401){
        console.log(res.data.message)
      }
    }catch (error){
      console.error(error);
    }
  } 
    takeMyBadge();
  }, []);


  return (
    <div className={styles.container}>
        <div>
            <Header />
        </div>
        <div className={styles.header}>
          <p className={styles.mypage}>MYPAGE</p>
        </div>
      <div className={styles.mybadgecontent}>
        <div className={styles.b_header}>
          <p className={styles.b_headline}>{myBadge.user_id}님의 뱃지 목록</p>
          <SwitchBadge  isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
        </div>
        <div className={styles.b_list}>
          {myBadge.length > 0 ? (
            myBadge.map((data) => (
              <Badge
                key={data.id} // key prop 추가 (반복되는 엘리먼트는 고유한 key prop을 가져야 함)
                id={data.id}
                user_id={data.user_id}
                badge_id={data.badge_id}
                time={data.created_at}
              />
            ))
          ) : (
            <p>No badges found.</p>
          )}
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};




export default MyBadge;