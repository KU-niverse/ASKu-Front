import { useState, useEffect, Fragment, useRef } from "react";
import styles from "./ChatAnswer.module.css";
import like from "../img/chatbot_like.svg";
import like_hover from "../img/chatbot_like_filled.svg";
import unlike from "../img/chatbot_unlike.svg";
import unlike_hover from "../img/chatbot_unlike_filled.svg";
import referenceIcon from "../img/reference.svg";
import dots from "../img/dots.png";
import haho from "../img/3d_haho.png";
import closeBtn from "../img/close_btn.png";
import LikeModal from "./LikeModal";
import UnlikeModal from "./UnlikeModal";
import RuleModal from "./RuleModal";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatAnswer = (props) => {
  const { content, reference, qnaId, blockIconZip } = props;
  const [likeHovered, setLikeHovered] = useState(false);
  const [unlikeHovered, setUnlikeHovered] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [likeModalOpen, setLikeModalOpen] = useState(false);
  const [unlikeModalOpen, setUnlikeModalOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState(0);
  const [processedContent, setProcessedContent] = useState(null);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [ruleContent, setRuleContent] = useState("");

  const handleLikeMouseOver = () => {
    setLikeHovered(true);
  };

  const handleLikeMouseLeave = () => {
    setLikeHovered(false);
  };

  const handleUnlikeMouseOver = () => {
    setUnlikeHovered(true);
  };

  const handleUnlikeMouseLeave = () => {
    setUnlikeHovered(false);
  };

  const handleReferenceOpen = () => {
    if (referenceOpen) {
      setReferenceOpen(false);
    } else {
      setReferenceOpen(true);
    }
  };

  const handleReferenceClose = () => {
    setReferenceOpen(false);
  };

  const handleLikeClick = () => {
    if (likeModalOpen) {
      setLikeModalOpen(false);
    } else {
      setLikeModalOpen(true);
    }
  };
  const handleUnlikeClick = () => {
    if (unlikeModalOpen) {
      setUnlikeModalOpen(false);
    } else {
      setUnlikeModalOpen(true);
    }
  };

  const sendLikeFeedback = () => {
    axios
      .post(process.env.REACT_APP_AI + "/chatbot/feedback/", {
        qna_id: qnaId,
        feedback: true,
      })
      .then((response) => {
        const updatedFeedbackId = response.data.id;
        setFeedbackId(updatedFeedbackId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendUnlikeFeedback = () => {
    axios
      .post(process.env.REACT_APP_AI + "/chatbot/feedback/", {
        qna_id: qnaId,
        feedback: false,
      })
      .then((response) => {
        const updatedFeedbackId = response.data.id;
        setFeedbackId(updatedFeedbackId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRuleModalOpen = (ruleContent) => {
    setRuleContent(ruleContent);
    setRuleModalOpen(true);
  };

  const handleRuleModalClose = () => {
    setRuleModalOpen(false);
    setRuleContent("");
  };

  const parseReference = (reference) => {
    if (reference === null) {
      return "";
    }

    try {
      const parsedReference = JSON.parse(reference);
      return (
        <div>
          <button
            className={styles.ruleButton}
            onClick={() => handleRuleModalOpen(parsedReference["Rule"])}
          >
            관련 학칙
          </button>
          {Object.entries(parsedReference)
            .filter(([key, value]) => key !== "Rule")
            .map(([link, value], index) => (
              <div key={index}>
                <Link to={`/wiki/${link}`} className={styles.reference_link}>
                  참고문서:{link}
                </Link>
              </div>
            ))}
        </div>
      );
    } catch {
      return reference;
    }
  };

  useEffect(() => {
    const newContent = content.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
    setProcessedContent(newContent); // 상태 업데이트
  }, [content]); // content 변경 시에만 실행

  return (
    <div>
      <div className={styles.answerBox}>
        <div className={styles.characterWrapper}>
          <div className={styles.characterContainer}>
            <img src={haho} alt="character" className={styles.character} />
          </div>
        </div>
        <div className={styles.chatTextWrap}>
          {/* <p className={styles.chatText}>{content}</p>*/}
          <p className={styles.chatText}>{processedContent}</p>
        </div>
        <img src={dots} className={styles.dots} />
        {/* <img
          src={dots}
          className={styles.dots}
          style={{ display: loading ? "block" : "none" }}
        />
      */}
        <div
          className={styles.iconZip}
          style={{ visibility: blockIconZip ? "hidden" : "inherit" }}
        >
          <img
            id={styles.like}
            className={styles.icon}
            src={likeHovered ? like_hover : like}
            alt="like"
            onMouseOver={handleLikeMouseOver}
            onMouseLeave={handleLikeMouseLeave}
            onClick={() => {
              handleLikeClick();
              sendLikeFeedback();
            }}
          />
          <img
            id={styles.unlike}
            className={styles.icon}
            src={unlikeHovered ? unlike_hover : unlike}
            alt="unlike"
            onMouseOver={handleUnlikeMouseOver}
            onMouseLeave={handleUnlikeMouseLeave}
            onClick={() => {
              handleUnlikeClick();
              sendUnlikeFeedback();
            }}
          />
          <img
            id={styles.referenceIcon}
            className={styles.icon}
            src={referenceIcon}
            alt="reference link"
            onClick={handleReferenceOpen}
          />
        </div>
        <div
          style={{ display: referenceOpen ? "block" : "none" }}
          className={styles.reference_wrap}
        >
          <div className={styles.reference}>
            <div className={styles.header}>
              <p clasName={styles.reference_title}>출처</p>
              <img
                className={styles.closeBtn}
                src={closeBtn}
                alt="close button"
                onClick={handleReferenceClose}
              />
            </div>
            <div className={styles.reference_text}>
              <p>{parseReference(reference)}</p>
            </div>
          </div>
        </div>
      </div>
      {likeModalOpen && (
        <LikeModal
          isOpen={likeModalOpen}
          onClose={() => setLikeModalOpen(false)}
          feedbackId={feedbackId}
        />
      )}
      {unlikeModalOpen && (
        <UnlikeModal
          isOpen={unlikeModalOpen}
          onClose={() => setUnlikeModalOpen(false)}
          feedbackId={feedbackId}
        />
      )}
      <RuleModal
        isOpen={ruleModalOpen}
        onClose={handleRuleModalClose}
        ruleContent={ruleContent}
      />
    </div>
  );
};

export default ChatAnswer;