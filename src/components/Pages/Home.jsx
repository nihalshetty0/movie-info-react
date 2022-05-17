import React, { useEffect, useState } from "react";

import axios from "axios";

import DiscoverBar from "../Layout/DiscoverBar";
import MovieGrid from "../Layout/MovieGrid";
import Pagination from "../Layout/Pagination";

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [maxPage, setMaxPage] = useState(0)

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page')
    if(page===null){
      setSearchParams({page: 1})
    }
    const selectedGenre = searchParams.get("with_genre");

    (async () => {
      if(selectedGenre === null){
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=490daab0f9ce767ec92bfabd7c11cb1e&page=${page}`
        );
        // console.log(res)
        setMovies(res.data.results);
        setMaxPage(res.data.total_pages)
      }else{
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=490daab0f9ce767ec92bfabd7c11cb1e&with_genres=${selectedGenre}&page=${page}`
          );
          setMovies(res.data.results);
          setMaxPage(res.data.total_pages)
      }
    })();
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <div className='container pt-4'>
        <DiscoverBar />
        {/* <Pagination /> */}
        <MovieGrid movies={movies || []} />
        <Pagination maxPage={maxPage}/>
      </div>
    </>
  );
};

export default Home;
