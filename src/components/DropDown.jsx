import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropDown.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


function DropDown({onSelectedOption, title}) {

  const [wikiData, setWikiData] = useState([]);

  const takeWikiData = async () =>{
      try{
        const res = await axios.get( `http://localhost:8080/wiki/contents/${title}`, {withCredentials: true});
        if(res.status === 200){
          setWikiData(res.data);
          console.log(res.data);
          console.log(wikiData);
        }
        if(res.status === 404){
          console.log(res.data.message)
        }
      }catch (error){
        console.error(error);
      }
    }
  useEffect(() => {
    
    takeWikiData();
    console.log(wikiData);
  }, [title]); //위키 정보 가져오기
 
 useEffect(()=>{
  takeWikiData();
 }, [wikiData]);
 
 if (!wikiData || !wikiData.contents) {
  return null;
}

  const options = wikiData.contents.map((content) => ({
    value: `${content.index} ${content.title}`, 
    label: `${content.index} ${content.title}`,
    className: 'myOptionClassName'
  }));
  
  // [
  //   { value: 'one', label: 'One' },
  //   { value: 'two', label: 'Two', className: 'myOptionClassName' },
  //   {
  //    type: 'group', name: 'group1', items: [
  //      { value: 'three', label: 'Three', className: 'myOptionClassName' },
  //      { value: 'four', label: 'Four' }
  //    ]
  //   },
  //   {
  //    type: 'group', name: 'group2', items: [
  //      { value: 'five', label: 'Five' },
  //      { value: 'six', label: 'Six' }
  //    ]
  //   }
  // ];
  const defaultOption = "목차 선택";

  const onSelect = (selectedOption) => {
    console.log(selectedOption);
    onSelectedOption(selectedOption.value);
    // 처리할 로직을 여기에 추가
  };





  return (
    <div className='dropdown-container'>
      <Dropdown 
        className="dropdown"
        controlClassName="dropdowncontrol"
        menuClassName="dropdownmenu"
        placeholderClassName='dropdownph'

        options={options}
        onChange={onSelect}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
}

export default DropDown;
