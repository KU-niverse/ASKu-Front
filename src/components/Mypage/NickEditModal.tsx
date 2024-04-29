// @ts-expect-error TS(2307): Cannot find module './NickEditModal.module.css' or... Remove this comment to see the full error message
import styles from "./NickEditModal.module.css";
// @ts-expect-error TS(2307): Cannot find module '../../img/close_btn.png' or it... Remove this comment to see the full error message
import closeBtn from "../../img/close_btn.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsCheck2All } from "react-icons/bs";

function EditModal({
  isOpen,
  onClose
}: any) {
  const modalRef = useRef(null);
  const [nick, setNick] = useState("");
  const [isNickValid, setisNickValid] = useState(true);
  const [nickDoubleCheck, setNickDoubleCheck] = useState(false);

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

  function onChangeNick(e: any) {
    const nickRegex = /^[가-힣a-zA-Z]{2,10}$/;
    const nickCurrent = e.target.value;
    setNick(nickCurrent);

    if (!nickRegex.test(nickCurrent)) {
      setisNickValid(false);
    } else {
      setisNickValid(true);
    }
  }

  const handleNickDoubleCheck = async () => {
    if (isNickValid === false) {
      return alert("닉네임 형식이 올바르지 않습니다");
    }

    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/user/auth/nickdupcheck/${nick}`
      );

      if (result.data.success === true) {
        alert(result.data.message);
        setNickDoubleCheck(true);
      } else {
        alert(result.data.message);
        setNickDoubleCheck(false);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      alert(error.response.data.message);
    }
  };

  //  const editData = {
  //  new_content:questionContent,
  //};/

  const PostNickEdit = async () => {
    if (isNickValid === false) {
      return alert("닉네임 형식이 올바르지 않습니다");
    }

    if (nickDoubleCheck === false) {
      return alert("닉네임 중복확인이 필요합니다");
    }

    try {
      const response = await axios.put(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+"/user/mypage/editnick",
        {
          nickname: nick,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        alert(response.data.message);
        onClose(); //모달이 닫히고 내가 마이페이지에서 새로고침해야 변경된거 확인 가능
        window.location.reload(); //새로고침
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 400) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        alert(error.response.data.message);
        window.location.reload();
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  }; //질문 수정하기

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
                <p className={styles.modal_text}>닉네임 변경하기</p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.q_cbox}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className={`${styles.checkInput}`}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input
                      required
                      type="text"
                      placeholder="2-8자 한글이나 영어로 입력"
                      name="nick"
                      value={nick}
                      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                      maxLength="8"
                      onChange={onChangeNick}
                      className={`${styles.nick_input}`}
                    />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <button
                      className={`${styles.dblcheck}`}
                      onClick={handleNickDoubleCheck}
                    >
                      중복확인
                    </button>
                  </div>
                  {/* <div className={styles.q_clastheader}>
                                <span className={styles.textnum}>{countCharacters()}</span>
                              </div> */}
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.div_btns}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={`${styles.c_btn}`} onClick={onClose}>
                    취소
                  </button>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className={styles.submit_btn} onClick={PostNickEdit}>
                    변경하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditModal;
