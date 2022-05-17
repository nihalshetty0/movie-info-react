import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

const getPageArray = (page, max) =>{
    let arr = [1,2,3,4,5,6,7,8,9]
    if(max < 9){
        return arr.slice(0, max)
    }
    if(page>5){
        if(max - 4 < page) page = max - 4
        arr = arr.map(e => e + page - 5)
    }
    return arr
}

const Pagination = ({ maxPage }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(parseInt(searchParams.get("page")) || 1);
  }, [searchParams]);

  const pageChange = (num, maxPage) => {
    console.log(maxPage);
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
    pageChange(newPage, maxPage);
  };

  const toNextPage = () => {
    pageChange(page + 1, maxPage);
  };

  const toPrevPage = () => {
    if (page !== 1) pageChange(page - 1, maxPage);
  };

  if (page === null) return <></>;

  return (
    <>
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          <li className='page-item'>
            <button className='page-link' onClick={toPrevPage}>
              <span aria-hidden='true'>&laquo;</span>
            </button>
          </li>
          {getPageArray(page, maxPage).map((l) => {
            return (
              <li className={`page-item ${page === l && "active"}`} key={l}>
                <button className='page-link' data-page={l} onClick={onClick}>
                  {l}
                </button>
              </li>
            );
          })}
          <li className='page-item'>
            <button className='page-link' onClick={toNextPage}>
              <span aria-hidden='true'>&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;