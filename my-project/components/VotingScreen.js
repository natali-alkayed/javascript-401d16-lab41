import React, { useState } from 'react';
import { View, Text, Button, TextInput, Vibration, Switch } from 'react-native';

const VotingScreen = ({ options, setOptions, setDarkMode, isDarkMode }) => {
  const [newOptionText, setNewOptionText] = useState('');

  const handleVote = (index) => {
    const updatedOptions = [...options];
    updatedOptions[index].votes += 1;
    setOptions(updatedOptions);

    Vibration.vibrate(500);
  };

  const addOption = () => {
    if (newOptionText.trim() === '') {
      return;
    }
    const newOption = { text: newOptionText, votes: 0 };
    setOptions([...options, newOption]);
    setNewOptionText('');
  };

  return (
    <View style={isDarkMode ? darkStyles.container : styles.container}>
      <View style={styles.header}>
        <Text style={isDarkMode ? darkStyles.headerText : styles.headerText}>Vote for your favorite option:</Text>
       
      </View>
      {options.length === 0 && (
        <Text style={isDarkMode ? darkStyles.text : styles.text}>No options available. Add some options below:</Text>
      )}
      {options.map((option, index) => (
        <View key={index} style={isDarkMode ? darkStyles.optionContainer : styles.optionContainer}>
          <Button title="Vote" onPress={() => handleVote(index)} />
          <Text style={isDarkMode ? darkStyles.text : styles.text}>{option.text}</Text>
          <Text style={isDarkMode ? darkStyles.text : styles.text}>{option.votes} votes</Text>
        </View>
      ))}
      <TextInput
        placeholder="Enter a new option"
        value={newOptionText}
        onChangeText={(text) => setNewOptionText(text)}
        style={isDarkMode ? darkStyles.input : styles.input}
      />
      <Button title="Add Option" onPress={addOption} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Text color for light mode
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#eee', // Box color for light mode
    padding: 10,
  },
  text: {
    color: 'black', // Text color for light mode
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white', // Input background color for light mode
  },
};

const darkStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Background color for dark mode
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Text color for dark mode
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#333', // Box color for dark mode
    padding: 10,
  },
  text: {
    color: 'white', // Text color for dark mode
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#333', // Input background color for dark mode
    color: 'white', // Text color for input in dark mode
  },
};

export default VotingScreen;
