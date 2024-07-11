import { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Header from '../components/Header'
import ChatbotMobile from '../components/ChatbotMobile'

interface LoginStatusResponse {
  success: boolean
}

interface UserInfoResponse {
  success: boolean
  id: number
}

const fetchLoginStatus = async (): Promise<LoginStatusResponse> => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/auth/issignedin`, { withCredentials: true })
  return res.data
}

const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })
  return res.data
}

const MobileChatBotPage = () => {
  const { data: loginStatus, refetch: refetchLoginStatus } = useQuery('loginStatus', fetchLoginStatus)
  const { data: userInfo, refetch: refetchUserInfo } = useQuery('userInfo', fetchUserInfo, {
    enabled: false, // 처음에는 비활성화
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

  if (loginStatus === undefined || userInfo === undefined) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={() => {}} />
      <ChatbotMobile userId={userId} isLoggedIn={isLoggedIn} setIsLoggedIn={() => {}} />
    </>
  )
}

export default MobileChatBotPage
