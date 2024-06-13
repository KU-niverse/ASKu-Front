import { Menu, MenuItem, MenuButton, ClickEvent } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import axios from 'axios'
import threedots from '../img/threedots.png'
import styles from './ThreedotsBadge.module.css'

interface ThreedotsBadgeProps {
  badge_id: number
}

function ThreedotsBadge({ badge_id }: ThreedotsBadgeProps) {
  const onRepBadge = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/user/mypage/setrepbadge`,
        { rep_badge_id: badge_id },
        { withCredentials: true },
      )
      if (response.status === 201) {
        alert('대표 뱃지가 변경되었습니다.')
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
    <Menu
      menuButton={
        <MenuButton className={styles.menubtn}>
          <img src={threedots} alt={'Menu'} />
        </MenuButton>
      }
    >
      <MenuItem
        className={styles.menuitem}
        onClick={(e: ClickEvent) => {
          e.syntheticEvent.stopPropagation()
          e.syntheticEvent.preventDefault()
          onRepBadge()
        }}
      >
        {'대표 뱃지로 설정\r'}
      </MenuItem>
    </Menu>
  )
}

export default ThreedotsBadge
