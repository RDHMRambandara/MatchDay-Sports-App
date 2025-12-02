import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matches: [],
  loading: false,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMatches, setLoading } = matchesSlice.actions;
export default matchesSlice.reducer;