import React, { useState } from "react";
import Pagination from "react-js-pagination";
import  "./Paging.css";

const Paging = (props) => {
  const [page, setPage] = useState(1);
  const totalCount = props.total;
  const countPerPage = props.perPage;
// 올림 처리된 pageRange 값을 계산
  const pageRange = Math.ceil(totalCount / countPerPage);
  

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={countPerPage} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={totalCount} // 총 아이템 갯수
      pageRangeDisplayed={pageRange} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;