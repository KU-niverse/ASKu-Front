import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './ChatAnswer.module.css'
import like from '../img/chatbot_like.svg'
import like_hover from '../img/chatbot_like_filled.svg'
import unlike from '../img/chatbot_unlike.svg'
import unlike_hover from '../img/chatbot_unlike_filled.svg'
import referenceIcon from '../img/reference.svg'
import dots from '../img/dots.png'
import haho from '../img/3d_haho.png'
import closeBtn from '../img/close_btn.png'
import LikeModal from './LikeModal'
import UnlikeModal from './UnlikeModal'

interface ChatAnswerProps {
  content: string
  reference: string
  qnaId: number
  blockIconZip: boolean
}

const ChatAnswer = ({ content, reference, qnaId, blockIconZip }: ChatAnswerProps) => {
  const [likeHovered, setLikeHovered] = useState(false)
  const [unlikeHovered, setUnlikeHovered] = useState(false)
  const [referenceOpen, setReferenceOpen] = useState(false)
  const [likeModalOpen, setLikeModalOpen] = useState(false)
  const [unlikeModalOpen, setUnlikeModalOpen] = useState(false)
  const [feedbackId, setFeedbackId] = useState(0)

  const handleLikeMouseOver = () => {
    setLikeHovered(true)
  }

  const handleLikeMouseLeave = () => {
    setLikeHovered(false)
  }

  const handleUnlikeMouseOver = () => {
    setUnlikeHovered(true)
  }

  const handleUnlikeMouseLeave = () => {
    setUnlikeHovered(false)
  }

  const handleReferenceOpen = () => {
    setReferenceOpen(!referenceOpen)
  }

  const handleReferenceClose = () => {
    setReferenceOpen(false)
  }

  const handleLikeClick = () => {
    setLikeModalOpen(!likeModalOpen)
  }

  const handleUnlikeClick = () => {
    setUnlikeModalOpen(!unlikeModalOpen)
  }

  const sendLikeFeedback = () => {
    axios
      .post(`${process.env.REACT_APP_AI}/chatbot/feedback/`, {
        qna_id: qnaId,
        feedback: true,
      })
      .then((response) => {
        const updatedFeedbackId = response.data.id
        setFeedbackId(updatedFeedbackId)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const sendUnlikeFeedback = () => {
    axios
      .post(`${process.env.REACT_APP_AI}/chatbot/feedback/`, {
        qna_id: qnaId,
        feedback: false,
      })
      .then((response) => {
        const updatedFeedbackId = response.data.id
        setFeedbackId(updatedFeedbackId)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const parseReference = (ref: string | null) => {
    if (ref === null) {
      return ''
    }

    try {
      const parsedReference = JSON.parse(ref)
      return (
        <div>
          <p>{'관련 학칙:'}</p>
          <p>{parsedReference.Rule}</p>
          {Object.entries(parsedReference)
            .filter(([key, value]) => key !== 'Rule')
            .map(([link, value]) => (
              <div key={link}>
                <Link to={`/wiki/${link}`} className={styles.reference_link}>
                  {'참고문서:'}
                  {link}
                </Link>
                <p>{value}</p>
              </div>
            ))}
        </div>
      )
    } catch {
      return ref
    }
  }

  return (
    <div>
      <div className={styles.answerBox}>
        <div className={styles.characterContainer}>
          <img src={haho} alt={'character'} className={styles.character} />
        </div>
        <div className={styles.chatTextWrap}>
          <p className={styles.chatText}>{content}</p>
        </div>
        <img src={dots} className={styles.dots} alt="" />
        <div className={styles.iconZip} style={{ visibility: blockIconZip ? 'hidden' : 'inherit' }}>
          <img
            role={'presentation'}
            id={styles.like}
            className={styles.icon}
            src={likeHovered ? like_hover : like}
            alt={'like'}
            onMouseOver={handleLikeMouseOver}
            onMouseLeave={handleLikeMouseLeave}
            onClick={() => {
              handleLikeClick()
              sendLikeFeedback()
            }}
            onFocus={handleLikeMouseOver}
            onBlur={handleLikeMouseLeave}
          />
          <img
            role={'presentation'}
            id={styles.unlike}
            className={styles.icon}
            src={unlikeHovered ? unlike_hover : unlike}
            alt={'unlike'}
            onMouseOver={handleUnlikeMouseOver}
            onMouseLeave={handleUnlikeMouseLeave}
            onClick={() => {
              handleUnlikeClick()
              sendUnlikeFeedback()
            }}
            onFocus={handleUnlikeMouseOver}
            onBlur={handleUnlikeMouseLeave}
          />
          <img
            role={'presentation'}
            id={styles.referenceIcon}
            className={styles.icon}
            src={referenceIcon}
            alt={'reference link'}
            onClick={handleReferenceOpen}
          />
        </div>
        <div style={{ display: referenceOpen ? 'block' : 'none' }} className={styles.reference_wrap}>
          <div className={styles.reference}>
            <div className={styles.header}>
              <p className={styles.reference_title}>{'출처'}</p>
              <img
                role={'presentation'}
                className={styles.closeBtn}
                src={closeBtn}
                alt={'close button'}
                onClick={handleReferenceClose}
              />
            </div>
            <div className={styles.reference_text}>
              {parseReference(reference)}
              <p>{reference}</p>
            </div>
          </div>
        </div>
      </div>
      {likeModalOpen && (
        <LikeModal isOpen={likeModalOpen} onClose={() => setLikeModalOpen(false)} feedbackId={feedbackId} />
      )}
      {unlikeModalOpen && (
        <UnlikeModal isOpen={unlikeModalOpen} onClose={() => setUnlikeModalOpen(false)} feedbackId={feedbackId} />
      )}
    </div>
  )
}

export default ChatAnswer
