import React, { useEffect, useState } from "react";
import { MovieType } from "../components/MovieItem/MovieItem";
import MovieList from "../components/MovieList/MovieList";
import axios from "axios";
import { apiKey, BASE_URL } from "../config";
import { useLocation } from "react-router-dom";

enum MovieTypes {
  POPULAR = "popular",
  CURRENTLY_BROADCAST = "currently_broadcast",
  FAVORITES = "favorites",
}

const HomePage = () => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<MovieType[]>([]);

  const getMovies = async (
    movieType: MovieTypes.POPULAR | MovieTypes.CURRENTLY_BROADCAST
  ) => axios.get(`${BASE_URL}/${movieType}?api_key=${apiKey}`);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const cachedData = localStorage.getItem(currentPath);
      console.log(cachedData);

      if (cachedData && cachedData !== "undefined") {
        setMovies(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          let response;

          if (currentPath !== MovieTypes.FAVORITES) {
            response = await getMovies(
              currentPath as MovieTypes.POPULAR | MovieTypes.CURRENTLY_BROADCAST
            );
          }

          const movies: MovieType[] = response?.data.results;
          response && localStorage.setItem(currentPath, JSON.stringify(movies));

          response && setMovies(movies);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentPath]);

  const handleToggleFavorite = (movie: MovieType) => {
    const isFavorite = favorites.some(
      (favMovie: MovieType) => favMovie.title === movie.title
    );

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favMovie: MovieType) => favMovie.title !== movie.title
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div>
      {loading ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : (
        <MovieList
          movies={currentPath === MovieTypes.FAVORITES ? favorites : movies}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default HomePage;
