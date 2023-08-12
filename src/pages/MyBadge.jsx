import React from 'react';
import styles from './MyBadge.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import SwitchBadge from '../components/SwitchBadge';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import SpinnerMypage from '../components/SpinnerMypage';

function MyBadge() {
  const [loading, setLoading] = useState(true);
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

  // //이름 정보 가져오기
  // const [mypageData, setMypageData] = useState([]);
  // useEffect(() => {
  //   const takeMypage = async () =>{
  //     try{
  //       const res = await axios.get( `http://localhost:8080/user/mypage/info`, {withCredentials: true});
  //       if(res.status === 201){
  //         setMypageData(res.data);
  //         setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
  //       }
  //       if(res.status === 401){
  //         console.log(res.data.message)
  //       }
  //       if(res.status === 500){
  //         console.log(res.data.message)
  //       }
  //     }catch (error){
  //       console.error(error);
  //       setLoading(false); // 데이터 로딩 완료 시 로딩 상태 업데이트
  //     }
  //   }
  //   takeMypage();
  // }, []); // 종속성 배열이 비어있으므로 이 useEffect는 한 번만 실행


  //뱃지 데이터 불러오기
  const [myBadge, setMyBadge] = useState([]);
  useEffect(() => {
  const takeMyBadge = async () =>{
    try{
      const res = await axios.get( `http://localhost:8080/user/mypage/badges`, {withCredentials: true});
      if(res.status === 201){
        setMyBadge(res.data);
        setLoading(false)
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


  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return <div><SpinnerMypage/></div>; 
  }



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
          <p className={styles.b_headline}>전체 뱃지 목록</p>
          <SwitchBadge  isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
        </div>
        <div className={styles.b_list}>
          {myBadge && myBadge.data && myBadge.data.length === 0 ? (
            <p>아직 획득한 뱃지가 없습니다.</p>)
            : (
              myBadge&& myBadge.data&& myBadge.data.map((data) => (
                <Badge
                  key={data.id} // key prop 추가 (반복되는 엘리먼트는 고유한 key prop을 가져야 함)
                  id={data.id}
                  name={data.name}
                  image={data.image}
                  description={data.description}
                  event={data.event}
                  cont={data.cont}
                />
              ))
            ) 
          }
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
};




export default MyBadge;