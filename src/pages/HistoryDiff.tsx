import React, { PureComponent } from "react";
import ReactDiffViewer from "react-diff-viewer";
// @ts-expect-error TS(2307): Cannot find module '../img/his2.png' or its corres... Remove this comment to see the full error message
import his2 from "../img/his2.png";
// @ts-expect-error TS(2307): Cannot find module './HistoryDiff.module.css' or i... Remove this comment to see the full error message
import styles from "./HistoryDiff.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import axios from "axios";

// const oldText = `
// == 잉 ==
// 잉잉잉잉잉잉
// == 개요 ==
// '[[정품]]'과 '~돌이'를 합친 인터넷 ==신조어이자 '[[복돌이]]'의 [[반대말]]로, 정상적인 프로그램 이용자를 일컫는 말. 이 문서에서는 정돌이의 행위를 다루어 설명한다.
// == damm ==
// 여기 수정됐지롱 ㅋㅋ 이름이라니 너무 웃기자나
// == 복돌이의 인식 ==
// 몇몇 무개념 [[복돌이]]들은 정돌이를 [[호갱]]이나 [[흑우]]로 보지만 정당한 소비를 하는 사람을 어떻게든 모욕할 이유가 없다. 복돌이들은 마치 도둑질해서 무료로 얻었는데 왜 정직하게 사냐는 망언을 하는 거랑 똑같다. 이는 물건을 제 값어치에 사는데 그걸 문제로 삼는 게 심각한 것이다.
// `;
// const newText = `
// == 잉 ==
// 엥엥엥엥엥엥
// == 개요 ==
// '[[정품]]'과 '~돌이'를 합친 인터넷 ==신조어이자 '[[복돌이]]'의 [[반대말]]로, 정상적인 프로그램 이용자를 일컫는 말이다.. 이 문서에서는 정돌이의 행위를 다루어 설명한다.
// == damm ==
// 이런이런 잘 되나
// == 복돌이의 인식 ==
// 몇몇 무개념 [[복돌이]]들은 정돌이를 [[호갱]]이나 [[흑우]]로 보지만 정당한 소비를 하는 사람을 어떻게든 모욕할 이유가 없다. 복돌이들은 마치 도둑질해서 무료로 얻었는데 왜 정직하게 사냐는 망언을 하는 거랑 똑같다. 이는 물건을 제 값어치에 사는데 그걸 문제로 삼는 게 심각한 것이다.

// `;

const HistoryDiff = () => {
  const [isSplit, setIsSplit] = useState(true);
  const { title, ver } = useParams();
  const [newText, setNewText] = useState("");
  const [oldText, setOldText] = useState("");

  const mediaQuery = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setIsSplit(!mediaQuery);
  }, [mediaQuery]);

  const compareHistory = async () => {
    try {
      const result = await axios.get(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/wiki/comparison/${title}/rev/${ver}/oldrev/${
          Number(ver) - 1
        }`,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setOldText(result.data.jsonData.oldrev_text);
        setNewText(result.data.jsonData.rev_text);
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return alert(error.response.data.message);
    }
  };

  useEffect(() => {
    compareHistory();
  }, [title, ver]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.header}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={his2} />
          히스토리
        </span>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.historyCompare}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.historyTitle}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.listTitle}>{title}</p>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <p className={styles.listTitle2}>문서의 변경 내용</p>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={styles.historyDiff}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.verCompare}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.verCompareNum}>VERSION&nbsp;{ver - 1}&nbsp;&nbsp;&nbsp;</span><span className={styles.verCompareVs}>&nbsp;vs&nbsp;</span>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span className={styles.verCompareNum}>&nbsp;&nbsp;&nbsp;VERSION&nbsp;{ver}</span>
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={styles.diffBox}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ReactDiffViewer
              oldValue={oldText}
              newValue={newText}
              splitView={isSplit}
              // @ts-expect-error TS(2322): Type '{ oldValue: string; newValue: string; splitV... Remove this comment to see the full error message
              className={styles.diffBox}
              showDiffOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDiff;
