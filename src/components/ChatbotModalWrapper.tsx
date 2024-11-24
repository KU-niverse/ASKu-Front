import { useState, useEffect } from 'react'
import ChatbotModal from './ChatbotModal'

interface ChatbotModalWrapperProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

const ChatbotModalWrapper = ({ isLoggedIn, setIsLoggedIn }: ChatbotModalWrapperProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={'chatbot-modal'}>
      {!isMobile && <ChatbotModal isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
    </div>
  )
}

export default ChatbotModalWrapper
