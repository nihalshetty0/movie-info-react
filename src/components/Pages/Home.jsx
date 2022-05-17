import React, { useEffect, useState } from "react";

import axios from "axios";

import DiscoverBar from "../Layout/DiscoverBar";
import MovieGrid from "../Layout/MovieGrid";

import { useSearchParams } from "react-router-dom";

const Home = ({ popularMovies }) => {

  let [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const selectedGenre = searchParams.get("with_genre");
    if (selectedGenre === null) {
      setResult(null);
      return;
    }
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=490daab0f9ce767ec92bfabd7c11cb1e&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenre}`
      );
      setResult(res.data.results);
    })();
  }, [searchParams]);

  return (
    <>
      <div className='container pt-4'>
        <DiscoverBar />
        {result === null ? (
          <MovieGrid movies={popularMovies} />
        ) : (
          <MovieGrid movies={result} />
        )}
      </div>
    </>
  );
};

export default Home;
