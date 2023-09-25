import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Button, Vibration } from 'react-native';

export default function App() {
  const [options, setOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [newOptionText, setNewOptionText] = useState('');

  const handleVote = (index) => {
    const updatedOptions = [...options];
    updatedOptions[index].votes += 1;
    setOptions(updatedOptions);

    Vibration.vibrate(500);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const calculatePercentage = (votes) => {
    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
    return totalVotes === 0 ? 0 : ((votes / totalVotes) * 100).toFixed(2);
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <View key={index} style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleVote(index)}>
          <Text>{option.text}</Text>
          <Text>{option.votes} votes</Text>
        </TouchableOpacity>
        <Button
          title="Delete"
          onPress={() => handleDeleteOption(index)}
          color="red"
        />
      </View>
    ));
  };

  const renderResults = () => {
    return options.map((option, index) => (
      <View key={index} style={styles.result}>
        <Text>{option.text}:</Text>
        <Text>{option.votes} votes</Text>
        <Text>{calculatePercentage(option.votes)}%</Text>
      </View>
    ));
  };

  const addOption = () => {
    if (newOptionText.trim() === '') {
      return;
    }
    const newOption = { text: newOptionText, votes: 0 };
    setOptions([...options, newOption]);
    setNewOptionText('');
  };

  const resetVotes = () => {
    const resetOptions = options.map((option) => ({
      ...option,
      votes: 0,
    }));
    setOptions(resetOptions);
    setShowResults(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Vote for your favorite option:</Text>
      {options.length === 0 && (
        <Text>No options available. Add some options below:</Text>
      )}
      {!showResults ? (
        <View>
          {renderOptions()}
          <TextInput
            placeholder="Enter a new option"
            value={newOptionText}
            onChangeText={(text) => setNewOptionText(text)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Add Option" onPress={addOption} />
            <Button title="View Results" onPress={() => setShowResults(true)} />
          </View>
          <Button title="Reset Votes" onPress={resetVotes} />
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          {renderResults()}
          <Button
            title="Back to Voting"
            onPress={() => setShowResults(false)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  option: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginEnd: 5,
    borderRadius: 5,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  resultsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
});
