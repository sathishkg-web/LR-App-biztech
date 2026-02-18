import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const filters = ['All', 'Completed', 'Running', 'Draft'];

const FilterTabs = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {filters.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.tab,
            selected === item && styles.activeTab,
          ]}
          onPress={() => onSelect(item)}
        >
          <Text
            style={[
              styles.text,
              selected === item && styles.activeText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 10 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  activeTab: { backgroundColor: '#4A90E2' },
  text: { fontSize: 12 },
  activeText: { color: '#fff' },
});
