import { useState, useEffect } from "react";
// @ts-expect-error TS(2307): Cannot find module './ChatAnswer.module.css' or it... Remove this comment to see the full error message
import styles from "./ChatAnswer.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/chatbot_like.svg' or it... Remove this comment to see the full error message
import like from "../img/chatbot_like.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/chatbot_like_filled.svg... Remove this comment to see the full error message
import like_hover from "../img/chatbot_like_filled.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/chatbot_unlike.svg' or ... Remove this comment to see the full error message
import unlike from "../img/chatbot_unlike.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/chatbot_unlike_filled.s... Remove this comment to see the full error message
import unlike_hover from "../img/chatbot_unlike_filled.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/reference.svg' or its c... Remove this comment to see the full error message
import referenceIcon from "../img/reference.svg";
// @ts-expect-error TS(2307): Cannot find module '../img/dots.png' or its corres... Remove this comment to see the full error message
import dots from "../img/dots.png";
// @ts-expect-error TS(2307): Cannot find module '../img/3d_haho.png' or its cor... Remove this comment to see the full error message
import haho from "../img/3d_haho.png";
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from "../img/close_btn.png";
// @ts-expect-error TS(6142): Module './LikeModal' was resolved to 'C:/Users/Use... Remove this comment to see the full error message
import LikeModal from "./LikeModal";
// @ts-expect-error TS(6142): Module './UnlikeModal' was resolved to 'C:/Users/U... Remove this comment to see the full error message
import UnlikeModal from "./UnlikeModal";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatAnswer = (props: any) => {
  const { content, reference, qnaId, blockIconZip } = props;
  const [likeHovered, setLikeHovered] = useState(false);
  const [unlikeHovered, setUnlikeHovered] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [likeModalOpen, setLikeModalOpen] = useState(false);
  const [unlikeModalOpen, setUnlikeModalOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState(0);

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
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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

  const parseReference = (reference: any) => {
    if (reference === null) {
      return "";
    }

    try {
      const parsedReference = JSON.parse(reference);
      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p>관련 학칙:</p>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p>{parsedReference["Rule"]}</p>
          // @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
          {Object.entries(parsedReference)
            // @ts-expect-error TS(7031): Binding element 'key' implicitly has an 'any' type... Remove this comment to see the full error message
            .filter(([key, value]) => key !== "Rule")
            // @ts-expect-error TS(7031): Binding element 'link' implicitly has an 'any' typ... Remove this comment to see the full error message
            .map(([link, value], index: any) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div key={index}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to={`/wiki/${link}`} className={styles.reference_link}>
                  참고문서:{link}
                </Link>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>{value}</p>
              </div>
            ))}
        </div>
      );
    } catch {
      return reference;
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.answerBox}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.characterContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={haho} alt="character" className={styles.character} />
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.chatTextWrap}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.chatText}>{content}</p>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <img src={dots} className={styles.dots} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          className={styles.iconZip}
          style={{ visibility: blockIconZip ? "hidden" : "inherit" }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img
            id={styles.referenceIcon}
            className={styles.icon}
            src={referenceIcon}
            alt="reference link"
            onClick={handleReferenceOpen}
          />
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
          style={{ display: referenceOpen ? "block" : "none" }}
          className={styles.reference_wrap}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.reference}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.header}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p clasName={styles.reference_title}>출처</p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <img
                className={styles.closeBtn}
                src={closeBtn}
                alt="close button"
                onClick={handleReferenceClose}
              />
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.reference_text}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p>{parseReference(reference)}</p>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p>{reference}</p>
            </div>
          </div>
        </div>
      </div>
      {likeModalOpen && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <LikeModal
          isOpen={likeModalOpen}
          onClose={() => setLikeModalOpen(false)}
          feedbackId={feedbackId}
        />
      )}
      {unlikeModalOpen && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <UnlikeModal
          isOpen={unlikeModalOpen}
          onClose={() => setUnlikeModalOpen(false)}
          feedbackId={feedbackId}
        />
      )}
    </div>
  );
};

export default ChatAnswer;
