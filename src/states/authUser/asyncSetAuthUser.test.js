import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncSetAuthUser, setAuthUser } from './authUserSlice';
import api from '../../utils/api';

/**
 * test scenario for asyncSetAuthUser
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image.url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.login = () => Promise.resolve('dummy_token');
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'test@example.com', password: 'password123' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith('dummy_token');
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn();
    
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncSetAuthUser({ email: 'test@example.com', password: 'password123' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
