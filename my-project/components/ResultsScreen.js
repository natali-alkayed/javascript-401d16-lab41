import React from 'react';
import { View, Text, Button } from 'react-native';

const ResultsScreen = ({ options, setShowResults, isDarkMode }) => {
  const calculatePercentage = (votes) => {
    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
    return totalVotes === 0 ? 0 : ((votes / totalVotes) * 100).toFixed(2);
  };

  return (
    <View style={isDarkMode ? darkStyles.container : styles.container}>
      <Text style={isDarkMode ? darkStyles.resultsTitle : styles.resultsTitle}>Results:</Text>
      {options.map((option, index) => (
        <View key={index} style={isDarkMode ? darkStyles.result : styles.result}>
          <Text style={isDarkMode ? darkStyles.text : styles.text}>{option.text}:</Text>
          <Text style={isDarkMode ? darkStyles.text : styles.text}>{option.votes} votes</Text>
          <Text style={isDarkMode ? darkStyles.text : styles.text}>{calculatePercentage(option.votes)}%</Text>
        </View>
      ))}
      <Button
        title="Back to Voting"
        onPress={() => setShowResults(false)}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Text color for light mode
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#eee', // Box color for light mode
  },
  text: {
    color: 'black', // Text color for light mode
  },
};

const darkStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Background color for dark mode
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Text color for dark mode
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333', // Box color for dark mode
  },
  text: {
    color: 'white', // Text color for dark mode
  },
};

export default ResultsScreen;
