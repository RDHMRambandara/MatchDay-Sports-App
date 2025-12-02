import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
  loading: false,
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayersLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPlayers, setPlayersLoading } = playersSlice.actions;
export default playersSlice.reducer;