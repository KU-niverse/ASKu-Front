import styles from "./ReportModal.module.css";
import closeBtn from "../img/close_btn.png";
import { useState, useEffect, useRef } from "react";
import haho_login from "../img/haho_login.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportModal({
  type,
  target,
  isOpen,
  onClose
}: any) {
  const modalRef = useRef(null);
  const [reportContent, setReportContent] =useState("");

  const [selectedReason, setSelectedReason] = useState(null);
  const requestBody = {
    target: target,
    reason_id: selectedReason,
    comment : reportContent
  };

  const handleSubmit = async (selectedReason: any) => {
    if (selectedReason === null) {
      alert("신고 사유를 선택해주세요.");
      return;
    }
    try {
      const response = await axios.post(
                process.env.REACT_APP_HOST+`/report/${type}`,
        requestBody,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("신고가 완료되었습니다.");
      }   window.location.reload();

    } catch (error) {
      console.error(error);
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleOutsideClick = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

    useEffect(() => {
    if (!isOpen) {
      return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  //report 기타 사유

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 70) {
      setReportContent(value);
    }
  };



  return (
        <>
      {isOpen && (
                <div className={styles.modal_overlay}>
                    <div ref={modalRef} className={styles.modal_wrapper}>
                        <div className={styles.modal_inside}>
                            <div className={styles.modal_close}>
                                <img
                  src={closeBtn}
                  alt="close"
                  className={styles.close_btn}
                  onClick={onClose}
                />
              </div>
                            <div className={styles.modal_content}>
                                <p className={styles.modal_text}>신고 사유 선택</p>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="1"
                                        onChange={() => setSelectedReason(1)}
                  />
                                    <span className={styles.label_text}>상업적 광고 및 판매</span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="2"
                                        onChange={() => setSelectedReason(2)}
                  />
                                    <span className={styles.label_text}>
                    정치인 비하 및 선거운동
                  </span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="3"
                                        onChange={() => setSelectedReason(3)}
                  />
                                    <span className={styles.label_text}>
                    게시판 성격에 부적절함
                  </span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="4"
                                        onChange={() => setSelectedReason(4)}
                  />
                                    <span className={styles.label_text}>음란물</span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="5"
                                        onChange={() => setSelectedReason(5)}
                  />
                                    <span className={styles.label_text}>낚시/놀람/도배</span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="6"
                                        onChange={() => setSelectedReason(6)}
                  />
                                    <span className={styles.label_text}>사칭사기</span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="7"
                                        onChange={() => setSelectedReason(7)}
                  />
                                    <span className={styles.label_text}>욕설비하</span>
                </label>
                                <label>
                                    <input
                    className={styles.modal_report}
                    type="radio"
                    name="reason"
                    value="8"
                                        onChange={() => setSelectedReason(8)}
                  />
                                    <span className={styles.label_text}>기타</span>
                </label>
                {selectedReason === 8 && (
                                    <textarea
                                        rows="4"
                    className={styles.report_textarea}
                    placeholder="신고 사유를 입력해주세요."
                    value={reportContent}
                    maxLength={70}
                    onChange={handleChange}
                  />
                )}
              </div>
                            <button className={styles.q_csubmit} onClick={handleSubmit}>
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportModal;
