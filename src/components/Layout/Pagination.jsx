import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

// Generate page number list
const getPageArray = (page, max) => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (max < 9) {
    return arr.slice(0, max);
  }
  if (page > 5) {
    if (max - 4 < page) page = max - 4;
    arr = arr.map((e) => e + page - 5);
  }
  return arr;
};

const Pagination = ({ maxPage }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(null);

  // set page number from URL
  useEffect(() => {
    setPage(parseInt(searchParams.get("page")) || 1);
  }, [searchParams]);

  const pageChange = (num, maxPage) => {
    if (num > maxPage) return;
    setPage(num);
    const otherQuery = {};
    for (var pair of searchParams.entries()) {
      if (pair[0] === "page") continue;
      otherQuery[pair[0]] = pair[1];
    }
    setSearchParams({
      ...otherQuery,
      page: num,
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const onClick = (e) => {
    const newPage = e.target.getAttribute("data-page");
    if (page === parseInt(newPage)) {
      window.scrollTo(0, 0);
      return;
    }
    pageChange(newPage, maxPage);
  };

  const toNextPage = () => {
    pageChange(page + 1, maxPage);
  };

  const toPrevPage = () => {
    if (page !== 1) pageChange(page - 1, maxPage);
  };

  if (maxPage === 0 || page === null) return <></>;

  return (
    <>
      <nav className='my-4 d-flex justify-content-center'>
        <ul className='pagination'>
          <li className='page-item'>
            <button className='page-link bg-light' onClick={toPrevPage}>
              <span aria-hidden='true'>&laquo;</span>
            </button>
          </li>

          <PaginationArray maxPage={maxPage} page={page} onClick={onClick} />

          <li className='page-item'>
            <button className='page-link bg-light' onClick={toNextPage}>
              <span aria-hidden='true'>&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

const PaginationArray = ({ maxPage, page, onClick }) => {
  return (
    <>
      {getPageArray(page, maxPage).map((l) => {
        return (
          <li className={`page-item`} key={l}>
            <button className={`page-link ${page === l ? "active":"bg-light"}`} data-page={l} onClick={onClick}>
              {l}
            </button>
          </li>
        );
      })}
    </>
  );
};

export default Pagination;
