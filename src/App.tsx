import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "./config";
import Button from "./components/Button/Button";
import MovieList from "./components/MovieList/MovieList";
import { MovieType } from "./components/MovieItem/MovieItem";
import { AppContainer, Header } from "./App-style";

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<MovieType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("popular");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const cachedData = localStorage.getItem(activeTab);

      if (cachedData) {
        setMovies(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          let response;

          if (activeTab === "popular") {
            response = await axios.get(
              `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );
          } else if (activeTab === "currently_broadcast") {
            response = await axios.get(
              `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
            );
          }
          response &&
            localStorage.setItem(
              activeTab,
              JSON.stringify(response.data.results)
            );

          response && setMovies(response.data.results);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
    <AppContainer>
      <Header>
        <Button label="Popular" onClick={() => handleTabChange("popular")} />
        <Button
          label="Currently Broadcast"
          onClick={() => handleTabChange("currently_broadcast")}
        />
        <Button
          label="Favorites"
          onClick={() => handleTabChange("favorites")}
        />
      </Header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <MovieList
          movies={activeTab === "favorites" ? favorites : movies}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      )}
    </AppContainer>
  );
}

export default App;
