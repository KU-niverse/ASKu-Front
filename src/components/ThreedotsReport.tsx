import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import ReportModal from './ReportModal'

import styles from './ThreedotsReport.module.css'
import threedots from '../img/threedots.png'

interface ThreedotsReportProps {
  type: number
  target: number
}
function ThreedotsReport({ type, target }: ThreedotsReportProps) {
  const nav = useNavigate()

  const [isReportModalVisible, setReportModalVisible] = useState(false)

  const closeReportModal = () => {
    setReportModalVisible(false)
  }
  const [loggedIn, setLoggedIn] = useState(false)
  const Navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  // 로그인 체크 후 우회
  // const checkLoginStatus = async () => {
  //   try {
  //     const res = await axios.get(
  //       process.env.REACT_APP_HOST+"/user/auth/issignedin",
  //       { withCredentials: true }
  //     );
  //     if (res.status === 201 && res.data.success === true) {
  //       setLoggedIn(true);
  //     } else if (res.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return Navigate(from);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoggedIn(false);
  //     if (error.response.status === 401) {
  //       setLoggedIn(false);
  //       alert("로그인이 필요한 서비스 입니다.");
  //       return Navigate(from);
  //     }else{
  //       alert("에러가 발생하였습니다");
  //       return Navigate(from);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  //

  // 로그인 체크 후 우회
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
      if (res.status === 201 && res.data.success === true) {
        setLoggedIn(true)
      } else if (res.status === 401) {
        setLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
      if (error.response.status === 401) {
        setLoggedIn(false)
      } else {
        alert('에러가 발생하였습니다')
      }
    }
  }
  useEffect(() => {
    checkLoginStatus()
  }, [])

  return (
    <Menu
      menuButton={
        <MenuButton className={styles.menubtn}>
          <img src={threedots} alt={'Menu'} />
        </MenuButton>
      }
    >
      <MenuItem
        className={styles.menuitem}
        value={'신고하기'}
        onClick={(e) => {
          checkLoginStatus()
          e.stopPropagation = true
          e.keepOpen = true
          e.syntheticEvent.preventDefault()
          setReportModalVisible(true)
        }}
      >
        {'신고하기\r'}
      </MenuItem>
      {isReportModalVisible && (
        <ReportModal
          type={type}
          target={target}
          isOpen={isReportModalVisible}
          onClose={() => setReportModalVisible(false)}
        />
      )}
    </Menu>
  )
}

export default ThreedotsReport
