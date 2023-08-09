import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsMenu.module.css"
import { useState } from 'react';
import axios from 'axios';


function ThreedotsMenu({questionId}) {

  const onQuestionDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/question/delete/${questionId}`, {withCredentials: true});
      if(response.status===200){
        console.log(response.data);
        alert(response.data.message);
        window.location.reload();
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
  };//질문 삭제하기



  return (
    <Menu
    menuButton={<MenuButton  className={styles.menubtn}><img src={threedots} alt="Menu" /></MenuButton>}      onItemClick={(e) => console.log(`${e.value} clicked`)}
    >
      <MenuItem className={styles.menuitem} value="신고하기" onClick={(e) => console.log(`${e.value} clicked`)}>
        신고하기
      </MenuItem>

      <MenuItem 
        className={styles.menuitem}
        value="수정하기"
        onClick={(e) => {
          console.log(`${e.value} clicked`);
          // Stop the `onItemClick` of root menu component from firing
          e.stopPropagation = true;
          // Keep the menu open after this menu item is clicked
          e.keepOpen = true;
          e.preventDefault=true;

        }}
      >
        수정하기
      </MenuItem>

      <MenuItem 
        className={styles.menuitem} 
        value="삭제하기"
        onClick={(e) =>{
          console.log(`${e.value} clicked`);
          e.stopPropagation=true;
          e.keepOpen=true;
          e.preventDefault=true;
         onQuestionDelete(questionId);
        }}
      >삭제하기</MenuItem>
    </Menu>
  )}

export default ThreedotsMenu;