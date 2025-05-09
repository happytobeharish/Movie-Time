import React, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddtoWatchlist , handleRemoveFromWatchList , watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => { 
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=68a4d79a6fa108c3990a50051914d4cd&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>

      <div className="flex flex-row flex-wrap justify-around gap-6">
        {movies.map((movieObj) => {
          return (
            <Moviecard key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}

export default Movies;

//https://api.themoviedb.org/3/movie/popular?api_key=68a4d79a6fa108c3990a50051914d4cd&language=en-US&page=1
