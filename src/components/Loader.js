import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => (
  <View style={{ marginVertical: 20 }}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loader;
