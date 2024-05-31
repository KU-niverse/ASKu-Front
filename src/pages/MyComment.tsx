import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import styles from './MyComment.module.css'
import Header from '../components/Header'
import Comment from '../components/Comment'
import Footer from '../components/Footer'

import Switch from '../components/Switch'

import SpinnerMypage from '../components/SpinnerMypage'


interface MyDebateProps {
  success: boolean;
  message: {
    debate_id: number;
    debate_subject: string;
    debate_content: string;
    debate_content_time: string;
    is_bad: boolean;
    doc_title: string;
  }[];
}


function MyComment() {
  const [isToggled, setIsToggled] = useState(false) // import하려는 페이지에 구현
  const [loadingMyDebate, setLoadingMyDebate] = useState(true)
  const [loadingMypage, setLoadingMypage] = useState(true)

  // 토론 기록 불러오기
  const [myDebate, setMyDebate] = useState<MyDebateProps>({ success: false, message: [] });

  useEffect(() => {
    const takeMyDebate = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/debatehistory`, {
          withCredentials: true,
        })
        if (res.status === 201) {
          setMyDebate(res.data)
          setLoadingMyDebate(false) // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
        if (res.status === 500) {
        }
      } catch (error) {
        console.error(error)
        setLoadingMyDebate(false) // 데이터 로딩 완료 시 로딩 상태 업데이트
      }
    }
    takeMyDebate()
  }, [])

  interface MyInfoProps {
    success: boolean;
    message: string;
    data: {
      id: number;
      name: string;
      login_id: string;
      stu_id: string;
      email: string;
      rep_badge_id: number;
      nickname: string;
      created_at: string;
      point: number;
      is_admin: number;
      is_authorized: number;
      restrict_period: string | null;
      restrict_count: number;
      rep_badge_name: string;
      rep_badge_image: string;
    }[];
  }
  
  // 내 정보 불러오기
  const [mypageData, setMypageData] = useState<MyInfoProps>({ success: false, message: "", data: [] });
  useEffect(() => {
    const takeMypage = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/user/mypage/info`, { withCredentials: true })
        if (res.status === 201) {
          setMypageData(res.data)
          setLoadingMypage(false) // 데이터 로딩 완료 시 로딩 상태 업데이트
        }
        if (res.status === 401) {
        }
        if (res.status === 500) {
        }
      } catch (error) {
        console.error(error)
        setLoadingMypage(false) // 데이터 로딩 완료 시 로딩 상태 업데이트
      }
    }
    takeMypage()
  }, []) // 종속성 배열이 비어있으므로 이 useEffect는 한 번만 실행

  interface MyDebateMessage {
    debate_id: number;
    debate_subject: string;
    debate_content: string;
    debate_content_time: string;
    is_bad: boolean;
    doc_title: string;
  }
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      {loadingMyDebate || loadingMypage ? (
        <div>
          <SpinnerMypage />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.comment}>{'내가 쓴 토론'}</p>
            <div className={styles.switch}>
              {/* <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/> */}
            </div>
          </div>
          {mypageData && myDebate && myDebate.message && myDebate.message.length === 0 ? (
            <p>{'아직 작성한 토론이 없습니다.'}</p>
          ) : (
            mypageData &&
            myDebate &&
            myDebate.message &&
            myDebate.message.map((debate: MyDebateMessage) => (
              <Comment
                key={debate.debate_id} // 반복되는 컴포넌트의 경우 key를 설정해야 합니다.
                id={debate.debate_id}
                subject={debate.debate_subject}
                content={debate.debate_content}
                created_at={debate.debate_content_time}
                is_bad={debate.is_bad}
                docsname={debate.doc_title}
                nick={mypageData.data[0].nickname}
              />
            ))
          )}
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MyComment
