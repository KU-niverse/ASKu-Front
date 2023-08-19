import React from 'react'
import { useState, useEffect } from 'react';
import Editor from '../components/Quill2.js'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import QuestionFor from '../components/QuestionFor';
import { useParams, useLocation } from 'react-router-dom';
import WikiDropDown from "../components/WikiDropDown.jsx";
import axios from 'axios';


const WikiEdit = () => {
    const {main} = useParams();
    const location = useLocation();
    const stateData = location.state;
    const [desc, setDesc] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); //드롭다운 옵션
    const [isOptDisabled, setIsOptDisabled] = useState(false); //같은 목차 없을 시 true
    const qid = stateData.qid;


    function onEditorChange(value) {
        setDesc(value)
    }
    //qid로 같은 목차 존재하는지 확인하는 함수(있으면 그대로, 없으면 전체편집
    const checkSameIndex = async() => {

        console.log(selectedOption);
        console.log(qid);


        try {
            const result = await axios.get(`https://localhost:8080/wiki/contents/question/${qid}`, {
                withCredentials: true,
            });
            if(result.status === 200){
                if(result.data.based_on_section === true) {
                    setSelectedOption(`${result.data.contents.index} ${result.data.contents.title}`)
                    console.log(selectedOption);
                } else{
                    setSelectedOption('all');
                    setIsOptDisabled(false);
                    console.log(selectedOption);
                    
                }
                
            }
        } catch(error){
            console.log(error);
            return alert(error.response.data.message);
        };
        
    };

    useEffect(() => {
        checkSameIndex();
      }, [qid]);


     //dropdown에서 선택한 index 반영
    const handleSelectedOption = (optionValue) => {
      setSelectedOption(optionValue);
    };
    return (
        <div className={`${styles.container}`}>
            <Header />
            <div className={`${styles.edit}`}>
                <div>
                    <QuestionFor 
                    nick={stateData.nick} 
                    content={stateData.content} 
                    like_count={stateData.like_count} 
                    created_at={stateData.created_at}
                    />
                </div>
                <form>
                    <div className={`${styles.wikiQues_header}`}>
                        <div className={`${styles.wikichar_title}`}>
                            <h4>문서 제목</h4>
                            <input type='text' required disabled='true' value={main} className={`${styles.title}`}/>
                        </div>
                        <div className={`${styles.wikiQues_lists}`}>
                            <h4>목차</h4>
                            <div className={styles.q_dropdown}>
                              <WikiDropDown 
                              onSelectedOption={handleSelectedOption}
                              title={main}
                              isOptionDisabled={isOptDisabled}
                              />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div className={`${styles.editorbox}`}>
                        <Editor value={desc} onChange={onEditorChange} />
                        </div>
                        <h4>히스토리 요약</h4>
                        <textarea required className={`${styles.summary}`} maxLength='60' placeholder='60자 이내로 작성해주세요'></textarea>
                    </div>
                    <div className={`${styles.submitbox}`}>
                        <span><input required type='checkbox'/>정책에 맞게 작성하였음을 확인합니다.</span>
                        <button className={`${styles.submitWiki}`}>생성하기</button>
                    </div>
                </form>
            </div>
        </div>
        
    )

}

export default WikiEdit;

