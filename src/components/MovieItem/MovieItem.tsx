import {
  MovieItemContainer,
  MovieImage,
  MovieTitle,
  AddToFavoritesButton,
} from "./MovieItem-style";

const MovieItem = ({ movie, onToggleFavorite, isFavorite }: any) => {
  const buttonText = isFavorite ? "Delete from Favorites" : "Add to Favorites";

  return (
    <MovieItemContainer>
      <MovieImage
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieTitle>{movie.title}</MovieTitle>
      {onToggleFavorite && (
        <AddToFavoritesButton onClick={onToggleFavorite}>
          {buttonText}
        </AddToFavoritesButton>
      )}
    </MovieItemContainer>
  );
};

export default MovieItem;
