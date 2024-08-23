// ChatAnswer.tsx

import React, { useState, useEffect, Fragment } from 'react'
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
import RuleModal from './RuleModal'

interface ChatAnswerProps {
  content: string
  reference: string | null
  qnaId: number
  blockIconZip: boolean
  onAddReferenceSuggestion: (references: { link: string; value: string }[]) => void
  recommendedQuestions: string[] // 추가된 필드
  onRecommendQuestionClick: (question: string) => void // 추가된 콜백 함수
}

const ChatAnswer: React.FC<ChatAnswerProps> = ({
  content,
  reference,
  qnaId,
  blockIconZip,
  onAddReferenceSuggestion,
  recommendedQuestions,
  onRecommendQuestionClick,
}) => {
  const [likeHovered, setLikeHovered] = useState(false)
  const [unlikeHovered, setUnlikeHovered] = useState(false)
  const [referenceOpen, setReferenceOpen] = useState(false)
  const [likeModalOpen, setLikeModalOpen] = useState(false)
  const [unlikeModalOpen, setUnlikeModalOpen] = useState(false)
  const [processedContent, setProcessedContent] = useState<JSX.Element[] | null>(null)
  const [ruleModalOpen, setRuleModalOpen] = useState(false)
  const [ruleDetails, setRuleDetails] = useState('')
  const [parsedReferences, setParsedReferences] = useState<{
    references: { link: string; value: string }[]
    rule: string | null
  } | null>(null)

  const handleLikeMouseOver = () => setLikeHovered(true)
  const handleLikeMouseLeave = () => setLikeHovered(false)
  const handleUnlikeMouseOver = () => setUnlikeHovered(true)
  const handleUnlikeMouseLeave = () => setUnlikeHovered(false)
  const handleReferenceOpen = () => setReferenceOpen(!referenceOpen)
  const handleReferenceClose = () => setReferenceOpen(false)

  const handleLikeClick = () => setLikeModalOpen(true)
  const handleUnlikeClick = () => setUnlikeModalOpen(true)

  const handleRuleModalOpen = (details: string) => {
    setRuleDetails(details)
    setRuleModalOpen(true)
  }

  const handleRuleModalClose = () => setRuleModalOpen(false)

  useEffect(() => {
    if (content) {
      const newContent = content.split('\n').map((line) => (
        <Fragment key={`content-line-${line}`}>
          {line}
          <br />
        </Fragment>
      ))
      setProcessedContent(newContent)
    }
  }, [content])

  useEffect(() => {
    const parseReference = (ref: string | null) => {
      if (ref === null) return null
      try {
        const parsedReference = JSON.parse(ref)
        const references = Object.entries(parsedReference)
          .filter(([key]) => key !== 'Rule')
          .map(([link, value]) => ({ link, value: value as string }))
        return { references, rule: parsedReference.Rule || null }
      } catch {
        return null
      }
    }

    const parsedRefs = parseReference(reference)
    if (parsedRefs) {
      onAddReferenceSuggestion(parsedRefs.references)
      setParsedReferences(parsedRefs)
      setRuleDetails(parsedRefs.rule || '')
    }
  }, [reference, onAddReferenceSuggestion])

  return (
    <div>
      <div className={styles.answerBox}>
        <div className={styles.characterWrapper}>
          <div className={styles.characterContainer}>
            <img src={haho} alt={'character'} className={styles.character} />
          </div>
        </div>
        <div className={styles.chatTextWrap}>
          <p className={styles.chatText}>{processedContent}</p>
        </div>
        <img alt={'dots'} src={dots} className={styles.dots} />
        <div className={styles.iconZip} style={{ visibility: blockIconZip ? 'hidden' : 'inherit' }}>
          <img
            role={'presentation'}
            id={styles.like}
            className={styles.icon}
            src={likeHovered ? like_hover : like}
            alt={'like'}
            onMouseOver={handleLikeMouseOver}
            onMouseLeave={handleLikeMouseLeave}
            onFocus={handleLikeMouseOver}
            onBlur={handleLikeMouseLeave}
            onClick={handleLikeClick}
          />
          <img
            role={'presentation'}
            id={styles.unlike}
            className={styles.icon}
            src={unlikeHovered ? unlike_hover : unlike}
            alt={'unlike'}
            onMouseOver={handleUnlikeMouseOver}
            onMouseLeave={handleUnlikeMouseLeave}
            onFocus={handleUnlikeMouseOver}
            onBlur={handleUnlikeMouseLeave}
            onClick={handleUnlikeClick}
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
              {ruleDetails && (
                <button type={'button'} className={styles.ruleButton} onClick={() => handleRuleModalOpen(ruleDetails)}>
                  {'관련 학칙\r'}
                </button>
              )}
              {parsedReferences?.references.map(({ link }) => (
                <div key={link}>
                  <Link to={`/wiki/${link}`} className={styles.reference_link}>
                    {'참고문서: '}
                    {link}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {likeModalOpen && <LikeModal isOpen={likeModalOpen} onClose={() => setLikeModalOpen(false)} qnaId={qnaId} />}
      {unlikeModalOpen && (
        <UnlikeModal isOpen={unlikeModalOpen} onClose={() => setUnlikeModalOpen(false)} qnaId={qnaId} />
      )}
      <RuleModal isOpen={ruleModalOpen} onClose={handleRuleModalClose} ruleContent={ruleDetails} />
    </div>
  )
}

export default ChatAnswer
