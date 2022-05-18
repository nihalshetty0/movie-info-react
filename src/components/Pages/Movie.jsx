import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

const Movie = () => {
  const params = useParams();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=490daab0f9ce767ec92bfabd7c11cb1e`
      );
      setMovieInfo(res.data);
      console.log(res.data);
    })();
    // eslint-disable-next-line
  }, []);

  if (movieInfo === null)
    return <h1 className='text-center mt-5'>Loading...</h1>;

  return (
    <>
      <div className='row row-sm-reverse mb-5 mt-4'>
        <MoviePoster poster_path={movieInfo.poster_path} />
        {/* movie info */}
        <AboutMovie movieInfo={movieInfo} />
      </div>
    </>
  );
};
export default Movie;

const MoviePoster = ({ poster_path }) => {
  return (
    <>
      {poster_path && ( // poster image
        <div className='col-12 col-sm-6 mx-auto'>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=''
            className='w-100'
          />
        </div>
      )}
    </>
  );
};

const AboutMovie = ({ movieInfo }) => {
  return (
    <div className='col-12 col-md-6'>
      <h1 className='fw-semibold'>{movieInfo.original_title}</h1>
      <div className='d-flex w-100'>
        <p className='me-3 mb-1'>{movieInfo.release_date}</p>
        <p className='me-3 mb-1'>{movieInfo.runtime} min</p>
        <p className='me-3 mb-1'>{movieInfo.vote_average * 10}/10</p>
      </div>
      <div className='d-none'>
        {movieInfo.genres.map((genre) => {
          return (
            <p key={genre.id} className='me-3 fs-6'>
              {genre.name}
            </p>
          );
        })}
      </div>
      <h4 className='text-muted fw-semibold'>{movieInfo.tagline}</h4>
      <p className=''>{movieInfo.overview}</p>
    </div>
  );
};
