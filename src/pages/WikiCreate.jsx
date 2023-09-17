import React from 'react'
import { useState } from 'react';
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HtmlToWiki from '../components/Wiki/HtmlToWiki';
import TypeDrop from '../components/TypeDrop';


const WikiCreate = () => {
    const nav = useNavigate();
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); //드롭다운 옵션
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(prevIsChecked => !prevIsChecked);
    }

    function onEditorChange(value) {
        setDesc(value);
        //console.log(value);
    }

   

    const handleCreateBtn = async(e) => {

        e.preventDefault();
        if(desc.trim() === ''){
            return alert('내용을 작성해주세요')
        }

        const wikiMarkup = HtmlToWiki(desc);
        //console.log(selectedOption);
        
        if(isChecked === false){
            return alert('정책에 맞게 작성하였음을 확인해주세요')
        }

        try {
            const result = await axios.post(`http://localhost:8080/wiki/contents/new/${title}`, {
                text: wikiMarkup,
                type: selectedOption,
            },{
                withCredentials: true,
            });
            if(result.data.success === true){
                alert("문서를 생성해주셔서 감사합니다.");
                nav(`/wiki/${title}`);
            }
        } catch(error){
            console.error(error);
            if(error.response.status === 401){
                alert("로그인이 필요합니다.");
                nav('/signin');
            } else if(error.response.status === 500){
                alert("제출해 실패했습니다. 다시 시도해주세요.");
                // setWiki(error.response.data.newContent);
            } else {
                alert(error.response.data.message);
            }
        };
        
    };

    const handleSelectedOption = (optionValue) => {
        setSelectedOption(optionValue);
        //console.log(selectedOption);
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
                            <TypeDrop onSelectedOption={handleSelectedOption}/>
                        </div>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div className={`${styles.editorbox}`}>
                            <Editor value={desc} onChange={onEditorChange} />
                        </div>
                    </div>
                    <div className={`${styles.submitbox}`}>
                    <span className={`${styles.chkdiv}`}><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={`${styles.chkbox}`}/><span>정책에 맞게 작성하였음을 확인합니다.</span></span>
                        <input type='submit' value="생성하기" className={`${styles.submitWiki}`} />
                    </div>
                </form>
            </div>
           
            
            
        </div>
        
    )

}

export default WikiCreate;

