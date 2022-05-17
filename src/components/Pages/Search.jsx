import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

import MovieGrid from "../Layout/MovieGrid";
import Pagination from "../Layout/Pagination";

const Search = () => {
  // TODO: remove result on blank query

  let [searchParams] = useSearchParams();
  const [result, setResult] = useState([]);
  const [maxPage, setMaxPage] = useState(0)

  let navigate = useNavigate();

  const searchRef = useRef();

  useEffect(() => {
    const query = searchParams.get("query");
    const page = searchParams.get("page") || 1
    if (query === null || query === "") return;
    // console.log(page)
    (async () => {
      const searchResult = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=490daab0f9ce767ec92bfabd7c11cb1e&query=${query}&page=${page}`
      );
      setResult(searchResult.data.results);
      setMaxPage(searchResult.data.total_pages)
    })();
  }, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchRef.current.value}`);
  };

  return (
    <div className='container pt-4'>
      <form className='input-group mb-3' onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Search for movies...'
          required
          ref={searchRef}
        />
        <button type='submit' className='input-group-text' id='basic-addon1'>
          <i className='bi bi-search'></i>
        </button>
      </form>

      <MovieGrid movies={result} />
      <Pagination maxPage={maxPage}/>
    </div>
  );
};

export default Search;
