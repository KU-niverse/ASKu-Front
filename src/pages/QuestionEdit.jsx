import React from 'react'
import { useState } from 'react';
import Editor from '../components/Quill2.js'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import QuestionFor from '../components/QuestionFor';
import { useParams, useLocation } from 'react-router-dom';


const WikiEdit = () => {
    const {main} = useParams();
    const location = useLocation();
    const stateData = location.state;
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }
    //qid로 같은 목차 존재하는지 확인하는 함수(있으면 그대로, 없으면 전체편집)
    function handleWikiSubmit () {
        
    }
    
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
                            <input type='text' required disabled='true' value='4.3 응원단' className={`${styles.queslist}`}/>
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

