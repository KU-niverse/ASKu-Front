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
    <div className={styles.profileContainer}>
      <div className={styles.profileImg}>
        <img
          role={'presentation'}
          className={styles.profileImgContent}
          onClick={linktoBadge}
          src={badgeimg}
          alt={'haho'}
        />
      </div>
      <div className={styles.rowNick}>
        <span className={styles.name}>{`${nick}`}</span>
        <span className={styles.nameText}>{` 님`}</span>
        {/* <span role={'presentation'} className={styles.editbtn} onClick={handleNickEdit}>
              {'수정\r'}
            </span> */}
      </div>
      <div className={styles.infoRows}>
        <div className={styles.rowBadge}>
          <span className={styles.rowTitle}>{'대표 뱃지'}</span>
          <span className={styles.titleLine}>{'|'}</span>
          <span role={'presentation'} className={styles.badgeText} onClick={linktoBadge}>
            {badge}
          </span>
        </div>
        <div className={styles.rowPoint}>
          <span className={styles.rowTitle}>{'포인트'}</span>
          <span className={styles.titleLine}>{'|'}</span>
          <div className={styles.rowPointText}>
            <span className={styles.pointText}>
              {point}
              {'p'}
            </span>
            <span className={styles.rankText}>
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
