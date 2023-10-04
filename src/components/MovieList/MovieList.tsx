import React from "react";
import MovieItem, { MovieType } from "../MovieItem/MovieItem";
import { MovieListContainer } from "./MovieList-style";

export interface MovieItemProps {
  movies: MovieType[];
  favorites: MovieType[];
  onToggleFavorite: (movie: MovieType) => void;
}

const MovieList = ({ movies, onToggleFavorite, favorites }: MovieItemProps) => {
  return (
    <MovieListContainer>
      {movies.map((movie: MovieType) => {
        const isFavorite = favorites.some(
          (favMovie: MovieType) => favMovie.title === movie.title
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
};

export default MovieList;
