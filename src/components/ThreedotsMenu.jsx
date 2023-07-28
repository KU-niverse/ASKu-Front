import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsMenu.module.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ThreedotsMenu({questionID}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const Navigate = useNavigate(); 

  const checkLoginStatus = async () => {
    try {
        const res = await axios.get("http://118.67.130.57:8080/user/auth/issignedin", {withCredentials: true});
        if (res.status===201 && res.data.success===true) {
            setLoggedIn(true);
        } else if(res.status === 401){
            setLoggedIn(false);
            Navigate('/signin');
        }
    } catch (error) {
        console.error(error);
        setLoggedIn(false);
       Navigate('/signin');
    }
  };//로그인 상태 체크 함수



  const onQuestionDelete = async (questionID) => {
    await checkLoginStatus();
    if (!loggedIn) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      Navigate("/signin")}
    try {
      const response = await axios.delete(`http://118.67.130.57:8080/question/delete/${questionID}`, {withCredentials: true});
      if(response.status===200){
        console.log(response.data);
        return alert(response.data.message)
      } else if(response.status===400){
        console.log(response.data)
        return alert(response.data.message)
      } else {
        console.log(response.data);
        return alert("알 수 없는 오류가 발생했습니다.");
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
        }}
      >
        수정하기
      </MenuItem>

      <MenuItem 
        className={styles.menuitem} 
        value="삭제하기"
        onClick={(e) =>{
          console.log(`${e.value} clicked`);
          e.stopPropagation = true;
          e.keepOpen = true;
          onQuestionDelete(questionID);
        }}
      >삭제하기</MenuItem>
    </Menu>
  )}

export default ThreedotsMenu;