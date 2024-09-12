import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import ChatbotMobile from '../components/ChatbotMobile'

interface UserInfo {
  id: number
  name: string
  login_id: string
  stu_id: string
  email: string
  rep_badge_id: number
  nickname: string
  created_at: Date
  point: number
  is_admin: boolean
  is_authorized: boolean
  restrict_period: number | null
  restrict_count: number
  rep_badge_name: string
  rep_badge_image: string
}

interface LoginStatusResponse {
  success: boolean
}

const fetchLoginStatus = async (): Promise<LoginStatusResponse> => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return res.data
}

const fetchUserInfo = async (): Promise<UserInfo> => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })

  if (!res.data.success) {
    throw new Error('Failed to fetch user info')
  }
  return {
    id: res.data.data[0].id,
    name: res.data.data[0].name,
    login_id: res.data.data[0].login_id,
    stu_id: res.data.data[0].stu_id,
    email: res.data.data[0].email,
    rep_badge_id: res.data.data[0].rep_badge_id,
    nickname: res.data.data[0].nickname,
    created_at: new Date(res.data.data[0].created_at),
    point: res.data.data[0].point,
    is_admin: res.data.data[0].is_admin,
    is_authorized: res.data.data[0].is_authorized,
    restrict_period: res.data.data[0].restrict_period,
    restrict_count: res.data.data[0].restrict_count,
    rep_badge_name: res.data.data[0].rep_badge_name,
    rep_badge_image: res.data.data[0].rep_badge_image,
  }
}

const MobileChatBotPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const { data: loginStatus, refetch: refetchLoginStatus } = useQuery('loginStatus', fetchLoginStatus)
  const { data: userInfoData, refetch: refetchUserInfo } = useQuery('userInfo', fetchUserInfo, {
    onSuccess: (data) => {
      setUserInfo(data) // 데이터가 성공적으로 받아졌을 때 상태 업데이트
    },
  })

  useEffect(() => {
    refetchLoginStatus()
  }, [])

  useEffect(() => {
    if (loginStatus?.success) {
      refetchUserInfo()
    }
  }, [loginStatus])

  const isLoggedIn = loginStatus?.success || false
  const userId = userInfo?.id || null

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <ChatbotMobile userId={userId} isLoggedIn={isLoggedIn} setIsLoggedIn={() => {}} />
    </>
  )
}

export default MobileChatBotPage
