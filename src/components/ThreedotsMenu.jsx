import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsMenu.module.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';


function ThreedotsMenu({ questionId}) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const closeEditModal = () => {
      setEditModalVisible(false);
  };
  const [loggedIn, setLoggedIn] = useState(false);

  //login status 체크하기
  const Navigate = useNavigate();
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(" http://localhost:8080/user/auth/issignedin", { withCredentials: true });
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


  const onQuestionDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/question/delete/${questionId}`, {withCredentials: true});
      if(response.status===200){
        console.log(response.data);
        alert(response.data.message);
        window.location.reload();
      }
    }
    catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert("이미 답변 및 좋아요가 달렸거나, 다른 회원의 질문입니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
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
          checkLoginStatus();
          console.log(`${e.value} clicked`);
          // Stop the `onItemClick` of root menu component from firing
          e.stopPropagation = true;
          // Keep the menu open after this menu item is clicked
          e.keepOpen = true;
          e.preventDefault=true;
          setEditModalVisible(true);
          
        }}
      >
        수정하기
      </MenuItem>
      {isEditModalVisible && <EditModal questionId={questionId} isOpen={isEditModalVisible} onClose={() => setEditModalVisible(false)} />}

      <MenuItem 
        className={styles.menuitem} 
        value="삭제하기"
        onClick={(e) =>{
          checkLoginStatus();
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