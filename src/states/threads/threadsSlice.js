import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    setThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
    toggleUpVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id !== threadId) return thread;
        const isUpVoted = thread.upVotesBy.includes(userId);
        return {
          ...thread,
          upVotesBy: isUpVoted
            ? thread.upVotesBy.filter((id) => id !== userId)
            : thread.upVotesBy.concat(userId),
          downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
        };
      });
    },
    toggleDownVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id !== threadId) return thread;
        const isDownVoted = thread.downVotesBy.includes(userId);
        return {
          ...thread,
          downVotesBy: isDownVoted
            ? thread.downVotesBy.filter((id) => id !== userId)
            : thread.downVotesBy.concat(userId),
          upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
        };
      });
    },
  },
});

export const {
  setThreads, addThread, toggleUpVoteThread, toggleDownVoteThread,
} = threadsSlice.actions;

export const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThread(thread));
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const userId = authUser.id;
  dispatch(toggleUpVoteThread({ threadId, userId }));
  try {
    const thread = getState().threads.find((t) => t.id === threadId);
    if (thread.upVotesBy.includes(userId)) {
      await api.upVoteThread(threadId);
    } else {
      await api.neutralVoteThread(threadId);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpVoteThread({ threadId, userId }));
  }
};

export const asyncToggleDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const userId = authUser.id;
  dispatch(toggleDownVoteThread({ threadId, userId }));
  try {
    const thread = getState().threads.find((t) => t.id === threadId);
    if (thread.downVotesBy.includes(userId)) {
      await api.downVoteThread(threadId);
    } else {
      await api.neutralVoteThread(threadId);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownVoteThread({ threadId, userId }));
  }
};

export default threadsSlice.reducer;
