import React, { useState } from 'react';
import { StatusBar, StyleSheet, ScrollView, Switch, View, Text } from 'react-native';

import VotingScreen from './components/VotingScreen';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
  const [options, setOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, isDarkMode ? styles.darkHeaderText : {}]}>Voting App</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {!showResults ? (
        <VotingScreen
          options={options}
          setOptions={setOptions}
          isDarkMode={isDarkMode}
          styles={isDarkMode ? styles.darkText : styles.text} // Apply text style
        />
      ) : (
        <ResultsScreen
          options={options}
          setShowResults={setShowResults}
          isDarkMode={isDarkMode}
          styles={isDarkMode ? styles.darkText : styles.text} // Apply text style
        />
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  text: {
    color: 'black', // Change text color for light mode
  },
  darkText: {
    color: 'white', // Change text color for dark mode
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkHeaderText: {
    color: 'white', // Change text color for dark mode
  },
});
