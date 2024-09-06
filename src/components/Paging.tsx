import React from 'react'
// import Pagination from 'react-js-pagination'
import Pagination from './Pagination'
import './Paging.css'

interface PagingProps {
  activePage: number
  perPage: number
  total: number
  onChange: (pageNumber: number) => void
}

const Paging: React.FC<PagingProps> = ({ activePage, perPage, total, onChange }) => {
  const handlePageChange = (pageNumber: number) => {
    onChange(pageNumber) // 부모 컴포넌트의 페이지 변경 핸들러 호출
  }

  return <Pagination total={total} limit={perPage} page={activePage} setPage={handlePageChange} />
}

export default Paging
