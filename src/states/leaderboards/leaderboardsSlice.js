import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    setLeaderboards: (state, action) => action.payload,
  },
});

export const { setLeaderboards } = leaderboardsSlice.actions;

export const asyncPopulateLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(setLeaderboards(leaderboards));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default leaderboardsSlice.reducer;
