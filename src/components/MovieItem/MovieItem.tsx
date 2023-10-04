import Button from "../Button/Button";
import { MovieItemContainer, MovieImage, MovieTitle } from "./MovieItem-style";

export interface MovieType {
  id: string;
  title: string;
  poster_path: string;
}

export interface MovieItemProps {
  movie: MovieType;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}
const MovieItem = ({ movie, onToggleFavorite, isFavorite }: MovieItemProps) => {
  const buttonText = isFavorite ? "Remove from favorites" : "Add to favorites";

  return (
    <MovieItemContainer>
      <MovieImage
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieTitle>{movie.title}</MovieTitle>
      <Button onClick={onToggleFavorite} label={buttonText} />
    </MovieItemContainer>
  );
};

export default MovieItem;
