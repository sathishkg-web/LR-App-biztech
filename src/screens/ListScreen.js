import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLineRunList } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import ListItemCard from '../components/ListItemCard';
import Loader from '../components/Loader';

const PAGE_SIZE = 10;

const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [hasMore, setHasMore] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Prevent hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true; // Prevent default behavior (going back)
      }
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    loadData(true);
  }, [filter]);

  const loadData = async (reset = false) => {
    try {
      reset ? setLoading(true) : setLoadingMore(true);

      const response = await fetchLineRunList({
        id: page,
        geolocation: '23.1341,77.5632',
      });

      const newData = response?.Data || [];

      if (reset) {
        setData(newData);
        setPage(2);
      } else {
        setData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }

      if (newData.length < PAGE_SIZE) {
        setHasMore(false);
      }

    } catch (error) {
      console.error('[ListScreen] Error fetching data:', error);
      //Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch =
      item.RunnerName?.toLowerCase().includes(search.toLowerCase()) ||
      item.LrNo?.toLowerCase().includes(search.toLowerCase()) ||
      item.Status?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' || item.Status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Line Run List</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={search} onChange={setSearch} />
      <FilterTabs selected={filter} onSelect={setFilter} />

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={PAGE_SIZE}
          renderItem={({ item }) => (
            <ListItemCard item={item} />
          )}
          onEndReached={() => {
            console.log('onEndReached');
            if (!loadingMore && hasMore && filteredData.length > 0) loadData();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore && <Loader />}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No Data Found
            </Text>
          }
        />
      )}
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
