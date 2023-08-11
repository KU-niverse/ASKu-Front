import React from 'react'
import { useState } from 'react';
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HtmlToWiki from '../components/Wiki/HtmlToWiki';


const WikiEdit = () => {
    const nav = useNavigate();
    const [desc, setDesc] = useState('');
    const [charbtn, setCharbtn] = useState('list');
    const [title, setTitle] = useState('')

    function onEditorChange(value) {
        setDesc(value);
        console.log(value);
    }

    function handleCharBtn1() {
        setCharbtn('list');
    }
    function handleCharBtn2() {
        setCharbtn('doc');
    }

   

    const handleCreateBtn = async(e) => {

        e.preventDefault();

        const wikiMarkup = HtmlToWiki(desc);
        console.log(wikiMarkup);
        console.log(desc);


        try {
            const result = await axios.post(`http://localhost:8080/wiki/contents/new/${title}`, {
                text: wikiMarkup,
                type: charbtn,
            },{
                withCredentials: true,
            });
            if(result.status === 200){
                alert("수정에 기여해주셔서 감사합니다.");
                nav(`/wiki/${title}`);
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
                <form onSubmit={handleCreateBtn}>
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
                            <input type='button' className={charbtn === 'list'? `${styles.char_one} ${styles.btn_sty_one}`:  `${styles.btn_sty_two} ${styles.char_one}`} value='목차형' onClick={handleCharBtn1}/>
                            <input type='button' className={charbtn === 'doc' ? `${styles.char_two} ${styles.btn_sty_one}` : `${styles.char_two} ${styles.btn_sty_two}`} value='문서형' onClick={handleCharBtn2}/>
                        </div>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div className={`${styles.editorbox}`}>
                            <Editor value={desc} onChange={onEditorChange} />
                        </div>
                        <br></br>
                    </div>
                    <div className={`${styles.submitbox}`}>
                        <span><input required type='checkbox'/>정책에 맞게 작성하였음을 확인합니다.</span>
                        <input type='submit' value="생성하기" className={`${styles.submitWiki}`} />
                    </div>
                </form>
            </div>
           
            
            
        </div>
        
    )

}

export default WikiEdit;

