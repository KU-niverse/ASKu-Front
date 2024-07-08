import axios from 'axios'
import { useState, useEffect, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import ChatAnswer from './ChatAnswer'
import ChatQuestion from './ChatQuestion'
import styles from './Chatbot.module.css'
import arrow from '../img/arrow.png'
import Spinner from './Spinner'
import LoginModal from './LoginModal'
import ClearModal from './ClearModal'
import RefreshModal from './RefreshModal'

interface User {
  id: number
}

interface UserData {
  data: User[]
}

interface ChatbotProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

function Chatbot({ isLoggedIn, setIsLoggedIn }: ChatbotProps) {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggest, setShowSuggest] = useState(true)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [chatResponse, setChatResponse] = useState<any[]>([])
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const [previousChatHistory, setPreviousChatHistory] = useState<any[]>([])
  const blockIconZip = true
  const [ClearModalOpen, setClearModalOpen] = useState(false)
  const [qnaId, setQnaId] = useState('')
  const [RefreshModalOpen, setRefreshModalOpen] = useState(false)
  const closeLoginModal = () => {
    setLoginModalVisible(false)
  }
  const [user, setUser] = useState<UserData | null>(null)

  const queryClient = useQueryClient()

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleClearModal = () => {
    if (isLoggedIn) {
      setClearModalOpen(!ClearModalOpen)
    } else {
      setLoginModalVisible(true)
    }
  }

  const getUserInfo = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, {
      withCredentials: true,
    })
    return res.data
  }

  const { data: userInfo, refetch: refetchUserInfo } = useQuery('userInfo', getUserInfo, {
    onSuccess: (data) => {
      setUser(data)
    },
    onError: () => {
      setIsLoggedIn(false)
    },
    enabled: isLoggedIn, // Only fetch user info if logged in
  })

  const fetchPreviousChatHistory = async (userId: number) => {
    const response = await axios.get(`${process.env.REACT_APP_AI}/chatbot/${userId}`)
    return response.data
  }

  const { data: previousHistory, refetch: refetchPreviousChatHistory } = useQuery(
    ['chatHistory', user?.data[0].id],
    () => fetchPreviousChatHistory(user?.data[0].id),
    {
      enabled: !!user, // Only fetch chat history if userId is available
      onSuccess: (data) => {
        setPreviousChatHistory(data)
      },
    },
  )

  useEffect(() => {
    if (!isLoggedIn) {
      setPreviousChatHistory([])
    }
  }, [isLoggedIn])

  const sendMessageMutation = useMutation(
    async () => {
      if (user) {
        const response = await axios.post(`${process.env.REACT_APP_AI}/chatbot/`, {
          q_content: inputValue,
          user_id: user.data[0].id,
        })
        return response.data
      }
      return {}
    },
    {
      onMutate: () => {
        setLoading(true)
      },
      onSuccess: (data) => {
        setShowSuggest(false)
        inputRef.current?.blur()

        const newChatResponse = [
          ...chatResponse,
          { id: Date.now(), content: inputValue },
          {
            id: data.id,
            content: data.a_content,
            reference: data.reference,
            qnaId: data.id,
          },
        ]

        setChatResponse(newChatResponse)
        setInputValue('')
        setLoading(false)
        scrollToBottom()
      },
      onError: (error: any) => {
        console.error(error)
        if (error.response?.status === 403) {
          setLoginModalVisible(true)
        }
        if (error.response?.status === 406) {
          setRefreshModalOpen(true)
        }
        setLoading(false)
      },
    },
  )

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendClick = () => {
    if (!isLoggedIn) {
      setLoginModalVisible(true)
      return
    }
    sendMessageMutation.mutate()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.target === inputRef.current) {
      handleSendClick()
    }
  }

  const handleSuggestClick = (content: string) => {
    setShowSuggest(false)

    const newChatResponse = [...chatResponse, { id: Date.now(), content, isQuestion: true, blockIconZip: true }]
    setChatResponse(newChatResponse)

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      const dummyAnswers: { [key: string]: string } = {
        '강의 최소 출석 일수에 대해 알려줘.':
          '제1조 (목적) 이 규정은 고려대학교 학칙 제45조제1항 및 제46조제1항에 근거하여 출석인 정에 관한 세부사항을 정함을 목적으로 한다. 제2조 (출석 및 성적 처리 기준) (1) 총 수업시간의 1/3 이상을 결석한 학생에 대해서는 성적을 부여하지 않습니다. 따라서, 고려대학교에서는 수업시간의 1/3 이상을 결석하면 성적을 받을 수 없습니다. 추가적인 출석 요건은 학칙에 명시되어 있지 않으므로, 이 학칙에 따라 출석 인정 기준이 정해져 있다고 볼 수 있습니다.',
        '너는 누구야?':
          'AI 하호입니다. 저는 고려대학교 학생들의 고려대학교 학칙에 대한 질문에 대답하는 AI Chatbot입니다. 질문이 있으신가요?',
        '휴학은 최대 몇 년까지 가능해?':
          '휴학은 최대 3년(6학기)까지 가능합니다. 휴학기간은 학기 또는 1년 단위로 정해지며, 휴학신청기간은 1학기 휴학은 2월 1일부터 2월 25일까지, 2학기 휴학은 8월 1일부터 8월 25일까지입니다. 다만, 일반휴학의 경우에는 본교 부속병원장 또는 다른 종합병원장이 발행한 4주 이상의 진단서 및 지도교수 또는 학과(부)장의 확인서가 필요하며, 최장 1년까지 연장이 가능합니다. 또한, 임신, 출산, 육아 휴학의 기간은 최장 2년으로 하며, 군입대 휴학은 의무복무기간에 한하며, 해당 학생의 의사에 의한 복무기간 연장은 군입대 휴학이 아닌 일반휴학에 해당합니다. 창업휴학의 기간은 최장 2년(4학기)으로 하며, 별도 요건을 갖춘 경우에 한하여 창업휴학 기간을 1년(2학기) 연장할 수 있습니다. 이에 관한 세부사항은 창업휴학 운영지침으로 따로 정해져 있습니다.',
        '이중전공은 어떻게 해?':
          '고려대학교에서 이중전공을 신청하려면 다음과 같은 절차를 따라야 합니다. 1. 이중전공을 원하는 학과(부)의 학칙을 참고하여 신청 자격과 절차를 확인하세요. 2. 학교에서 제공하는 이중전공 신청 관련 양식을 작성하여 제출해야 합니다. 이에는 이중전공 신청서, 이수계획서, 성적증명서 등이 포함될 수 있습니다. 3. 이중전공 신청서에는 제1지망과 제2지망으로 지원할 학과(부)를 기재해야 합니다. 4. 이중전공 신청서와 다른 서류들을 정해진 기간 내에 학과(부) 사무실에 제출하세요. 5. 이중전공 신청자들은 소정의 선발전형(학업성적 등에 기초한 선발 방식)을 거쳐 총장의 허가를 받아야 합니다. 6. 합격 여부는 학과(부)에서 통보해줄 것입니다. 학과(부)마다 선발 기준과 절차가 다를 수 있으므로 해당 학과(부)의 내규를 확인하세요. 7. 이중전공 학생으로서 교육과정표에서 정해진 최소학점 이상의 전공과목을 이수해야 합니다. 8. 이중전공을 포기하고 심화전공 또는 다른 제2전공으로 변경하려면 해당되는 기간 내에 소정의 절차를 따라 포기신청을 해야 합니다. 위의 내용은 고려대학교 학칙 제106조~제108조에서 언급된 내용을 요약한 것입니다. 학교의 학칙과 부서별 규정을 확인하여 상세한 내용을 파악하고 절차를 따르시기 바랍니다.',
      }

      const answer = dummyAnswers[content] || '미리 저장된 답변이 없습니다.'

      const updatedChatResponse = [...newChatResponse, { id: Date.now(), content: answer, blockIconZip: true }]
      setChatResponse(updatedChatResponse)
      setInputValue('')
      setShowSuggest(true)
    }, 3000)
  }

  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chatResponse])

  useEffect(() => {
    scrollToBottom()
  }, [previousChatHistory])

  useEffect(() => {
    scrollToBottom()
  }, [loading])

  return (
    <div className={styles.chatBot}>
      <div className={styles.sideBar}>
        <div className={styles.textWrap}>
          <button type={'button'} id={styles.title}>
            {'AI 하호'}
          </button>
          <button type={'button'} className={styles.button} onClick={handleClearModal}>
            {'채팅 비우기\r'}
          </button>
          <Link to={'https://034179.notion.site/AI-b72545cea3ef421cbfc59ad6ed89fced?pvs=4'} target={'_blank'}>
            <button type={'button'} className={styles.button}>
              {'도움말'}
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.chat}>
        <ChatAnswer
          content={'안녕하세요! 무엇이든 제게 질문해주세요!'}
          blockIconZip={blockIconZip}
          reference={''}
          qnaId={0}
        />
        {previousChatHistory.length !== 0 && (
          <>
            {previousChatHistory.map((item) => (
              <Fragment key={item.id}>
                <ChatQuestion content={item.q_content} />
                <ChatAnswer content={item.a_content} qnaId={item.id} reference={item.reference} blockIconZip={false} />
              </Fragment>
            ))}
          </>
        )}
        {chatResponse.map((item) => {
          if (item.isQuestion) {
            return <ChatQuestion key={item.id} content={item.content} />
          }
          return (
            <ChatAnswer
              key={item.id}
              content={item.content}
              reference={item.reference}
              qnaId={item.qnaId}
              blockIconZip={!blockIconZip}
            />
          )
        })}
        <div className={styles.suggest} style={{ display: showSuggest ? 'block' : 'none' }}>
          <p id={styles.ref}>{'추천 질문'}</p>
          <span
            role={'presentation'}
            id={'ref_res_1'}
            className={styles.textBox}
            onClick={() => handleSuggestClick('너는 누구야?')}
          >
            {'너는 누구야?\r'}
          </span>
          <span
            role={'presentation'}
            id={'ref_res_2'}
            className={styles.textBox}
            onClick={() => handleSuggestClick('휴학은 최대 몇 년까지 가능해?')}
          >
            {'휴학은 최대 몇 년까지 가능해?\r'}
          </span>
          <span
            role={'presentation'}
            id={'ref_res_3'}
            className={styles.textBox}
            onClick={() => handleSuggestClick('강의 최소 출석 일수에 대해 알려줘.')}
          >
            {'강의 최소 출석 일수에 대해 알려줘.\r'}
          </span>
          <span
            role={'presentation'}
            id={'ref_res_4'}
            className={styles.textBox}
            onClick={() => handleSuggestClick('이중전공은 어떻게 해?')}
          >
            {'이중전공은 어떻게 해?\r'}
          </span>
        </div>
        <div ref={chatBottomRef} />
        {loading && <Spinner />}
      </div>
      {isLoginModalVisible && <LoginModal isOpen={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />}
      {RefreshModalOpen && <RefreshModal isOpen={RefreshModalOpen} onClose={() => setRefreshModalOpen(false)} />}
      {ClearModalOpen && <ClearModal isOpen={ClearModalOpen} onClose={() => setClearModalOpen(false)} userId={user} />}
      <div className={styles.promptWrap}>
        <textarea
          className={styles.prompt}
          placeholder={'AI에게 무엇이든 물어보세요! (프롬프트 입력)'}
          value={inputValue}
          onChange={inputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          disabled={loading}
        />
        <div
          role={'presentation'}
          className={styles.sendBtn}
          onClick={loading ? null : handleSendClick}
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <img src={arrow} alt={'AI에게 질문하기 버튼'} />
        </div>
      </div>
    </div>
  )
}

export default Chatbot
