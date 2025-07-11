import React, { useEffect, useState } from "react";
import MovieCard from "./MovieList";
import { allMoviesData } from "./MovieList";
  
  export default function MovieTable() {
    const [allMovies, setAllMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(favs);
      setAllMovies(allMoviesData);
    }, []);
  
    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
  
    const addToFavorites = (movie) => {
      if (!favorites.find((fav) => fav.id === movie.id)) {
        setFavorites([...favorites, movie]);
      }
    };
  
    const removeFromFavorites = (movie) => {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    };
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Movies</h1>
        <div className="flex flex-wrap">
          {allMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={false}
              onAdd={addToFavorites}
            />
          ))}
        </div>
  
        <h2 className="text-2xl font-bold mt-8 mb-4">Favorites</h2>
        <div className="flex flex-wrap">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onRemove={removeFromFavorites}
            />
          ))}
        </div>
      </div>
    );
  }
  
   