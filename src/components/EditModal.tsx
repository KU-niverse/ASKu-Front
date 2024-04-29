// @ts-expect-error TS(2307): Cannot find module './EditModal.module.css' or its... Remove this comment to see the full error message
import styles from "./EditModal.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from "../img/close_btn.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EditModal({
  isOpen,
  onClose,
  questionId
}: any) {
  const modalRef = useRef(null);
  const [questionContent, setQuestionContent] = useState("");
  const handleOutsideClick = (event: any) => {
    // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setQuestionContent(value);
    }
  };

  const editData = {
    new_content: questionContent,
  };

  const handleQuestionEdit = async () => {
    try {
      const response = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/question/edit/${questionId}`,
        editData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 400) {
        alert("이미 답변이 달렸거나, 다른 회원의 질문입니다.");
        window.location.reload();
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  }; //질문 수정하기

  const handleSubmit = () => {
    if (questionContent.trim() === "") {
      alert("질문을 입력해주세요.");
      return;
    }
    // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
    handleQuestionEdit(editData);
  };

  const countCharacters = () => {
    return `${questionContent.length}/200`;
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {isOpen && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.modal_overlay}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div ref={modalRef} className={styles.modal_wrapper}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.modal_inside}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.modal_close}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img
                  src={closeBtn}
                  alt="close"
                  className={styles.close_btn}
                  onClick={onClose}
                />
              </div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={styles.modal_content}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className={styles.modal_text}>질문 수정하기</p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.q_cbox}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <textarea
                    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                    rows="7"
                    className={styles.q_ctextarea}
                    placeholder="질문을 입력해주세요."
                    value={questionContent}
                    maxLength={200}
                    onChange={handleChange}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className={styles.q_clastheader}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={styles.textnum}>{countCharacters()}</span>
                  </div>
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className={styles.q_csubmit} onClick={handleSubmit}>
                  수정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditModal;
