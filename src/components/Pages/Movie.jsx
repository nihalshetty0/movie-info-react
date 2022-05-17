import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

const Movie = () => {
  // console.log(props.match.id)
  const params = useParams();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=490daab0f9ce767ec92bfabd7c11cb1e`
      );
      setMovieInfo(res.data);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>{movieInfo?.original_title}</div>
    </>
  )
};

export default Movie;
