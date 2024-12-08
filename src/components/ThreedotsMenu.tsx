import { Menu, MenuItem, MenuButton, ClickEvent } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import threedots from '../img/threedots.png'
import styles from './ThreedotsMenu.module.css'
import EditModal from './EditModal'
import ReportModal from './ReportModal'

interface ThreedotsMenuProps {
  encodedTitle: string
  questionId: number
  type: number
}

function ThreedotsMenu({ encodedTitle, questionId, type }: ThreedotsMenuProps) {
  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const closeEditModal = () => {
    setEditModalVisible(false)
  }
  const [isReportModalVisible, setReportModalVisible] = useState(false)
  const closeReportModal = () => {
    setReportModalVisible(false)
  }
  const [loggedIn, setLoggedIn] = useState(false)

  const Navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/auth/issignedin`, { withCredentials: true })
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

  const onQuestionDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_HOST}/question/delete/${questionId}`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        alert(response.data.message)
        Navigate(`/wiki/morequestion/${encodedTitle}`)
      }
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 400) {
        alert('이미 답변 및 좋아요가 달렸거나, 다른 회원의 질문입니다.')
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className={styles.menucontainer}>
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
            checkLoginStatus()
            e.syntheticEvent.stopPropagation()
            e.syntheticEvent.preventDefault()
            setReportModalVisible(true)
          }}
        >
          {'신고하기\r'}
        </MenuItem>
        <MenuItem
          className={styles.menuitem}
          onClick={(e: ClickEvent) => {
            checkLoginStatus()
            e.syntheticEvent.stopPropagation()
            e.syntheticEvent.preventDefault()
            setEditModalVisible(true)
          }}
        >
          {'수정하기\r'}
        </MenuItem>
        <MenuItem
          className={styles.menuitem}
          onClick={(e: ClickEvent) => {
            checkLoginStatus()
            e.syntheticEvent.stopPropagation()
            e.syntheticEvent.preventDefault()
            onQuestionDelete()
          }}
        >
          {'삭제하기\r'}
        </MenuItem>
      </Menu>
      {isReportModalVisible && (
        <ReportModal
          target={questionId}
          type={type}
          isOpen={isReportModalVisible}
          onClose={() => setReportModalVisible(false)}
        />
      )}
      {isEditModalVisible && (
        <EditModal questionId={questionId} isOpen={isEditModalVisible} onClose={() => setEditModalVisible(false)} />
      )}
    </div>
  )
}

export default ThreedotsMenu
