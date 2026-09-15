const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = (() => {
  const getAccessToken = () => localStorage.getItem('accessToken');
  const putAccessToken = (token) => localStorage.setItem('accessToken', token);
  const removeAccessToken = () => localStorage.removeItem('accessToken');

  const fetchWithAuth = async (url, options = {}) => {
    const token = getAccessToken();
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    return response;
  };

  // ─── Auth ────────────────────────────────────────────────────────────────
  const register = async ({ name, email, password }) => {
    const response = await fetchWithAuth(`${BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.user;
  };

  const login = async ({ email, password }) => {
    const response = await fetchWithAuth(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.token;
  };

  const getOwnProfile = async () => {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.user;
  };

  // ─── Users ────────────────────────────────────────────────────────────────
  const getAllUsers = async () => {
    const response = await fetchWithAuth(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.users;
  };

  // ─── Threads ─────────────────────────────────────────────────────────────
  const getAllThreads = async () => {
    const response = await fetchWithAuth(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.threads;
  };

  const getThreadDetail = async (threadId) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.detailThread;
  };

  const createThread = async ({ title, body, category = '' }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.thread;
  };

  // ─── Comments ─────────────────────────────────────────────────────────────
  const createComment = async ({ threadId, content }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.comment;
  };

  // ─── Votes – Threads ──────────────────────────────────────────────────────
  const upVoteThread = async (threadId) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  };

  const downVoteThread = async (threadId) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  };

  const neutralVoteThread = async (threadId) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  };

  // ─── Votes – Comments ─────────────────────────────────────────────────────
  const upVoteComment = async ({ threadId, commentId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  };

  const downVoteComment = async ({ threadId, commentId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  };

  const neutralVoteComment = async ({ threadId, commentId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.vote;
  };

  // ─── Leaderboards ─────────────────────────────────────────────────────────
  const getLeaderboards = async () => {
    const response = await fetchWithAuth(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
    return responseJson.data.leaderboards;
  };

  return {
    getAccessToken,
    putAccessToken,
    removeAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
})();

export default api;
