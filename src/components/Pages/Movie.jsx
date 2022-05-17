import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

const Movie = (props) => {
  // console.log(props.match.id)
  const params = useParams();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=490daab0f9ce767ec92bfabd7c11cb1e&sort_by=popularity.desc`
      );
    //   console.log(res.data);
      setMovieInfo(res.data);
    })();
  }, []);

  return (
    <>
      <div>{movieInfo?.original_title}</div>
    </>
  )
};

export default Movie;
