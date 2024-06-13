import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MyProfile.module.css'
import haho from '../../img/haho.png'
import BadgeModal from '../BadgeModal'
import NickEditModal from './NickEditModal'

interface MyProfileProps {
  nick: string
  point: number
  badge: string
  percent: string
  badgeimg: string
}

function MyProfile({ nick, point, badge, percent, badgeimg }: MyProfileProps) {
  const nav = useNavigate()
  const linktoBadge = () => {
    nav(`/mypage/mybadge`)
  }

  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const closeEditModal = () => {
    setEditModalVisible(false)
  }

  const [loggedIn, setLoggedIn] = useState(false)

  const handleNickEdit = () => {
    setEditModalVisible(true)
  }

  return (
    <div>
      <div className={styles.profileimg}>
        <img
          role={'presentation'}
          className={styles.profileimg_content}
          onClick={linktoBadge}
          src={badgeimg}
          alt={'haho'}
        />
      </div>
      <div className={styles.profilerow}>
        <div className={styles.rownick}>
          <span className={styles.rowtitle}>{'닉네임'}</span>
          <div className={styles.text}>
            <span className={styles.point}>{nick}</span>
            <span role={'presentation'} className={styles.editbtn} onClick={handleNickEdit}>
              {'수정\r'}
            </span>
          </div>
        </div>
        <div className={styles.rowbadge}>
          <span className={styles.rowtitle}>{'대표 뱃지'}</span>
          <span role={'presentation'} className={styles.text} onClick={linktoBadge}>
            {badge}
          </span>
        </div>
        <div className={styles.rowpoint}>
          <span className={styles.rowtitle}>{'기여도'}</span>
          <div className={styles.text}>
            <span className={styles.point}>
              {point}
              {'p'}
            </span>
            <span className={styles.rank}>
              {' 상위 '}
              {percent}
              {'%'}
            </span>
          </div>
        </div>
      </div>
      {isEditModalVisible && <NickEditModal isOpen={isEditModalVisible} onClose={closeEditModal} />}
    </div>
  )
}

export default MyProfile
