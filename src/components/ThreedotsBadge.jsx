import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsBadge.module.css"
import { useState } from 'react';
import axios from 'axios';


function ThreedotsBadge({badge_id}) {

  const onRepBadge = async () => {
    try {
      const response = await axios.put(`https://asku.wiki//user/mypage/setrepbadge`, { rep_badge_id: badge_id }, {withCredentials: true});
      if(response.status===201){
        console.log(response.data);
        alert("대표 뱃지가 변경되었습니다.");
      } else if(response.status===400){
        console.log(response.data)
        alert(response.data.message)
      } else {
        console.log(response.data);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
    catch (error) {
      console.error(error);
    }
  };//대표 뱃지 변경  



  return (
    <Menu
    menuButton={<MenuButton  className={styles.menubtn}><img src={threedots} alt="Menu" /></MenuButton>}      onItemClick={(e) => console.log(`${e.value} clicked`)}
    >

      <MenuItem 
        className={styles.menuitem} 
        value="대표 뱃지로 설정"
        onClick={(e) =>{
          console.log(`${e.value} clicked`);
          e.stopPropagation=true;
          e.preventDefault=true;
         onRepBadge(badge_id);
        }}
      >대표 뱃지로 설정</MenuItem>
    </Menu>
  )}

export default ThreedotsBadge;