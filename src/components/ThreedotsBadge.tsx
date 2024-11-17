// import { Menu, MenuItem, MenuButton, ClickEvent } from '@szhsin/react-menu'
import React from 'react'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import axios from 'axios'
import styles from './ThreedotsBadge.module.css'

interface ThreedotsBadgeProps {
  badge_id: number
  badge_disabled: boolean
  is_rep_badge: boolean
}

function ThreedotsBadge({ badge_id, badge_disabled, is_rep_badge }: ThreedotsBadgeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onRepBadge()
  }

  const onRepBadge = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/user/mypage/setrepbadge`,
        { rep_badge_id: badge_id },
        { withCredentials: true },
      )
      if (response.status === 201) {
        alert('대표 뱃지가 변경되었습니다.')
        window.location.reload() // 페이지 새로고침
      } else if (response.status === 400) {
        alert(response.data.message)
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error(error)
    }
  } // 대표 뱃지 변경

  return (
    <button
      type="button"
      onClick={handleClick}
      className={is_rep_badge ? styles.repbtn : badge_disabled ? styles.disabledbtn : styles.menubtn}
      disabled={badge_disabled || is_rep_badge}
    >
      <span className={styles.menuText}>
        {is_rep_badge ? '현재 대표 뱃지' : badge_disabled ? '잠긴 뱃지' : '대표 뱃지로 설정'}
      </span>
    </button>
  )
}

export default ThreedotsBadge
