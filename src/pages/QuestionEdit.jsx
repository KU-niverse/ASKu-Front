import React from 'react'
import { useState } from 'react';
import Editor from '../components/Quill2.js'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import QuestionFor from '../components/QuestionFor';
import { useParams } from 'react-router-dom';


const WikiEdit = () => {
    const {main} = useParams();
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }

    function handleWikiSubmit () {
        
    }
    
    return (
        <div className={`${styles.container}`}>
            <Header />
            <div className={`${styles.edit}`}>
                <div>
                    <QuestionFor/>
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

