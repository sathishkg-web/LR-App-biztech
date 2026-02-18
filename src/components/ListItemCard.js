import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItemCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.lrNo}>LR No: {item.LrNo}</Text>
      <Text>Date: {item.Date}</Text>
      <Text>Runner: {item.RunnerName}</Text>
      <Text>Start: {item.StartTimeString || 'N/A'}</Text>
      <Text>End: {item.EndTimeString || 'N/A'}</Text>
      <Text>Status: {item.Status || 'N/A'}</Text>
    </View>
  );
};

export default ListItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  lrNo: { fontWeight: 'bold', marginBottom: 5 },
});
