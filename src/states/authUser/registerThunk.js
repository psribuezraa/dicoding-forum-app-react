import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const asyncRegisterUser = ({
  name, email, password,
}) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.register({ name, email, password });
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  } finally {
    dispatch(hideLoading());
  }
};

export default asyncRegisterUser;
