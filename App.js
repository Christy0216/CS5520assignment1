import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [screen, setScreen] = useState('Start');
  const [userData, setUserData] = useState({ name: '', email: '' });

  const handleContinue = (name, email) => {
    setUserData({ name, email });
    setScreen('Game');
  };

  const handleRestart = () => {
    setUserData({ name: '', email: '' });
    setScreen('Start');
  };

  let content;
  if (screen === 'Start') {
    content = <StartScreen onContinue={handleContinue} />;
  } else if (screen === 'Game') {
    content = <GameScreen onRestart={handleRestart} />;
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
