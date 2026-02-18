import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search by Runner, LR No, Status"
          placeholderTextColor={'#666'}
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#666',
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#333',
  },
});
