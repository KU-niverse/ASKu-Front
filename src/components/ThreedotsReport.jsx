import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsReport.module.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReportModal from './ReportModal';


function ThreedotsReport({type, target}) {
  const nav = useNavigate();

const[isReportModalVisible, setReportModalVisible]= useState(false);

  const closeReportModal = () => {
    setReportModalVisible(false);
  };
  const [loggedIn, setLoggedIn] = useState(false);
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

  // const onReport = async () => {
  //   try {
  //     const result = await axios.post(`https://asku.wiki/api/report/${reason_id}`, {
  //         target: target,
  //         reason_id: reason_id,
  //     },{
  //         withCredentials: true,
  //     });
  //     if(result.status === 200){
  //         nav('/'); //신고 완료 모달로 이동
  //     }
  // } catch(error){
  //     console.log(error);
  //     return alert(error.response.data.message);
  // };
  // };//신고하기




  return (
    <Menu
    menuButton={<MenuButton  className={styles.menubtn}><img src={threedots} alt="Menu" /></MenuButton>} onItemClick={(e) => {console.log(`${e.value} clicked`)}}
    >
  

      <MenuItem 
        className={styles.menuitem} 
        value="신고하기"
        onClick={(e) =>{
          console.log(`${e.value} 클릭`);
          checkLoginStatus();
          e.stopPropagation = true;
          e.keepOpen = true;
          e.preventDefault=true;
          setReportModalVisible(true);

      
        }}
      >
        신고하기
      </MenuItem>
      {isReportModalVisible && <ReportModal type={type} target={target} isOpen={isReportModalVisible} onClose={() => setReportModalVisible(false)} />}
      
    </Menu>
    
  )}

export default ThreedotsReport;