import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './WikiDropDown.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import SpinnerMypage from './SpinnerMypage';


function DropDown({ defaultOpt, onSelectedOption, onSelectedTitle, title, isOptionDisabled }) {
  const [wikiData, setWikiData] = useState([]);

  useEffect(() => {
      const takeWikiData = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/wiki/contents/${title}`, { withCredentials: true });
          if (res.status === 200) {
            setWikiData(res.data);
          }
          if (res.status === 404) {
            console.log(res.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };
      takeWikiData();
  }, []);
  //위키 정보 가져오기







 let options=[]
 if ( wikiData.contents){
    options = wikiData.contents.map((content) => ({
    value: `${content.section}`, 
    label: `${content.index} ${content.title}`,
    className: 'myOptionClassName'
  }))

    // "전체 편집" 옵션 추가
  options.push({
    value: 'all', 
    label: '전체 편집',
    className: 'myOptionClassName'
  });



} 

  

  

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


  let defaultOption;
  if(isOptionDisabled===true){
    defaultOption = {
      value: 'all', 
      label: '전체 편집',
      className: 'myOptionClassName'
     }
  }else{
    defaultOption = defaultOpt;
  }

  const onSelect = (selectedOption) => {
    //console.log(selectedOption);
    onSelectedOption(selectedOption.value);
    onSelectedTitle(selectedOption.label);
    // 처리할 로직을 여기에 추가
  };





  return (
    <div className={styles.dropdown_container}>
      <Dropdown 
        className={styles.dropdown}
        controlClassName={styles.dropdowncontrol}
        menuClassName={styles.dropdownmenu}
        placeholderClassName={styles.dropdownph}

        options={options}
        onChange={onSelect}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
}

export default DropDown;
