import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import './Paging.css'
import leftArrow from '../img/left-arrow.svg'
import leftDoubleArrow from '../img/left-double-arrow.svg'

interface PagingProps {
  activePage: number
  perPage: number
  total: number
  onChange: (pageNumber: number) => void
}

const Paging: React.FC<PagingProps> = ({ activePage, perPage, total, onChange }) => {
  const [page, setPage] = useState(activePage) // 현재 페이지 상태로 초기화

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber) // 페이지 번호 업데이트
    onChange(pageNumber) // 부모 컴포넌트의 페이지 변경 핸들러 호출
  }

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={perPage}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      firstPageText={<img src={leftDoubleArrow} alt={'왼쪽 더블 화살표'} />}
      prevPageText={<img src={leftArrow} alt={'왼쪽 화살표'} style={{ marginRight: '14px' }} />}
      nextPageText={
        <img src={leftArrow} alt={'오른쪽 화살표'} style={{ transform: 'rotate(180deg)', marginLeft: '14px' }} />
      }
      lastPageText={<img src={leftDoubleArrow} alt={'왼쪽 더블 화살표'} style={{ transform: 'rotate(180deg)' }} />}
      onChange={handlePageChange}
    />
  )
}

export default Paging
