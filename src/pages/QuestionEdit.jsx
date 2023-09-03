import React from 'react'
import { useState, useEffect } from 'react';
import Editor from '../components/Quill2.js'
import styles from './WikiEdit.module.css';
import Header from '../components/Header';
import QuestionFor from '../components/QuestionFor';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import WikiDropDown from "../components/WikiDropDown.jsx";
import axios from 'axios';
import WikiToHtml from '../components/Wiki/WikiToHtml';
import HtmlToWiki from '../components/Wiki/HtmlToWiki';


const QuestionEdit = () => {
    const nav = useNavigate();
    const [summary, setSummary] = useState('');
    const [version, setVersion] = useState('');
    const [copy, setCopy] = useState(false);
    const {main} = useParams();
    const location = useLocation();
    const stateData = location.state;
    const [desc, setDesc] = useState('');
    const [selectedOption, setSelectedOption] = useState(''); //드롭다운 옵션
    const [isOptDisabled, setIsOptDisabled] = useState(false); //같은 목차 없을 시 true
    const qid = stateData.qid;
    const [defaultOpt, setDefaultOpt] = useState(stateData.index_title);
    console.log(defaultOpt);
    const [section, setSection] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(prevIsChecked => !prevIsChecked);
    }

    function onEditorChange(value) {
        setDesc(value)
    }
    //일치하는 목차가 없을 경우 전체 문서를 불러옴
    const getAllWiki = async () => {
        try{

            const result = await axios.get(`https://asku.wiki/api/wiki/contents/${main}`,{
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

    //해당 섹션의 문서를 가지고 옴
    const getWiki = async () => {
        try{

            const result = await axios.get(`https://asku.wiki/api/wiki/contents/${main}/section/${selectedOption}`,{
                withCredentials: true,
            }); //전체 텍스트를 가져옴.
            if (result.status === 200){
                setDesc(WikiToHtml(result.data.title + "\n" + result.data.content));
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
    //qid로 같은 목차 존재하는지 확인하는 함수(있으면 그대로, 없으면 전체편집
    const checkSameIndex = async() => {

        console.log(selectedOption);
        console.log(qid);


        try {
            const result = await axios.get(`https://asku.wiki/api/wiki/contents/question/${qid}`, {
                withCredentials: true,
            });
            if(result.status === 200){
                if(result.data.based_on_section === true) {
                    setSelectedOption(result.data.section);
                    console.log(result.data.section);
                    console.log(selectedOption);
                   
                } else{
                    setSelectedOption('all');
                    setIsOptDisabled(false);

                   
                    
                }
                
            }
        } catch(error){
            console.log(error);
            return alert(error.response.data.message);
        };
        
    };
    

    // useEffect(() => {
    //     checkSameIndex();
    //   }, [qid]);
    
      useEffect(() => {


        checkSameIndex();
        console.log(selectedOption);
        
        setCopy(false);
        
    }, []);
    
    //첫 설정이 문제..
    
    useEffect(() => {
        console.log(selectedOption);

        if(selectedOption) {
            
            if(selectedOption === 'all'){
                getAllWiki();
            } else{
                getWiki();
            }
        } else{
            console.log('section 없음')
        }


        setCopy(false);
        
    }, [selectedOption]);
    
      const addWikiEdit = async (e) => {

        e.preventDefault();

        const wikiMarkup = HtmlToWiki(desc);

        if(isChecked === false){
            return alert('정책에 맞게 작성하였음을 확인해주세요');
        }
        if(summary === ''){
            return alert('수정요약을 작성해주세요');
        }

        try {
            const result = await axios.post(`https://asku.wiki/api/wiki/contents/${main}/section/${selectedOption}`, {
                version: version,
                new_content: wikiMarkup,
                summary: summary,
                is_q_based: 1,
                qid: qid,
            },{
                withCredentials: true,
            });
            if (result.status === 200){
                alert("수정이 완료되었습니다.");
                nav(`/wiki/${main}`);
            }
        } catch(error){
            if(error.response.status === 401){
                alert("login이 필요합니다.");
                nav('/signin');
            } else if(error.response.status === 500){
                alert("제출에 실패했습니다. 다시 시도해주세요.");
                // setWiki(error.response.data.newContent);
            }else if(error.response.status === 426){
                alert("기존 글이 수정되었습니다. 새로고침 후 다시 제출해주세요.");
                setCopy(true);
            }
        };
        
    };
     //dropdown에서 선택한 index 반영
    const handleSelectedOption = (optionValue) => {
      setSelectedOption(optionValue);
      console.log(selectedOption);
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
                <form onSubmit={addWikiEdit}>
                    <div className={`${styles.wikiQues_header}`}>
                        <div className={`${styles.wikichar_title}`}>
                            <h4>문서 제목</h4>
                            <input type='text' required disabled='true' value={main} className={`${styles.title}`}/>
                        </div>
                        <div className={`${styles.wikiQues_lists}`}>
                            <h4>목차</h4>
                            <div className={styles.q_dropdown}>
                              <WikiDropDown 
                              defaultOpt={defaultOpt}
                              onSelectedOption={handleSelectedOption}
                              title={main}
                              isOptionDisabled={isOptDisabled}
                              />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>문서 내용</h4>
                        <div className={`${styles.editorbox2}`}>
                        <Editor value={desc} onChange={onEditorChange} />
                        </div>
                        <h4>히스토리 요약</h4>
                        <textarea value={summary} onChange={e => setSummary(e.target.value)} className={`${styles.summary}`} maxLength='60' placeholder='60자 이내로 작성해주세요'></textarea>
                    </div>
                    <div className={`${styles.submitbox}`}>
                    <span className={`${styles.chkdiv}`}><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={`${styles.chkbox}`}/><span>정책에 맞게 작성하였음을 확인합니다.</span></span>
                        <button className={`${styles.submitWiki}`}>생성하기</button>
                    </div>
                </form>
            </div>
        </div>
        
    )

}

export default QuestionEdit;

