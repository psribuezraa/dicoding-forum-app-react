import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUser } from '../authUser/authUserSlice';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload: (state, action) => action.payload,
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch {
    dispatch(setAuthUser(null));
  } finally {
    dispatch(setIsPreload(false));
    dispatch(hideLoading());
  }
};

export default isPreloadSlice.reducer;
