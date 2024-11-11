import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios'

import { useQuery } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import Header from '../components/Header'
import search from '../img/SearchResult.svg'
import styles from './SearchResult.module.css'
import ResultQues from '../components/ResultQues'
import FormatTimeAgo from '../components/FormatTimeAgo'
import SearchResultBox from '../components/SearchResultBox'
import Paging from '../components/Paging'
import Footer from '../components/Footer'
import CautionIcon from '../img/DebateCautionIcon.svg'

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

interface UserAuthResponse {
  success: boolean
}

const fetchDocs = async (title: string) => {
  const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/query/${title}`, {
    withCredentials: true,
  })
  return result.data.data
}

const fetchQues = async (title: string) => {
  const result = await axios.get(`${process.env.REACT_APP_HOST}/question/query/${title}`, {
    withCredentials: true,
  })
  return result.data.data
}

const fetchHistory = async (type: string) => {
  const result = await axios.get(`${process.env.REACT_APP_HOST}/wiki/historys?type=${type}`)
  console.log(result.data.message)
  console.log(type)
  return result.data.message
}

function useCheckLoginStatus() {
  return useQuery<UserAuthResponse, AxiosError>(
    'loginStatus',
    async () => {
      const res = await axios.get<UserAuthResponse>(`${process.env.REACT_APP_HOST}/auth/issignedin`, {
        withCredentials: true,
      })
      return res.data
    },
    {
      retry: false,
      onError: (error: AxiosError) => {
        console.error('로그인 상태 확인 에러:', error)
      },
    },
  )
}

const SearchResearch = () => {
  const nav = useNavigate()
  const { title, howto } = useParams<{ title: string; howto: string }>()
  const [isClicked, setIsClicked] = useState(true) // true: 문서 false: 질문
  const [type, setType] = useState('all')
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const { data: loginStatusData } = useCheckLoginStatus()
  const [page, setPage] = useState<number>(1)
  const perPage = 7
  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const {
    data: docs = [],
    isLoading: isDocsLoading,
    refetch: refetchDocs,
  } = useQuery(['docs', title], () => fetchDocs(title!), {
    enabled: !!title,
  })

  const {
    data: ques = [],
    isLoading: isQuesLoading,
    refetch: refetchQues,
  } = useQuery(['ques', title], () => fetchQues(title!), {
    enabled: !!title,
  })

  const {
    data: historys = [],
    isLoading: isHistorysLoading,
    refetch: refetchHistory,
  } = useQuery(['history', type], () => fetchHistory(type), {
    enabled: !!type,
  })

  useEffect(() => {
    if (title) {
      refetchDocs()
      refetchQues()
    }
  }, [title])

  useEffect(() => {
    refetchHistory()
  }, [type])

  useEffect(() => {
    if (docs.length !== 0 && ques.length !== 0) {
      track('view_search_result', {
        type: howto,
        keyword: title,
        wiki_count: docs.length,
        question_count: ques.length,
      })
    }
  }, [docs.length, ques.length])

  const handleButtonClick = () => {
    setIsClicked(!isClicked)
  }

  const handleDocsClick = (docTitle: string, index: number) => {
    track('click_wiki_in_search_result', {
      title: docTitle,
      index,
    })
    const encodedTitle = encodeURIComponent(docTitle)
    nav(`/wiki/${encodedTitle}`)
  }

  const handleNewwikiClick = async () => {
    if (!loginStatusData?.success) {
      alert('로그인이 필요한 서비스입니다')
      nav('/signin')
      return
    }
    track('click_to_navigate_create_wiki', {
      from_page: title,
    })
    nav('/newwiki')
  }

  return (
    <div className={styles.SearchResultContainer}>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className={styles.results}>
        <div className={styles.header}>
          <img alt={'검색 결과'} src={search} />
          <h4 className={styles.searchText}>
            {'"'}
            {title}
            {'" '}
          </h4>
          <h4 dangerouslySetInnerHTML={{ __html: '&nbsp;검색 결과' }} />
        </div>
        <div className={styles.typeWrap}>
          <p className={styles.type}>
            <button type={'button'} onClick={handleButtonClick} className={isClicked ? styles.btnRed : styles.btnGray}>
              {'문서\r'}
              <div className={isClicked ? styles.numberRed : styles.numberGray}>{docs.length}</div>
            </button>
            <button type={'button'} onClick={handleButtonClick} className={isClicked ? styles.btnGray : styles.btnRed}>
              {'질문\r'}
              <div className={isClicked ? styles.numberGray : styles.numberRed}>{ques.length}</div>
            </button>
          </p>
        </div>
        <div className={styles.boxes}>
          <div className={isClicked ? '' : styles.hidden}>
            {docs.slice(startIndex, endIndex).map((item: any, index: number) => (
              <div role={'presentation'} key={item.title} onClick={() => handleDocsClick(item.title, index)}>
                <SearchResultBox
                  title={item.title}
                  content={item.recent_filtered_content}
                  is_favorite={item.is_favorite}
                  result
                  version={item.latest_ver}
                />
              </div>
            ))}
            <div className={docs.length === 0 ? styles.cautionContainer : styles.hidden}>
              <img src={CautionIcon} alt={'cautionIcon'} className={styles.cautionIcon} />
              <p>{'검색결과가 없습니다.'}</p>
              <p>{'다른 검색어를 입력해주세요.'}</p>
            </div>
            <div className={docs.length === 0 ? styles.hidden : styles.pagingContainer}>
              <Paging total={docs.length} perPage={perPage} activePage={page} onChange={handlePageChange} />
            </div>
            <div className={styles.linkToNew}>
              <button type={'button'} className={styles.link} onClick={handleNewwikiClick}>
                {'원하시는 문서가 없으신가요? 새로운 문서를 생성해보세요\r'}
              </button>
            </div>
          </div>
          <div className={isClicked ? styles.hidden : ''}>
            {ques.map((item: any, index: number) => (
              <div className={styles.queboxes} key={item.id}>
                <ResultQues
                  index={index}
                  key={item.id}
                  id={item.id}
                  doc_id={item.doc_id}
                  user_id={item.user_id}
                  index_title={item.index_title}
                  content={item.content}
                  created_at={item.created_at}
                  answer_count={item.answer_count}
                  is_bad={item.is_bad}
                  nick={item.nickname}
                  like_count={item.like_count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.recents}>
          <p className={styles.recentTitle}>{'최근 변경'}</p>
          <div className={styles.recentWrap}>
            {historys.slice(0, 8).map((item: any, index: number) => {
              const timestamp = FormatTimeAgo(item.created_at)
              return (
                <ul key={item.title}>
                  <Link
                    to={`/wiki/${encodeURIComponent(item.doc_title)}`}
                    className={styles.linkTo}
                    onClick={() => {
                      track('click_recent_edit_wiki_in_search_result', {
                        title: item.title,
                        index,
                      })
                    }}
                  >
                    <span className={styles.listTitle}>{item.doc_title}</span>
                  </Link>
                  <span className={styles.listTimestamp}>{timestamp}</span>
                </ul>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default SearchResearch
