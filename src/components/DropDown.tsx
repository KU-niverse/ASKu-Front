import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./DropDown.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// @ts-expect-error TS(6142): Module './SpinnerMypage' was resolved to 'C:/Users... Remove this comment to see the full error message
import SpinnerMypage from "./SpinnerMypage";

function DropDown({
  onSelectedOption,
  title,
  defaultOpt
}: any) {
  const [wikiData, setWikiData] = useState([]);

  useEffect(() => {
    const takeWikiData = async () => {
      try {
        const res = await axios.get(
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          process.env.REACT_APP_HOST + `/wiki/contents/${title}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setWikiData(res.data);
        }
        if (res.status === 404) {
        }
      } catch (error) {
        console.error(error);
      }
    };
    takeWikiData();
  }, [title]); //위키 정보 가져오기

  let options = [];
  // @ts-expect-error TS(2339): Property 'contents' does not exist on type 'never[... Remove this comment to see the full error message
  if (wikiData && wikiData.contents) {
    // @ts-expect-error TS(2339): Property 'contents' does not exist on type 'never[... Remove this comment to see the full error message
    options = wikiData.contents.map((content: any) => ({
      value: `${content.index} ${content.title}`,
      label: `${content.index} ${content.title}`,
      className: "myOptionClassName"
    }));
    // "전체 편집" 옵션 추가
    options.push({
      value: "전체",
      label: "전체",
      className: "myOptionClassName",
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
  if (defaultOpt) {
    defaultOption = defaultOpt;
  } else {
    defaultOption = "전체";
  }

  const onSelect = (selectedOption: any) => {
    onSelectedOption(selectedOption.value);
    // 처리할 로직을 여기에 추가
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="dropdown-container">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Dropdown
        className="dropdown"
        controlClassName="dropdowncontrol"
        menuClassName="dropdownmenu"
        placeholderClassName="dropdownph"
        options={options}
        onChange={onSelect}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
}

export default DropDown;
