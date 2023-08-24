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
  // const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

  //이름 정보 가져오기
  // const [mypageData, setMypageData] = useState([]);
  // useEffect(() => {
  //   console.log(mypageData)
  //   const takeMypage = async () =>{
  //     try{
  //       const res = await axios.get( `http://asku.wiki/api/user/mypage/info`, {withCredentials: true});
  //       if(res.status === 201){
  //         setMypageData(res.data);
  //         console.log(res.data.message)
  //         console.log(mypageData)
  //       }
  //       if(res.status === 401){
  //         console.log(res.data.message)
  //       }
  //       if(res.status === 500){
  //         console.log(res.data.message)
  //       }
  //     }catch (error){
  //       console.error(error);
  //     }
  //   }
  //   takeMypage();
  // }, []); // 종속성 배열이 비어있으므로 이 useEffect는 한 번만 실행

  // console.log(mypageData)

  //뱃지 데이터 불러오기
  const [myBadge, setMyBadge] = useState([]);
  useEffect(() => {
  const takeMyBadge = async () =>{
    try{
      const res = await axios.get( `https://asku.wiki/api/user/mypage/badgehistory`, {withCredentials: true});
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


  console.log(myBadge.data)

  //모든 뱃지 데이터 가져오기
  const[allBadge, setAllBadge] = useState([]);
  useEffect(()=>{
    const takeAllBadge = async () => {
      try{
        const response = await axios.get(`https://asku.wiki/api/user/mypage/badges`, {withCredentials: true})
        if(response.status===201){
          setAllBadge(response.data);
          console.log(response.data.message)
        }
        if(response.status===401){
          console.log(response.data.message)
        }
      }catch(error){
        console.error(error);
      }finally{
        setLoading(false);
      }
    }
      takeAllBadge();
    }, [])

    console.log(allBadge)
    console.log(allBadge.data)


  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return <div><SpinnerMypage/></div>; 
  }

  
  const myBadgeIds = new Set(myBadge&&myBadge.data&&myBadge.data.map(badge => badge.badge_id));
  const sortedBadges = [...allBadge.data].sort((a, b) => {
    const aIsMyBadge = myBadgeIds.has(a.id);
    const bIsMyBadge = myBadgeIds.has(b.id);
  
    // 먼저 내 뱃지인 경우를 우선 정렬하고, 그 외에는 id 순서로 정렬
    if (aIsMyBadge && !bIsMyBadge) {
      return -1;
    } else if (!aIsMyBadge && bIsMyBadge) {
      return 1;
    } else {
      return a.id - b.id;
    }
  });


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
          <p className={styles.b_headline}>나의 뱃지 목록</p>
          {/* <SwitchBadge  isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/> */}
        </div>
        <div className={styles.b_list}>
          {allBadge && allBadge.data && allBadge.data.length === 0 ? (
            <p></p>)
            : (
              allBadge&& allBadge.data&&sortedBadges&& sortedBadges.map((data) => (

               <Badge
                  key={data.id} // key prop 추가 (반복되는 엘리먼트는 고유한 key prop을 가져야 함)
                  id={data.id}
                  name={data.name}
                  image={data.image}
                  description={data.description}
                  event={data.event}
                  count={data.history_count}
                  myBadgeIds={myBadgeIds}
                  // className={myBadgeIds.has(data.id) ? styles.myBadgeStyle : styles.normalBadgeStyle}                
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