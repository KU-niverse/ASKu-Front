import React, { useState } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Pagination from "react-js-pagination";
import  "./Paging.css";

const Paging = (props: any) => {
  const [page, setPage] = useState(props.activePage); // 현재 페이지 상태로 초기화

  const handlePageChange = (pageNumber: any) => {
    setPage(pageNumber); // 페이지 번호 업데이트
    props.onChange(pageNumber); // 부모 컴포넌트의 페이지 변경 핸들러 호출
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

