declare module 'react-js-pagination' {
  import * as React from 'react'

  interface PaginationProps {
    activePage: number
    itemsCountPerPage: number
    totalItemsCount: number
    pageRangeDisplayed: number
    prevPageText?: React.ReactNode
    nextPageText?: React.ReactNode
    onChange: (pageNumber: number) => void
  }

  const Pagination: React.FC<PaginationProps>

  export default Pagination
}
