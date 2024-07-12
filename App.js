import React, { useState } from "react";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({ name: "", email: "" });

  const handleStartGame = (name, email) => {
    setPlayerInfo({ name, email });
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setPlayerInfo({ name: "", email: "" });
  };

  return gameStarted ? (
    <GameScreen onRestart={handleRestart} onNewGame={handleRestart} />
  ) : (
    <StartScreen onContinue={handleStartGame} />
  );
};

export default App;
