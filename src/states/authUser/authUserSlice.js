import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => action.payload,
    clearAuthUser: () => null,
  },
});

export const { setAuthUser, clearAuthUser } = authUserSlice.actions;

export const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(clearAuthUser());
  api.removeAccessToken();
};

export default authUserSlice.reducer;
