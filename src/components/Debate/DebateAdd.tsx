import React, { useState, useEffect } from "react";
// @ts-expect-error TS(2307): Cannot find module '../../img/Vector.png' or its c... Remove this comment to see the full error message
import plus from "../../img/Vector.png";
// @ts-expect-error TS(2307): Cannot find module './DebateAdd.module.css' or its... Remove this comment to see the full error message
import styles from "./DebateAdd.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const DebateAdd = ({
  title
}: any) => {
  const [debateListData, setDebateListData] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [word, setWord] = useState("");
  const [numb, setNumb] = useState(0);

  useEffect(() => {
    const takeDebateList = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/debate/list/${encodeURIComponent(title)}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setDebateListData(res.data);
          setNumb(res.data.data.length);
        }
      } catch (error) {
        console.error(error);
      }
    };

    takeDebateList();
  }, [title]); // Fetch debate list data when the title changes

  const handleAddBtn = () => {
    setIsAdd(true);
  };

  const debateAdd = async () => {
    try {
      const response = await axios.post(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST + `/debate/new/${encodeURIComponent(title)}`,
        {
          subject: word,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        window.location.reload(); // Refresh the page after successful creation
      } else {
        return alert("Failed to add debate.");
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response.status === 401) {
        return alert("로그인이 필요한 서비스 입니다.");

      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      } else if (error.response.status === 400) {
        return alert("잘못된 입력입니다. ");
      } else {
        return alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요");
      }
    }
  };

  const handleNewDebate = () => {
    debateAdd();
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.addTitle}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className={styles.addTitleMain}>{title}</p>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p>문서의 다른 토론 ({numb})</p>
      </div>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={isAdd ? styles.hidden : styles.inputContainer}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button
            className={isAdd ? styles.hidden : styles.addBtn}
            onClick={handleAddBtn}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={plus} />
          </button>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={isAdd ? styles.inputContainer : styles.hidden}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input
            className={styles.headerInput}
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="생성할 토론방을 입력하세요."
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button className={styles.createBtn} onClick={handleNewDebate}>
            생성
          </button>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.addLists}>
        {debateListData === null ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.none}>데이터를 불러오는 중입니다.</p>
        // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never'.
        ) : debateListData.data.length === 0 ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p>"최근 변경된 토론이 없습니다."</p>
        ) : (
          // @ts-expect-error TS(2339): Property 'data' does not exist on type 'never'.
          debateListData.data.map((item: any) => <Link
            to={`/debate/${encodeURIComponent(item.title)}/${item.subject}`}
            state={{ title: item.title, subject: item.subject, id: item.id }}
            className={styles.linkTo}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ul key={item.id}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <span className={styles.listTitle}>{item.subject}</span>
            </ul>
          </Link>)
        )}
      </div>
    </div>
  );
};

export default DebateAdd;
