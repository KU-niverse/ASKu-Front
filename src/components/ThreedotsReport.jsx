import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsReport.module.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReportModal from './ReportModal';


function ThreedotsReport({target, reason_id}) {
  const nav = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onReport = async () => {
    try {
      const result = await axios.post(`http://localhost:8080/report/${reason_id}`, {
          target: target,
          reason_id: reason_id,
      },{
          withCredentials: true,
      });
      if(result.status === 200){
          nav('/'); //신고 완료 모달로 이동
      }
  } catch(error){
      console.log(error);
      return alert(error.response.data.message);
  };
  };//신고하기




  return (
    <Menu
    menuButton={<MenuButton  className={styles.menubtn}><img src={threedots} alt="Menu" /></MenuButton>} onItemClick={(e) => {console.log(`${e.value} clicked`)}}
    >
  

      <MenuItem 
        className={styles.menuitem} 
        value="신고하기"
        onClick={(e) =>{
          console.log(`${e.value} 클릭`);
          e.preventDefault=true;
          setIsOpen(true);

      
        }}
      >신고하기</MenuItem>
      <ReportModal isOpen={openModal} closeModal={() => setIsOpen(false)} />
      
    </Menu>
    
  )}

export default ThreedotsReport;