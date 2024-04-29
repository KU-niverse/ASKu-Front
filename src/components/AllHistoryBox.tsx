import React from "react";
import styles from "./HistoryBox.module.css";
import dots from "../img/dots.png";
import rollback from "../img/return.png";
import watch from "../img/watch.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import verComp from "../img/verComp.png";
import ThreedotsReport from "./ThreedotsReport";

const HistoryBox = (props: any) => {
  const nav = useNavigate();

  const title = props.title;
  const version = props.version;
  const summary = props.summary;
  const user = props.user;
  const timestamp = props.timestamp;
  const doctitle = props.doctitle;
  const target = props.target;
  const type = props.type;

  const handleView = () => {
    const encodedTitle = encodeURIComponent(title);
    nav(`/wiki/preview/${encodedTitle}/${version}`);
  };

  const handleRollback = async (e: any) => {
    try {
      const result = await axios.post(
                process.env.REACT_APP_HOST + `/wiki/historys/${title}/version/${version}`,
        {},
        {
          withCredentials: true,
        }
      ); //전체 텍스트를 가져옴.
      if (result.status === 200) {
        alert(result.data.message);
        const encodedTitle = encodeURIComponent(title);
        nav(`/wiki/${encodedTitle}`);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error(error);
            if (error.response.status === 401) {
        alert("로그인이 필요합니다");
        nav("/signin");
            } else if (error.response.status === 432) {
                alert(error.response.data.message);
      }
    }
  };

  const handleCompare = () => {
    if (type === "create") {
      return alert("새로 생성된 문서 히스토리는 지원하지 않는 기능입니다");
    }
    if (version === 1) {
      return alert("첫번째 히스토리는 지원하지 않는 기능입니다");
    }
    const encodedTitle = encodeURIComponent(title);
    nav(`/history/${encodedTitle}/diff/${version}`);
  };

  return (
        <div className={styles.historyBox}>
            <div className={styles.contents}>
                <div className={styles.contentsOne}>
                    <span className={styles.version}>V{version}</span>
                    <span className={styles.summary}>수정요약: {summary}</span>
        </div>
                <div className={styles.contentsTwo}>
                    <span className={styles.user}>{user}</span>
                    <span className={styles.timestamp}>{timestamp}</span>
                    <span className={styles.threedot}>
                        <ThreedotsReport type={1} target={target} />
          </span>
        </div>
      </div>
            <div className={styles.allversionText}>
                <div className={styles.allversionBtns}>
                    <div className={styles.docTitle}>
                        <span
              className={styles.docTitle}
              onClick={() => {
                const encodedTitle = encodeURIComponent(title);
                nav(`/wiki/${encodedTitle}`)
              }}
            >
              {title}
            </span>
          </div>
                    <div className={styles.allVerBtn}>
                        <span onClick={handleView} className={`${styles.versionbtn}`}>
                            <img src={watch} />
              RAW버전 미리보기
            </span>
                        <span onClick={handleCompare} className={`${styles.versionbtn}`}>
                            <img src={verComp} />전 버전이랑 비교하기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBox;
