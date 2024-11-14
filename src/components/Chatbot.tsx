import axios from 'axios'
import { useState, useEffect, useRef, Fragment, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useResizeDetector } from 'react-resize-detector'
import ChatAnswer from './ChatAnswer'
import ChatQuestion from './ChatQuestion'
import styles from './Chatbot.module.css'
import send from '../img/send.png'
import Spinner from './Spinner'
import LoginModal from './LoginModal'
import ClearModal from './ClearModal'
import RefreshModal from './RefreshModal'
import 'react-perfect-scrollbar/dist/css/styles.css'
import infoIcon from '../img/Info.svg'
import refreshIcon from '../img/Refresh.svg'
import haho from '../img/3d_haho.png'
import folderImg from '../img/initialchat_folder.png'
import plusImg from '../img/initialchat_plus.png'
import chatImg from '../img/initialchat_chat.png'

interface User {
  id: number
  created_at: Date
  email: string
  is_admin: number
  is_authorized: number
  nickname: string
  rep_badge_id: number
  rep_badge_image: string
  rep_badge_name: string
  restrict_count: number
}

interface UserData {
  data: User
}

interface ChatbotProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

function Chatbot({ isLoggedIn, setIsLoggedIn }: ChatbotProps) {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialChat, setInitialChat] = useState(true)
  const [SuggestContainerState, setSuggestContainerState] = useState('initial') // 'initial', 'suggest', 'reference'
  const [referenceList, setReferenceList] = useState<{ link: string; value: string }[]>([])
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [chatResponse, setChatResponse] = useState<any[]>([])
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const [previousChatHistory, setPreviousChatHistory] = useState<any[]>([])
  const [ClearModalOpen, setClearModalOpen] = useState(false)
  const [qnaId, setQnaId] = useState('')
  const [RefreshModalOpen, setRefreshModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const [recommendedQuestions, setRecommendedQuestions] = useState<string[]>([])
  const isInitialLoad = useRef(true) // 컴포넌트가 처음 로드될 때 true로 설정
  const [isStreaming, setIsStreaming] = useState(false)
  const [scrollPos, setScrollPos] = useState(0) // virtual scroll 초기 값
  const [windowHeight, setWindowHeight] = useState(window.innerHeight) // 현재 창 높이
  const [visibleItems, setVisibleItems] = useState(new Set())

  // const closeLoginModal = () => {
  //   setLoginModalVisible(false)
  // }
  const [user, setUser] = useState<User | null>(null)

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const suggestContainerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleMouseHover = (isHovering: boolean) => {
    if (!scrollRef.current) return

    if (isHovering) {
      scrollRef.current.style.overflowX = 'auto'
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
    } else {
      const id = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.overflowX = 'hidden'
        }
      }, 2000) // 2초 후 스크롤 숨김
      setTimeoutId(id)
    }
  }

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
    enabled: Boolean(isLoggedIn), // Only fetch user info if logged in
  })

  const fetchPreviousChatHistory = async (userId: number) => {
    const response = await axios.get(`${process.env.REACT_APP_AI}/chatbot/${userId}`, {
      withCredentials: true,
    })
    return response.data
  }
  const { data: previousHistory, refetch: refetchPreviousChatHistory } = useQuery(
    ['chatHistory', user?.id],
    () => fetchPreviousChatHistory(user!.id),
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

  useEffect(() => {
    if (chatResponse.length > 0) {
      const lastResponse = chatResponse[chatResponse.length - 1]
      const hasRecommendedQuestions = lastResponse.recommendedQuestions && lastResponse.recommendedQuestions.length > 0

      if (isInitialLoad.current) {
        // 초기 로드 시에는 SuggestContainerState를 'initial'로 설정
        setSuggestContainerState('initial')
      } else if (hasRecommendedQuestions) {
        setSuggestContainerState('suggest')
      } else setSuggestContainerState('reference')
    }
  }, [chatResponse, referenceList])

  const sendMessageMutation = useMutation(
    async () => {
      if (user) {
        const response = await axios.post(`${process.env.REACT_APP_AI}/chatbot/`, {
          q_content: inputValue,
          user_id: user.id,
        })
        return response.data
      }
      return {}
    },
    {
      onMutate: () => {
        setLoading(true)
        setSuggestContainerState('')
        setIsStreaming(false)
        setInitialChat(false)

        setChatResponse((prevResponses) => [
          ...prevResponses,
          { id: Date.now(), content: inputValue, isQuestion: true },
        ])
        setInputValue('')
      },
      onSuccess: (data) => {
        console.log('🚀 ~ Chatbot ~ data:', data)
        try {
          const newRecommendedQuestions = data.recommended_questions || []
          setRecommendedQuestions(newRecommendedQuestions)

          if (newRecommendedQuestions.length > 0) {
            setSuggestContainerState('suggest')
          } else {
            setSuggestContainerState('reference')
          }

          let tempAnswer = ''
          const finalAnswer = data.a_content
          const newQnaId = data.id

          setQnaId(newQnaId)
          setIsStreaming(true)

          inputRef.current?.blur()

          let currentIndex = 0
          const interval = setInterval(() => {
            if (currentIndex < finalAnswer.length) {
              tempAnswer += finalAnswer[currentIndex]

              setChatResponse((prevResponses) => {
                const updatedResponses = [...prevResponses]
                if (!updatedResponses[updatedResponses.length - 1].isQuestion) {
                  updatedResponses[updatedResponses.length - 1].content = tempAnswer
                  updatedResponses[updatedResponses.length - 1].qnaId = newQnaId
                } else {
                  updatedResponses.push({
                    id: Date.now(), // Adding a unique key
                    content: tempAnswer,
                    isQuestion: false,
                    blockIconZip: false, // 여기서 아이콘을 항상 표시하도록 설정
                    reference: data.reference,
                    qnaId: newQnaId,
                    recommendedQuestions: newRecommendedQuestions, // 추천 질문 전달
                  })
                }
                return updatedResponses
              })

              currentIndex += 1
            } else {
              clearInterval(interval)
              setIsStreaming(false)
              setLoading(false)
            }
          }, 50)
        } catch (error) {
          console.error('Error sending question: ', error)
          setLoading(false)
          setIsStreaming(false)
        }
      },
      onSettled: () => {
        isInitialLoad.current = false
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
        setIsStreaming(false)
      },
    },
  )

  const handleRecommendQuestionClick = (question: string) => {
    setSuggestContainerState('')
    setInputValue(question)

    setTimeout(() => {
      sendMessageMutation.mutate()
    }, 0)
    setSuggestContainerState('reference')
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50) // 지연 시간 50ms => 렌더링 시간 지연 고려
  }

  const handleSendClick = () => {
    if (!isLoggedIn) {
      setLoginModalVisible(true)
      return
    }

    if (!inputValue.trim()) {
      return
    }

    sendMessageMutation.mutate()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.target === inputRef.current) {
      if (!inputValue.trim()) {
        return
      }
      handleSendClick()
    }
  }

  const handleSuggestClick = (content: string) => {
    const newChatResponse = [...chatResponse, { id: Date.now(), content, isQuestion: true, isSuggest: true }]
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

      const updatedChatResponse = [
        ...newChatResponse,
        { id: Date.now(), content: answer, blockIconZip: true, isSuggest: true },
      ]
      setChatResponse(updatedChatResponse)
      setInputValue('')
      setSuggestContainerState('initial')
      setInitialChat(false)
    }, 3000)
  }

  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chatResponse])

  useLayoutEffect(() => {
    scrollToBottom()
  }, [previousChatHistory]) // history fetch 완료 후 scrolltobottom

  useEffect(() => {
    scrollToBottom()
  }, [loading])

  const onAddReferenceSuggestion = (references: { link: string; value: string }[]) => {
    setReferenceList(references)
  }

  function onScroll() {
    if (scrollRef.current) {
      setScrollPos(scrollRef.current.scrollTop)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', onScroll)
    } else {
      console.error('scrollRef is not assigned to any element')
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', onScroll)
      }
    }
  }, [previousChatHistory])

  // 컴포넌트가 마운트될 때 현재 스크롤 위치를 즉시 설정
  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    const handleScroll = () => {
      const currentScrollPos = scrollRef.current ? scrollRef.current.scrollTop : window.scrollY
      setScrollPos(currentScrollPos)
    }

    const scrollElement = scrollRef.current || window
    scrollElement.addEventListener('scroll', handleScroll)

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id')
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id)) // 요소가 보이면 추가
          } else {
            setVisibleItems((prev) => {
              const updated = new Set(prev)
              updated.delete(id) // 요소가 사라지면 제거
              return updated
            })
          }
        })
      },
      { root: scrollRef.current, threshold: 0.0, rootMargin: '300px' }, // 스크롤 영역에서 보이면 바로 감지
    )

    const items = document.querySelectorAll('[data-id]')
    items.forEach((item) => observer.observe(item))

    return () => {
      items.forEach((item) => observer.unobserve(item))
    }
  }, [previousChatHistory])

  return (
    <div className={styles.chatbot}>
      <div className={styles.chatbotHeader}>
        <div className={styles.title}>
          <img src={haho} alt={'haho'} className={styles.haho} />
          <div>{'AI 챗봇: 하호'}</div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <button
              type={'button'}
              className={styles.buttonText}
              onClick={() =>
                window.open('https://034179.notion.site/AI-b72545cea3ef421cbfc59ad6ed89fced?pvs=4', '_blank')
              }
            >
              <img src={infoIcon} className={styles.smallIcon} alt={'info'} />
              {'도움말'}
            </button>
          </div>
          <div role={'presentation'} className={styles.button} onClick={handleClearModal}>
            <img src={refreshIcon} className={styles.smallIcon} alt={'refresh'} />
            <button type={'button'} className={styles.buttonText}>
              {'채팅 초기화'}
            </button>
          </div>
        </div>
      </div>
      {previousChatHistory.length === 0 && initialChat ? (
        <div className={styles.initialChatbox}>
          <div className={styles.initialMessage}>
            {`고려대학교의 모-든`}
            <br />
            {`정보를 한 번에 보기`}
          </div>
          <div className={styles.initialSummaryImgWrap}>
            <img src={folderImg} alt={'summary_img'} className={styles.initialSummaryImg} />
            <img src={plusImg} alt={'summary_img'} id={styles.plusImg} />
            <img src={chatImg} alt={'summary_img'} className={styles.initialSummaryImg} />
          </div>
          <div className={styles.initialSummary}>
            <div className={styles.initialSummaryContent}>
              <div className={styles.initialSummaryTitle}>{'WIKI'}</div>
              {`재학생이 직접 작성한, 학교 생활에 대한`}
              <br />
              {`믿음직한 정보와 각종 팁을 검색해보세요!`}
            </div>
            <div className={styles.initialSummaryContent}>
              <div className={styles.initialSummaryTitle}>{'AI 챗봇'}</div>
              {`고려대학교 학칙을 기반으로 답변해주는 AI`}
              <br />
              {`챗봇에게 궁금한 점을 바로 질문해보세요!`}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.chat} ref={scrollRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
          {previousChatHistory.length !== 0 && (
            <>
              {previousChatHistory.map((item) => (
                <Fragment key={item.id}>
                  <div data-id={item.id} className={styles.chatSet}>
                    {visibleItems.has(String(item.id)) ? ( // 보이는 요소만 렌더링
                      <>
                        <ChatQuestion key={`question-${item.id}`} content={item.q_content} />
                        <ChatAnswer
                          key={`answer-${item.id}`}
                          content={item.a_content}
                          qnaId={item.id}
                          reference={item.reference}
                          blockIconZip={!isLoggedIn}
                          onAddReferenceSuggestion={onAddReferenceSuggestion}
                          recommendedQuestions={[]} // 초기 빈 배열
                          onRecommendQuestionClick={handleRecommendQuestionClick}
                        />
                      </>
                    ) : (
                      <div className={'skeleton'} style={{ height: '1000px' }} /> // 보이지 않는 요소는 플레이스홀더
                    )}
                  </div>
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
                blockIconZip={item.isSuggest}
                onAddReferenceSuggestion={onAddReferenceSuggestion}
                recommendedQuestions={item.recommendedQuestions || []} // 추천 질문 배열 전달
                onRecommendQuestionClick={handleRecommendQuestionClick}
              />
            )
          })}
          <div ref={chatBottomRef} />
          {loading && !isStreaming && <Spinner />}
        </div>
      )}

      <div
        className={`${styles.suggestContainer} ${loading ? styles.disabled : ''}`}
        ref={suggestContainerRef}
        style={{ display: SuggestContainerState === '' || loading ? 'none' : 'grid' }}
      >
        <p id={styles.ref}>
          {SuggestContainerState === 'initial'
            ? '추천 질문이에요:)'
            : SuggestContainerState === 'suggest'
              ? '추천 질문이에요:)'
              : SuggestContainerState === 'reference'
                ? '참고 문서'
                : null}
        </p>
        <div className={styles.suggest}>
          {SuggestContainerState === 'initial' && (
            <>
              <span
                role={'presentation'}
                id={'ref_res_1'}
                className={styles.textBox}
                style={{ marginLeft: '0px' }}
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
            </>
          )}
          {SuggestContainerState === 'suggest' &&
            chatResponse.length > 0 &&
            chatResponse[chatResponse.length - 1].recommendedQuestions?.map((question: string, index: number) => (
              <span
                role={'presentation'}
                key={`ref_res_${index + 1}`}
                className={styles.textBox}
                onClick={() => handleRecommendQuestionClick(question)}
              >
                {question}
              </span>
            ))}
          {SuggestContainerState === 'reference' &&
            referenceList.length > 0 &&
            referenceList.map((ref, index) => (
              <span
                role={'presentation'}
                id={`ref_res_${index + 1}`}
                className={styles.textBox}
                style={index === 0 ? { marginLeft: '0px' } : {}}
                onClick={() => window.open(`/wiki/${ref.link}`, '_blank')}
                key={ref.link}
              >
                {`${ref.link}`}
              </span>
            ))}
        </div>
      </div>

      {isLoginModalVisible && <LoginModal isOpen={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />}
      {RefreshModalOpen && <RefreshModal isOpen={RefreshModalOpen} onClose={() => setRefreshModalOpen(false)} />}
      {ClearModalOpen && (
        <ClearModal isOpen={ClearModalOpen} onClose={() => setClearModalOpen(false)} userId={user?.id} />
      )}
      <div className={styles.promptWrap} style={SuggestContainerState !== 'initial' ? { marginTop: '25px' } : {}}>
        <textarea
          className={`${styles.prompt} ${loading ? styles.disabled : ''}`}
          placeholder={'하호에게 궁금한 점을 질문하세요!'}
          value={inputValue}
          onChange={inputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          disabled={loading}
        />
        <button
          type={'button'}
          onClick={loading ? undefined : handleSendClick}
          style={{
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '1.5rem',
            display: 'flex',
            alignItems: 'center', // 수직 가운데 정렬
          }}
          disabled={loading}
        >
          <img src={send} alt={'전송'} className={styles.sendBtn} />
        </button>
      </div>
    </div>
  )
}

export default Chatbot
