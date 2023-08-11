import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import threedots from "../img/dots.png"
import styles from "./ThreedotsReport.module.css"
import { useState } from 'react';
import axios from 'axios';


function ThreedotsReport({id}) {

  const onReport = async () => {
    try {
      
    }
    catch (error) {
      console.error(error);
    }
  };//신고하기



  return (
    <Menu
    menuButton={<MenuButton  className={styles.menubtn}><img src={threedots} alt="Menu" /></MenuButton>}      onItemClick={(e) => console.log(`${e.value} clicked`)}
    >
  

      <MenuItem 
        className={styles.menuitem} 
        value="신고하기"
        onClick={(e) =>{
          console.log(`${e.value} clicked`);
          e.stopPropagation=true;
          e.keepOpen=true;
          e.preventDefault=true;
         onReport(id);
        }}
      >신고하기</MenuItem>
    </Menu>
  )}

export default ThreedotsReport;