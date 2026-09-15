import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setUsers } from '../users/usersSlice';
import { setThreads } from '../threads/threadsSlice';

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const users = await api.getAllUsers();
    const threads = await api.getAllThreads();

    dispatch(setUsers(users));
    dispatch(setThreads(threads));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
