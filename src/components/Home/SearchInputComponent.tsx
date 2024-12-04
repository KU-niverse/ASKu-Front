import React from 'react'
import { useNavigate } from 'react-router-dom'
import searchIconBlack from '../../img/search_icon_black.svg'
import searchIconRed from '../../img/search_icon_red.svg'
import styles from './SearchInputComponent.module.css'

interface SearchInputProps {
  inputValue?: string
  setInputValue?: (value: string) => void
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ inputValue = '', setInputValue = () => {} }) => {
  const Nav = useNavigate()

  return (
    <div className={styles.inputContainer}>
      <img
        role={'presentation'}
        src={inputValue.trim() ? searchIconRed : searchIconBlack} // inputValue가 있으면 searchIconRed, 없으면 searchIconBlack
        alt={'icon'}
        className={styles.searchIcon}
        onClick={() => {
          if (inputValue.trim() !== '') {
            Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}/${encodeURIComponent(`search`)}`)
            setInputValue('')
          }
        }}
      />
      <input
        type={'text'}
        className={styles.headerInput}
        placeholder={'어떤 정보를 찾으시나요?'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || (e.key === 'Shift' && e.shiftKey)) {
            e.preventDefault()
            if (inputValue.trim() !== '') {
              Nav(`/result/${encodeURIComponent(inputValue).replace(/\./g, '%2E')}/${encodeURIComponent(`search`)}`)
              setInputValue('')
            }
          }
        }}
      />
    </div>
  )
}

SearchInputComponent.defaultProps = {
  inputValue: '',
  setInputValue: () => {},
}

export default SearchInputComponent
