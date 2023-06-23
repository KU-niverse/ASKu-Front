import React from 'react'
import { useState } from 'react';
import Editor from '../components/EditorComponent'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';


const WikiEdit = () => {
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }
    
    return (
        <div>
            <Header />
            <form>
                <div className={`${styles.edit}`}>
                    <div>
                        <h4>문서 제목</h4>
                        <input required type='text'  placeholder='제목을 입력하세요' className={`${styles.title}`}/>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div>
                        <Editor value={desc} onChange={onEditorChange} />
                        </div>
                        <h4>히스토리 요약</h4>
                        <textarea required className={`${styles.summary}`} maxLength='100'></textarea>
                    </div>
                    <div className={`${styles.submitbox}`}>
                        <span><input required type='checkbox'/>정책에 맞게 작성하였음을 확인합니다.</span>
                        <button className={`${styles.submitWiki}`}>생성하기</button>
                    </div>
                </div>
            </form>
            
            
            
        </div>
        
    )

}

export default WikiEdit;

