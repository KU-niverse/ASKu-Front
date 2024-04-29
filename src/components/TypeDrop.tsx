import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// @ts-expect-error TS(2307): Cannot find module './TypeDrop.module.css' or its ... Remove this comment to see the full error message
import styles from './TypeDrop.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
// @ts-expect-error TS(6142): Module './SpinnerMypage' was resolved to 'C:/Users... Remove this comment to see the full error message
import SpinnerMypage from './SpinnerMypage';


function DropDown({
  onSelectedOption
}: any) {
 




 let options=[{
  value: 'list', 
  label: '목차형',
  className: 'myOptionClassName'
 },{
  value: 'doc', 
  label: '문서형',
  className: 'myOptionClassName'
 }];
//  if (wikiData.contents && wikiData.contents[0]){
//     options = wikiData.contents[0].map((content) => ({
//     value: `${content.index} ${content.title}`, 
//     label: `${content.index} ${content.title}`,
//     className: 'myOptionClassName'
//   }))};

  

  

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


  const defaultOption = "문서 성격";

  const onSelect = (selectedOption: any) => {
    onSelectedOption(selectedOption.value);
    // 처리할 로직을 여기에 추가
  };





  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={styles.dropdown_container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
