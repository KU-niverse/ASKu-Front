import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import './Paging.css'

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
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  )
}

export default Paging
