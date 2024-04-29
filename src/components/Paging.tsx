import React, { useState } from "react";
import Pagination from "react-js-pagination";
import  "./Paging.css";

const Paging = (props: any) => {
  const [page, setPage] = useState(props.activePage); // 현재 페이지 상태로 초기화

  const handlePageChange = (pageNumber: any) => {
    setPage(pageNumber); // 페이지 번호 업데이트
    props.onChange(pageNumber); // 부모 컴포넌트의 페이지 변경 핸들러 호출
  };

  return (
        <Pagination
      activePage={page}
      itemsCountPerPage={props.perPage}
      totalItemsCount={props.total}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;

