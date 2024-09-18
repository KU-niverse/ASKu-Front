import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import styles from '../../pages/Home.module.css'

interface PopularKeyword {
  keyword: string
  id: number
}

const fetchPopularKeywords = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/search/popular`)
  return response.data.data
}

const RealTimePopularSearchesComponent: React.FC = () => {
  const { data: popularKeywords = [], isLoading: isKeywordsLoading } = useQuery('popularKeywords', fetchPopularKeywords)
  return (
    <div className={styles.keyWord}>
      <p className={styles.realTimeTitle}>{'실시간 인기 검색어'}</p>
      {isKeywordsLoading ? (
        <p>{'Loading...'}</p>
      ) : (
        popularKeywords.slice(0, 5).map((keyword: PopularKeyword, index: number) => (
          <Link
            to={`/result/${encodeURIComponent(keyword.keyword).replace(/\./g, '%2E')}/${encodeURIComponent('popularsearch')}`}
            className={styles.rankWrap}
            key={keyword.id}
            onClick={() => {
              track('click_trend_search_keyword', {
                search_rank: index + 1,
                search_keyword: keyword.keyword,
              })
            }}
          >
            <p className={index + 1 === 4 || index + 1 === 5 ? styles.blackNumberIcon : styles.numberIcon}>
              {index + 1}
              {'.'}
            </p>
            <p className={styles.rankContent}>{keyword.keyword}</p>
          </Link>
        ))
      )}
    </div>
  )
}

export default RealTimePopularSearchesComponent
