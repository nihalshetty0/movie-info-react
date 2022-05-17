import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSearchParams } from "react-router-dom";

import MovieGrid from "../Layout/MovieGrid";

const Search = () => {
  let [searchParams] = useSearchParams();
  const [result, setResult] = useState([]);

//   console.log(genreChoice.map((g) => g.id));
  useEffect(() => {
    (async () => {
      const searchResult = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=490daab0f9ce767ec92bfabd7c11cb1e&language=en-US&sort_by=popularity.desc&query=${searchParams.get(
          "query"
        )}`
      );
      //   &sort_by=popularity.desc&with_genres=${searchParams.get("with_genre")}
    //   console.log(searchResult.data.results);
      setResult(searchResult.data.results);
    })();
  }, [searchParams]);
  return (
    <div className='container pt-4'>
      {/* <DiscoverBar /> */}
      <MovieGrid movies={result} />
    </div>
  );
};

export default Search;
