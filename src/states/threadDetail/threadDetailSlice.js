import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    setThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => ({
      ...state,
      comments: [action.payload, ...state.comments],
    }),
    toggleUpVoteDetail: (state, action) => {
      const { userId } = action.payload;
      const isUpVoted = state.upVotesBy.includes(userId);
      return {
        ...state,
        upVotesBy: isUpVoted
          ? state.upVotesBy.filter((id) => id !== userId)
          : state.upVotesBy.concat(userId),
        downVotesBy: state.downVotesBy.filter((id) => id !== userId),
      };
    },
    toggleDownVoteDetail: (state, action) => {
      const { userId } = action.payload;
      const isDownVoted = state.downVotesBy.includes(userId);
      return {
        ...state,
        downVotesBy: isDownVoted
          ? state.downVotesBy.filter((id) => id !== userId)
          : state.downVotesBy.concat(userId),
        upVotesBy: state.upVotesBy.filter((id) => id !== userId),
      };
    },
    toggleUpVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id !== commentId) return comment;
          const isUpVoted = comment.upVotesBy.includes(userId);
          return {
            ...comment,
            upVotesBy: isUpVoted
              ? comment.upVotesBy.filter((id) => id !== userId)
              : comment.upVotesBy.concat(userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }),
      };
    },
    toggleDownVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id !== commentId) return comment;
          const isDownVoted = comment.downVotesBy.includes(userId);
          return {
            ...comment,
            downVotesBy: isDownVoted
              ? comment.downVotesBy.filter((id) => id !== userId)
              : comment.downVotesBy.concat(userId),
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          };
        }),
      };
    },
  },
});

export const {
  setThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpVoteDetail,
  toggleDownVoteDetail,
  toggleUpVoteComment,
  toggleDownVoteComment,
} = threadDetailSlice.actions;

export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetail());
  try {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(setThreadDetail(threadDetail));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncAddComment = ({ content, threadId }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const comment = await api.createComment({ content, threadId });
    dispatch(addComment(comment));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpVoteDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  const userId = authUser.id;
  dispatch(toggleUpVoteDetail({ userId }));
  try {
    const updated = getState().threadDetail;
    if (updated.upVotesBy.includes(userId)) {
      await api.upVoteThread(threadDetail.id);
    } else {
      await api.neutralVoteThread(threadDetail.id);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpVoteDetail({ userId }));
  }
};

export const asyncToggleDownVoteDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  const userId = authUser.id;
  dispatch(toggleDownVoteDetail({ userId }));
  try {
    const updated = getState().threadDetail;
    if (updated.downVotesBy.includes(userId)) {
      await api.downVoteThread(threadDetail.id);
    } else {
      await api.neutralVoteThread(threadDetail.id);
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownVoteDetail({ userId }));
  }
};

export const asyncToggleUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  const userId = authUser.id;
  dispatch(toggleUpVoteComment({ commentId, userId }));
  try {
    const updated = getState().threadDetail;
    const comment = updated.comments.find((c) => c.id === commentId);
    if (comment.upVotesBy.includes(userId)) {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    } else {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpVoteComment({ commentId, userId }));
  }
};

export const asyncToggleDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  const userId = authUser.id;
  dispatch(toggleDownVoteComment({ commentId, userId }));
  try {
    const updated = getState().threadDetail;
    const comment = updated.comments.find((c) => c.id === commentId);
    if (comment.downVotesBy.includes(userId)) {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    } else {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    }
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownVoteComment({ commentId, userId }));
  }
};

export default threadDetailSlice.reducer;
