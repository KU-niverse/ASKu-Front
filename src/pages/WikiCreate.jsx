import React from 'react'
import { useState } from 'react';
import Editor from '../components/EditorComponent'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const WikiEdit = () => {
    const nav = useNavigate();
    const [desc, setDesc] = useState('');
    const [charbtn, setCharbtn] = useState('list');
    const [title, setTitle] = useState('')

    function onEditorChange(value) {
        setDesc(value);
    }

    function handleCharBtn1() {
        setCharbtn('list');
    }
    function handleCharBtn2() {
        setCharbtn('doc');
    }

    const handleCreateBtn = async() => {

        console.log(desc);


        try {
            const result = await axios.post(`http://118.67.130.57:8080/wiki/contents/new/${title}`, {
                text: desc,
                type: charbtn,
            },{
                withCredentials: true,
            });
            if(result.status === 200){
                alert("수정에 기여해주셔서 감사합니다.");
                nav(`/wikiviewer/${title}`);
            }
        } catch(error){
            console.log(error);
            return alert(error.response.data.message);
        };
        
    };
    
    return (
        <div className={`${styles.container}`}>
            <Header />
            
            <div className={`${styles.edit}`}>
                <form>
                    <div className={`${styles.wikichar}`}>
                        <div className={`${styles.wikichar_title}`}>
                            <h4>문서 제목</h4>
                            <input 
                             required 
                             type='text'  
                             value={title} 
                             onChange={e => setTitle(e.target.value)} 
                             placeholder='제목을 입력하세요' 
                             className={`${styles.title}`} 
                            />
                        </div>
                        <div className={`${styles.wikichar_char}`}>
                            <h4>문서 성격</h4>
                            <input type='button' className={charbtn === 'list'? `${styles.char_one} ${styles.btn_sty_one}`:  `${styles.btn_sty_two} ${styles.char_one}`} value='list' onClick={handleCharBtn1}/>
                            <input type='button' className={charbtn === 'doc' ? `${styles.char_two} ${styles.btn_sty_one}` : `${styles.char_two} ${styles.btn_sty_two}`} value='doc' onClick={handleCharBtn2}/>
                        </div>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div>
                            <Editor value={desc} onChange={onEditorChange} />
                        </div>
                        <br></br>
                    </div>
                    <div className={`${styles.submitbox}`}>
                        <span><input required type='checkbox'/>정책에 맞게 작성하였음을 확인합니다.</span>
                        <button className={`${styles.submitWiki}`} onClick={handleCreateBtn}>생성하기</button>
                    </div>
                </form>
            </div>
           
            
            
        </div>
        
    )

}

export default WikiEdit;

