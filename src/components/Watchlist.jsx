import React, { useEffect, useState } from "react";

import genreids from '../Utlitiy/genres'

export default function Watchlist({ watchlist , setWatchList , handleRemoveFromWatchList}) {
  const [search, setSearch] = useState("");
  const [genreList , setGenreList] = useState(["All Genres"])
  const [currGenre , setCurrGenre] = useState('All Genres')



  let handleSearch = (e) => {
    setSearch(e.target.value);
  };


  let handleFilter = (genre)=>{
    setCurrGenre(genre)
  }


  let sortIncreaseing =()=>{
      let sortedIncreaseing = watchlist.sort((movieA , movieB)=>{
        return movieA.vote_average - movieB.vote_average
      })
      setWatchList([...sortedIncreaseing])
  }


  let sortDescending =()=>{
   let sortedDescending =  watchlist.sort((movieA , movieB)=>{
        return movieB.vote_average - movieA.vote_average
      })
      setWatchList([...sortedDescending])
  }


  useEffect(()=>{
   let temp = watchlist.map((movieObj)=>{
    return genreids[movieObj.genre_ids[0]]
   })
   temp = new Set (temp)
   setGenreList(['All Genres' , ...temp])
   console.log(temp)
  }, [watchlist])

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 gap-5">
       {genreList.map((genre)=>{
             return <div onClick={()=>handleFilter(genre)} className={ currGenre==genre?"flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold":"flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold"}>
             {genre}
           </div>
        })}
           </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none"
        />
      </div>

      <div className=" overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th> 
              <th className="flex justify-center">
                <div  on onClick={sortIncreaseing} className="p-2"><i class="fa-solid fa-arrow-up"></i></div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDescending} className="p-2"><i class="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj)=>{
               if (currGenre=='All Genres'){
                return true
               }
               else {
                return genreids[movieObj.genre_ids[0]]==currGenre;
               }
            }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td onClick={()=>handleRemoveFromWatchList(movieObj)} className="text-red-800">Delete</td>
                  </tr>
                );
              })} 
          </tbody>
        </table>
      </div>
    </>
  );
}
