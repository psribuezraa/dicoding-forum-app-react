import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/authUserSlice';
import isPreloadReducer from './isPreload/isPreloadSlice';
import usersReducer from './users/usersSlice';
import threadsReducer from './threads/threadsSlice';
import leaderboardsReducer from './leaderboards/leaderboardsSlice';
import threadDetailReducer from './threadDetail/threadDetailSlice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
