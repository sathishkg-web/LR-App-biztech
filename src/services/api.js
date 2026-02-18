import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from './navigationService';

const BASE_URL = 'https://test-api.crgroups.in';

// Handle 401 Unauthorized globally
const handle401Error = async () => {
  await AsyncStorage.removeItem('token');
  NavigationService.navigate('Login');
};

// Custom fetch wrapper with automatic token injection (like axios interceptor)
const fetchWithAuth = async (url, options = {}) => {
  const token = await AsyncStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach token if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized globally
  if (response.status === 401) {
    await handle401Error();
  }

  return response;
};

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Check HTTP status
    if (!response.ok) {
      throw result || { message: 'Something went wrong' };
    }

    // Check API-specific result field
    if (result.result === 'Failed') {
      throw { message: result.Msg || result.error || 'Login failed' };
    }

    return result;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw { message: 'Network connection error. Please check your internet.' };
    }
    throw error;
  }
};


export const fetchLineRunList = async (data) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/integration/listlinerun`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log('result', result);

    // Check HTTP status
    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        throw { message: 'Session expired. Please login again.', unauthorized: true };
      }
      throw result || { message: 'Something went wrong' };
    }

    // Check API-specific result field
    if (result.result === 'Failed') {
      throw { message: result.Msg || result.error || 'Failed to fetch line run list' };
    }

    return result;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw { message: 'Network connection error. Please check your internet.' };
    }
    throw error;
  }
};
