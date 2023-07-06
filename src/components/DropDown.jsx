import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropDown.css'


function DropDown() {
  const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two', className: 'myOptionClassName' },
    {
     type: 'group', name: 'group1', items: [
       { value: 'three', label: 'Three', className: 'myOptionClassName' },
       { value: 'four', label: 'Four' }
     ]
    },
    {
     type: 'group', name: 'group2', items: [
       { value: 'five', label: 'Five' },
       { value: 'six', label: 'Six' }
     ]
    }
  ];
  const defaultOption = "목차 선택";

  const onSelect = (selectedOption) => {
    console.log(selectedOption);
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
