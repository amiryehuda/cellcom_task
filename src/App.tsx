// App.js
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Button from "./components/Button/Button";
import { AppContainer, Header } from "./App-style";

const App = () => {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <Header>
        <Button label="Popular" onClick={() => navigate("popular")} />
        <Button label="Now Playing" onClick={() => navigate("now_playing")} />
        <Button label="Favorites" onClick={() => navigate("favorites")} />
      </Header>
      <Routes>
        <Route path="/" element={<Navigate replace to="/popular" />} />
        <Route path="/popular" element={<HomePage />} />
        <Route path="/now_playing" element={<HomePage />} />
        <Route path="/favorites" element={<HomePage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
