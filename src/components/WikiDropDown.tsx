import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import axios from 'axios'
import styles from './WikiDropDown.module.css'

import SpinnerMypage from './SpinnerMypage'

interface WikiContent {
  section: string
  index: string
  title: string
}

interface WikiData {
  contents: WikiContent[]
}

interface DropDownOption {
  value: string
  label: string
  className: string
}

interface DropDownProps {
  defaultOpt: DropDownOption
  onSelectedOption: (value: string) => void
  onSelectedTitle: (label: string) => void
  title: string
  isOptionDisabled: boolean
}

const DropDown = ({ defaultOpt, onSelectedOption, onSelectedTitle, title, isOptionDisabled }: DropDownProps) => {
  const [wikiData, setWikiData] = useState<WikiData>({ contents: [] })

  useEffect(() => {
    const takeWikiData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${title}`, { withCredentials: true })
        if (res.status === 200) {
          setWikiData(res.data)
        }
        if (res.status === 404) {
          // Handle 404 error if needed
        }
      } catch (error) {
        console.error(error)
      }
    }
    takeWikiData()
  }, [title])

  let options: DropDownOption[] = []
  if (wikiData.contents) {
    options = wikiData.contents.map((content) => ({
      value: `${content.section}`,
      label: `${content.index} ${content.title}`,
      className: 'myOptionClassName',
    }))

    // "전체 편집" 옵션 추가
    options.push({
      value: 'all',
      label: '전체 편집',
      className: 'myOptionClassName',
    })
  }

  let defaultOption: DropDownOption
  if (isOptionDisabled === true) {
    defaultOption = {
      value: 'all',
      label: '전체 편집',
      className: 'myOptionClassName',
    }
  } else {
    defaultOption = defaultOpt
  }

  const onSelect = (selectedOption: DropDownOption) => {
    onSelectedOption(selectedOption.value)
    onSelectedTitle(selectedOption.label)
    // Additional logic can be added here
  }

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
        placeholder={'Select an option'}
      />
    </div>
  )
}

export default DropDown
