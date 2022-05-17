import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";


import MovieGrid from "../Layout/MovieGrid";

const Search = () => {

  let [searchParams] = useSearchParams();
  const [result, setResult] = useState([]);

  let navigate = useNavigate();

  const searchRef = useRef()

  useEffect(() => {
    const query = searchParams.get("query");
    if(query===null || query==='') return
    // console.log
    (async () => {
      const searchResult = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=490daab0f9ce767ec92bfabd7c11cb1e&language=en-US&sort_by=popularity.desc&query=${query}`
      );
      setResult(searchResult.data.results);
    })();
  }, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchRef.current.value}`)
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
    </div>
  );
};

export default Search;
