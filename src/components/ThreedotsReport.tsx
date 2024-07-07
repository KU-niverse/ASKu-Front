import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ReportModal from './ReportModal';
import { ClickEvent } from '@szhsin/react-menu';

import styles from './ThreedotsReport.module.css';
import threedots from '../img/threedots.png';

interface ThreedotsReportProps {
  type: number;
  target: number;
}

const fetchLoginStatus = async (): Promise<boolean> => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true });
    return res.status === 201 && res.data.success === true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return false;
    }
    throw error;
  }
};

function ThreedotsReport({ type, target }: ThreedotsReportProps) {
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const { data: loggedInStatus, refetch: refetchLoginStatus } = useQuery('loginStatus', fetchLoginStatus, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetchLoginStatus();
  }, [refetchLoginStatus]);

  const handleReportClick = async (e: ClickEvent) => {

    e.syntheticEvent.preventDefault();
    
    if (!loggedInStatus) {
      await refetchLoginStatus();
    }

    if (loggedInStatus) {
      setReportModalVisible(true);
    } else {
      alert('로그인이 필요한 서비스 입니다.');
      navigate(from);
    }
  };

  return (
    <Menu
      menuButton={
        <MenuButton className={styles.menubtn}>
          <img src={threedots} alt="Menu" />
        </MenuButton>
      }
    >
      <MenuItem
        className={styles.menuitem}
        onClick={handleReportClick}
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
  );
}

export default ThreedotsReport;
