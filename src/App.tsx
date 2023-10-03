import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "./config";
import Button from "./components/Button/Button";
import MovieList from "./components/MovieList/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("popular"); // Default active tab

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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

        response && setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleToggleFavorite = (movie: any) => {
    const isFavorite = favorites.some(
      (favMovie: any) => favMovie.title === movie.title
    );

    if (isFavorite) {
      // Remove the movie from favorites
      const updatedFavorites = favorites.filter(
        (favMovie: any) => favMovie.title !== movie.title
      );
      setFavorites(updatedFavorites);
    } else {
      // Add the movie to favorites
      setFavorites([...favorites, movie] as any);
    }
  };

  return (
    <div className="App">
      <div className="buttons-container">
        <Button label="Popular" onClick={() => handleTabChange("popular")} />
        <Button
          label="Currently Broadcast"
          onClick={() => handleTabChange("currently_broadcast")}
        />
        <Button
          label="Favorites"
          onClick={() => handleTabChange("favorites")}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <MovieList
          movies={activeTab === "favorites" ? favorites : movies}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
}

export default App;
