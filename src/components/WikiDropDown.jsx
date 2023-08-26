import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './WikiDropDown.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import SpinnerMypage from './SpinnerMypage';


function DropDown({ defaultOpt, onSelectedOption, title, isOptionDisabled }) {
  const [wikiData, setWikiData] = useState([]);

  useEffect(() => {
    if (!isOptionDisabled) {
      const takeWikiData = async () => {
        try {
          const res = await axios.get(`https://asku.wiki/wiki/contents/${title}`, { withCredentials: true });
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
    }
  }, [title, isOptionDisabled]);
  //위키 정보 가져오기



 
 console.log(wikiData);



 let options=[]
 if (!isOptionDisabled && wikiData.contents && wikiData.contents[0]){
    options = wikiData.contents.map((content) => ({
    value: `${content.section}`, 
    label: `${content.index} ${content.title}`,
    className: 'myOptionClassName'
  }))} else if(isOptionDisabled === true){
    options=[{
      value: 'all', 
      label: '전체 편집',
      className: 'myOptionClassName'
     },]
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


  const defaultOption = defaultOpt;

  const onSelect = (selectedOption) => {
    console.log(selectedOption);
    onSelectedOption(selectedOption.value);
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
