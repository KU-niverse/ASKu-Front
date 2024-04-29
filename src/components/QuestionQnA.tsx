import React from "react"
// @ts-expect-error TS(2307): Cannot find module '../img/comment_icon.png' or it... Remove this comment to see the full error message
import comment_icon from "../img/comment_icon.png"
// @ts-expect-error TS(2307): Cannot find module '../img/edit.png' or its corres... Remove this comment to see the full error message
import edit from "../img/edit.png"
// @ts-expect-error TS(2307): Cannot find module '../components/QuestionQnA.modu... Remove this comment to see the full error message
import styles from "../components/QuestionQnA.module.css"
// @ts-expect-error TS(6142): Module './FormatDate' was resolved to 'C:/Users/Us... Remove this comment to see the full error message
import FormatDate from "./FormatDate"
// @ts-expect-error TS(6142): Module './ThreedotsMenu' was resolved to 'C:/Users... Remove this comment to see the full error message
import ThreedotsMenu from "./ThreedotsMenu"
// @ts-expect-error TS(6142): Module './ThreedotsReport' was resolved to 'C:/Use... Remove this comment to see the full error message
import ThreedotsReport from "./ThreedotsReport"
// @ts-expect-error TS(6142): Module './LikeorNot' was resolved to 'C:/Users/Use... Remove this comment to see the full error message
import LikeorNot from "./LikeorNot"
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"

function QuestionQnA({
  badge_image,
  current_user_id,
  answer_count,
  title,
  question_id,
  doc_id,
  user_id,
  index_title,
  content,
  created_at,
  answer_or_not,
  is_bad,
  nick,
  like_count
}: any) {
  const formattedDate = FormatDate(created_at);

  const type = 2;
  const nav = useNavigate();
  const location = useLocation();
  const linktoQuestionEdit = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/question/edit/${encodedTitle}`, {
      state: {
        from: location.pathname,
        qid: question_id,
        user_id: user_id,
        content: content,
        created_at: created_at,
        like_count: like_count,
        nick: nick,
        index_title: index_title
      }
    });
  }


  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.q_list}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_fronthead}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_box}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img className={styles.q_badge} src={badge_image} alt="badge" />
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.q_mynick}>{nick}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.q_date}>{formattedDate}</span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_backhead}>
          {user_id === current_user_id ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThreedotsMenu questionId={question_id} type={type} />
          ) : (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThreedotsReport questionId={question_id} type={type} />
          )}
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_middle}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.q_icon}>Q. </span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className={styles.q_content}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.q_index}>[{index_title}]</span>
          {content}
        </span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.q_footer}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_frontfooter}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_like}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <LikeorNot className={styles.q_likebtn} questionId={question_id} like_count={like_count} user_id={user_id} />
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.q_comment}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={comment_icon} alt="comment" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.commentCount}>{answer_count}</span>
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.q_backfooter}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button onClick={linktoQuestionEdit} className={styles.q_editbtn}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={edit} alt="edit" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span>질문을 기반으로 문서 수정하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionQnA;