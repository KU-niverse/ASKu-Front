import React from 'react'
import { useState, useEffect } from 'react';
import Editor from '../components/Quill'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HtmlToWiki from '../components/Wiki/HtmlToWiki';
import WikiToHtml from '../components/Wiki/WikiToHtml';


const WikiEdit = () => {
    const {title, section} = useParams();
    const nav = useNavigate();
    const [desc, setDesc] = useState('');
    const [wiki, setWiki] = useState('');
    const [summary, setSummary] = useState('');
    const [version, setVersion] = useState('');
    const [copy, setCopy] = useState(false);

    function onEditorChange(value) {
        setDesc(value);
        console.log(desc);
    }


    useEffect(() => {

        const getWiki = async () => {
            try{

                const result = await axios.get(`http://localhost:8080/wiki/contents/${title}`,{
                    withCredentials: true,
                }); //전체 텍스트를 가져옴.
                if (result.status === 200){
                    setDesc(WikiToHtml(result.data.text));
                    setVersion(result.data.version);
                }
    
            } catch (error) {
                console.error(error);
                if(error.response.status === 401){
                    alert(error.response.data.message);
                    nav('/signin');
                    
                }else{
                    alert('잘못된 접근입니다.');
                }
            }
        };

        getWiki();
        
        
    }, []);

    const addWikiEdit = async (e) => {

        e.preventDefault();

        const wikiMarkup = HtmlToWiki(desc);
        try {
            const result = await axios.post(`http://localhost:8080/wiki/contents/${title}`, {
                version: version,
                new_content: wikiMarkup,
                summary: summary,
                is_q_based: 0,
                qid: 0,
            },{
                withCredentials: true,
            });
            if (result.status === 200){
                alert('수정이 완료되었습니다.');
                nav(`/wiki/${title}`);
            }
        } catch(error){
            if(error.response.status === 401){
                alert("login이 필요합니다.");
                nav('/signin');
            } else if(error.response.status === 500){
                alert("제출해 실패했습니다. 다시 시도해주세요.");
                // setWiki(error.response.data.newContent);
            }else if(error.response.status === 426){
                alert("기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.");
                setCopy(true);
            }
        };
        
    };
    
    return (
        <div className={`${styles.container}`}>
            <Header />
            <div className={`${styles.edit}`}>
                <form onSubmit={addWikiEdit}>
                    <div>
                        <div className={`${styles.wikichar_title}`}>
                            <h4>문서 제목</h4>
                            <input type='text' disabled='true' value={title} className={`${styles.title}`}/>
                        </div>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div>
                        <Editor value={desc} onChange={onEditorChange} />
                        </div>
                        <h4>히스토리 요약</h4>
                        <textarea className={`${styles.summary}`} value={summary} onChange={e => setSummary(e.target.value)} maxLength='60' placeholder='60자 이내로 작성해주세요'></textarea>
                    </div>
                    <div className={`${styles.submitbox}`}>
                        <span><input required type='checkbox' className={styles.chkbox}/>정책에 맞게 작성하였음을 확인합니다.</span>
                        <input type='submit' value="생성하기" className={`${styles.submitWiki}`} />
                    </div>
                </form>
            </div>
        </div>
        
    )

}

export default WikiEdit;
