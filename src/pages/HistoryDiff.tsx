import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import ReactDiffViewer from 'react-diff-viewer'
import { useParams, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import axios, { AxiosError } from 'axios'
import his2 from '../img/his2.png'
import styles from './HistoryDiff.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SpinnerMypage from '../components/SpinnerMypage'

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

interface ComparisonResponse {
  jsonData: {
    oldrev_text: string
    rev_text: string
  }
}

function useCompareHistory(title: string, ver: string) {
  const nav = useNavigate()

  return useQuery<ComparisonResponse, AxiosError>(
    ['compareHistory', title, ver],
    async () => {
      const result = await axios.get<ComparisonResponse>(
        `${process.env.REACT_APP_HOST}/wiki/comparison/${title}/rev/${ver}/oldrev/${Number(ver) - 1}`,
        {
          withCredentials: true,
        },
      )
      return result.data
    },
    {
      enabled: !!title && !!ver, // title과 ver가 모두 유효할 때만 쿼리 실행
      retry: false,
      onError: (error: AxiosError) => {
        console.error(error)
        console.error(error.response?.data)
        alert('비교 데이터를 가져오는 중 오류가 발생했습니다.')
        nav(`/history/${encodeURIComponent(title)}`)
      },
    },
  )
}

const HistoryDiff = () => {
  const [isSplit, setIsSplit] = useState(true)
  const { title, ver } = useParams<{ title: string; ver: string }>()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const mediaQuery = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    setIsSplit(!mediaQuery)
  }, [mediaQuery])

  const { isLoading, isError, error, data: comparisonData } = useCompareHistory(title, ver)

  if (isLoading)
    return (
      <div>
        <SpinnerMypage />
      </div>
    )
  if (isError)
    return (
      <div>
        {'에러: '}
        {error.message}
      </div>
    )

  const oldText = comparisonData?.jsonData.oldrev_text || ''
  const newText = comparisonData?.jsonData.rev_text || ''

  return (
    <div className={styles.pageWrap}>
      <div className={styles.historyDiffContainer}>
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        <div className={styles.historyDiffContent}>
          <div className={styles.historyDiffTitle}>
            <p className={styles.docTitle}>{title}</p>
            <p className={styles.listTitles}>{'문서의 변경 내용'}</p>
          </div>
          <div className={styles.historyDiffBox}>
            <div className={styles.verCompare}>
              <span className={styles.verCompareNum}>
                {'VERSION'}
                {Number(ver) - 1}
              </span>
              <span className={styles.verCompareNum}>
                {'VERSION'}
                {ver}
              </span>
            </div>
            <div className={styles.diffBox}>
              <ReactDiffViewer
                oldValue={oldText}
                newValue={newText}
                splitView={isSplit}
                styles={{ diffContainer: styles.diffBox }}
                showDiffOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}

export default HistoryDiff
