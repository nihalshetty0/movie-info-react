import React, { useEffect, useState } from "react";

import Filter from "../Layout/Filter";
import MovieGrid from "../Layout/MovieGrid";
import Pagination from "../Layout/Pagination";

import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [maxPage, setMaxPage] = useState(0);

  // get query param from url
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");

    if (page === null) {
      const otherQuery = {};
      for (var pair of searchParams.entries()) {
        if (pair[0] === "page") continue;
        otherQuery[pair[0]] = pair[1];
      }
      setSearchParams({
        ...otherQuery,
        page: 1,
      });
    }
    const selectedGenre = searchParams.get("with_genre");

    (async () => {
      let res;
      if (selectedGenre === null) {
        res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=490daab0f9ce767ec92bfabd7c11cb1e&page=${page}`
        );
      } else {
        res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=490daab0f9ce767ec92bfabd7c11cb1e&with_genres=${selectedGenre}&page=${page}`
        );
      }
      setMovies(res.data.results);
      setMaxPage(res.data.total_pages);
    })();
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <Filter />
      {movies !== null && <MovieGrid movies={movies} />}
      <Pagination maxPage={maxPage} />
    </>
  );
};

export default Home;
