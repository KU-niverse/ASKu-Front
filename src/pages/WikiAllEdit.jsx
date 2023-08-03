import React from 'react'
import { useState, useEffect } from 'react';
import Editor from '../components/EditorComponent'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const WikiEdit = () => {
    const {title, section} = useParams();
    const nav = useNavigate();
    const [desc, setDesc] = useState('');
    const [wiki, setWiki] = useState('');
    const [summary, setSummary] = useState('');
    const [version, setVersion] = useState('');
    const [copy, setCopy] = useState(false);

    function onEditorChange(value) {
        setDesc(value)
    }


    useEffect(() => {

        const getWiki = async () => {
            try{

                const result = await axios.get(`http://118.67.130.57:8080/wiki/contents/${title}`,{
                    withCredentials: true,
                }); //전체 텍스트를 가져옴.
                if (result.status === 200){
                    setDesc(result.data.text);
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
    
    const addWikiEdit = async () => {
        try {
            const result = await axios.post(`http://118.67.130.57:8080/wiki/contents/${title}`, {
                version: version,
                newContent: desc,
                summary: summary,
                is_q_based: 0,
                qid: 0,
            },{
                withCredentials: true,
            });
            if (result.status === 200){
                alert(result.data.message);
            } else if(result.status === 210){
                alert("수정에 기여해주셔서 감사합니다.");
                nav('/wiki');
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
                        <textarea required className={`${styles.summary}`} value={summary} onChange={e => setSummary(e.target.value)} maxLength='60' placeholder='60자 이내로 작성해주세요'></textarea>
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

