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
      console.log(res.data)
    })();
    // eslint-disable-next-line
  }, []);

  if (movieInfo === null)
    return <h1 className='text-center mt-5'>Loading...</h1>;

  return (
    <>
      <div className='d-flex flex-column-reverse flex-md-row '>
        <MoviePoster movieInfo={movieInfo} />
        {/* movie info */}
        <AboutMovie movieInfo={movieInfo} />
      </div>
    </>
  );
};
export default Movie;

const MoviePoster = ({ movieInfo }) => {
  return (
    <>
      {movieInfo.poster_path && ( // poster image
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
            alt=''
            // className='border'
            className='me-5 d-none d-md-block poster'
            style={{
              // maxHeight: '400px',
              // objectFit: " cover",
              // width: "100%",
              // height: "350px",
            }}
          />
          <img
            src={`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`}
            alt=''
            // className='border'
            className='me-5 d-md-none poster'
            style={{
              // maxHeight: '400px',
              // objectFit: " cover",
              // width: "100%",
              // height: "350px",
            }}
          />
        </>
      )}
    </>
  );
};

const AboutMovie = ({ movieInfo }) => {
  return (
    <div className=''>
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
