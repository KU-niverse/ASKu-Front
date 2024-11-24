import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { track } from '@amplitude/analytics-browser'
import styles from '../../pages/Home.module.css'

interface PopularQuestion {
  id: number
  user_id: number
  content: string
  created_at: Date
  like_count: number
  nickname: string
  index_title: string
  answer_count: string
  title: string
}

const fetchPopularQuestions = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/question/popular`)
  return response.data.result
}

const RealTimePopularQuestionsComponent: React.FC = () => {
  const { data: popularQuestions = [], isLoading: isQuestionsLoading } = useQuery(
    'popularQuestions',
    fetchPopularQuestions,
  )
  return (
    <div className={styles.question}>
      <p className={styles.realTimeTitle}>{'실시간 인기 질문'}</p>
      {isQuestionsLoading ? (
        <p>{'Loading...'}</p>
      ) : (
        popularQuestions.map((question: PopularQuestion, index: number) => (
          <Link
            to={`wiki/morequestion/${encodeURIComponent(question.title)}/${question.id}`}
            state={{
              question_id: question.id,
              user_id: question.user_id,
              content: question.content,
              created_at: question.created_at,
              like_count: question.like_count,
              nick: question.nickname,
              index_title: question.index_title,
              answer_count: question.answer_count,
              title: question.title,
            }}
            className={styles.rankWrap}
            key={question.id}
            onClick={() => {
              track('click_trend_search_question', {
                question_rank: index + 1,
                question_title: question.content,
              })
            }}
          >
            <div className={styles.numberIcon}>{'Q.'}</div>
            <div className={styles.rankContent}>{question.content}</div>
          </Link>
        ))
      )}
    </div>
  )
}

export default RealTimePopularQuestionsComponent
