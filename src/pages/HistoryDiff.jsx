import React, { PureComponent } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import his2 from '../img/his2.png';
import styles from './HistoryDiff.module.css';
import Header from '../components/Header';
import { useState} from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios';
 
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
  const {title, ver} = useParams();
  const [newText, setNewText] = useState('');
  const [oldText, setOldText] = useState('');

  
  const mediaQuery = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setIsSplit(!mediaQuery);
  }, [mediaQuery]);


  const compareHistory = async () => {
    try{
        const result = await axios.get(`http://localhost:8080/wiki/comparison/${title}/rev/${ver}/oldrev/${Number(ver) - 1}`, {
            withCredentials: true
        });
        if(result.status === 200){
            setOldText(result.data.jsonData.oldrev_text);
            setNewText(result.data.jsonData.rev_text);
        }
        
    } catch (error) {
        console.error(error);
        return alert(error.response.data.message);
    }
};

useEffect(() => {

    compareHistory();

},  [title, ver]);

  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.header}>
            <span><img src={his2}/>히스토리</span>
        </div >
        <div className={styles.historyCompare}>
          <div className={styles.historyTitle}><p className={styles.listTitle}>입실렌티</p><p className={styles.listTitle2}>문서의 변경 내용</p></div>
          <div className={styles.historyDiff}>
            <div className={styles.verCompare}>v3&nbsp;&nbsp;&nbsp;<span>&nbsp;vs&nbsp;</span>&nbsp;&nbsp;&nbsp;v2</div>
            <div >
              <ReactDiffViewer oldValue={oldText} newValue={newText} splitView={isSplit} className={styles.diffBox} showDiffOnly={true}/>
            </div>
          </div>
          
        </div>
        
      </div>
  );
};

export default HistoryDiff;