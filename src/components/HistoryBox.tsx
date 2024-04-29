import React from "react";
// @ts-expect-error TS(2307): Cannot find module './HistoryBox.module.css' or it... Remove this comment to see the full error message
import styles from "./HistoryBox.module.css";
// @ts-expect-error TS(2307): Cannot find module '../img/dots.png' or its corres... Remove this comment to see the full error message
import dots from "../img/dots.png";
// @ts-expect-error TS(2307): Cannot find module '../img/return.png' or its corr... Remove this comment to see the full error message
import rollback from "../img/return.png";
// @ts-expect-error TS(2307): Cannot find module '../img/watch.png' or its corre... Remove this comment to see the full error message
import watch from "../img/watch.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module '../img/verComp.png' or its cor... Remove this comment to see the full error message
import verComp from "../img/verComp.png";
// @ts-expect-error TS(6142): Module './ThreedotsReport' was resolved to 'C:/Use... Remove this comment to see the full error message
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

    let returnValue = window.confirm('정말 롤백하시겠습니까?\n(한번 롤백한 문서는 다시 되돌릴 수 없습니다.)');

    if (returnValue === false) {
      return;
    } else {

      try {
        const result = await axios.post(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response.status === 401) {
          alert("로그인이 필요합니다");
          nav("/signin");
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        } else if (error.response.status === 432) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          alert(error.response.data.message);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        } else if (error.response.status === 403) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          alert(error.response.data.message);
        }
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.historyBox}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.contents}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.contentsOne}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.version}>V{version}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.summary}>수정요약: {summary}</span>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.contentsTwo}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.user}>{user}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.timestamp}>{timestamp}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className={styles.threedot}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThreedotsReport type={1} target={target} />
          </span>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.versionText}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div></div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.versionBtns}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span onClick={handleView} className={`${styles.versionbtn}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={watch} />
            RAW버전 미리보기
          </span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span onClick={handleRollback} className={`${styles.versionbtn}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={rollback} />이 버전으로 되돌리기
          </span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span onClick={handleCompare} className={`${styles.versionbtn}`}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={verComp} />전 버전이랑 비교하기
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryBox;
