import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};