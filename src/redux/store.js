import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import matchesReducer from './matchesSlice';
import favoritesReducer from './favoritesSlice';
import playersReducer from './playersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    favorites: favoritesReducer,
    players: playersReducer,
  },
});