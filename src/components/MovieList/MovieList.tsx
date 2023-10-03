import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import { MovieListContainer } from "./MovieList-style";

function MovieList({ movies, onToggleFavorite, favorites }: any) {
  return (
    <MovieListContainer>
      {movies.map((movie: any) => {
        const isFavorite = favorites.some(
          (favMovie: any) => favMovie.title === movie.title
        );
        return (
          <MovieItem
            key={movie.id}
            movie={movie}
            onToggleFavorite={() => onToggleFavorite(movie)}
            isFavorite={isFavorite}
          />
        );
      })}
    </MovieListContainer>
  );
}

export default MovieList;
