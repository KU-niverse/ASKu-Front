import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './DropDown.css'
import axios from 'axios'

interface Content {
  index: number
  title: string
}

interface WikiData {
  contents: Content[]
}

interface DropDownProps {
  onSelectedOption: (value: string) => void
  title: string
  defaultOpt: string
}

function DropDown({ onSelectedOption, title, defaultOpt }: DropDownProps) {
  const [wikiData, setWikiData] = useState<WikiData | null>(null)

  useEffect(() => {
    const takeWikiData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/wiki/contents/${title}`, { withCredentials: true })
        if (res.status === 200) {
          setWikiData(res.data)
        } else if (res.status === 404) {
          // Handle the 404 case if needed
        }
      } catch (error) {
        console.error(error)
      }
    }
    takeWikiData()
  }, [title])

  let options: { value: string; label: string; className: string }[] = []
  if (wikiData && wikiData.contents) {
    options = wikiData.contents.map((content: Content) => ({
      value: `${content.index} ${content.title}`,
      label: `${content.index} ${content.title}`,
      className: 'myOptionClassName',
    }))
    // "전체 편집" 옵션 추가
    options.push({
      value: '전체',
      label: '전체',
      className: 'myOptionClassName',
    })
  }

  const defaultOption = defaultOpt || '전체'

  const onSelect = (selectedOption: any) => {
    onSelectedOption(selectedOption.value)
    // 처리할 로직을 여기에 추가
  }

  return (
    <div className={'dropdown-container'}>
      <Dropdown
        className={'dropdown'}
        controlClassName={'dropdowncontrol'}
        menuClassName={'dropdownmenu'}
        placeholderClassName={'dropdownph'}
        options={options}
        onChange={onSelect}
        value={defaultOption}
        placeholder={'Select an option'}
      />
    </div>
  )
}

export default DropDown
