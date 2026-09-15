import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncAddThread, addThread } from './threadsSlice';
import api from '../../utils/api';

/**
 * test scenario for asyncAddThread
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Test',
  body: 'Thread Body',
  category: 'react',
  createdAt: '2023-01-01T00:00:00.000Z',
  ownerId: 'john_doe',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.createThread = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    await asyncAddThread({ title: 'Thread Test', body: 'Thread Body', category: 'react' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThread(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncAddThread({ title: 'Thread Test', body: 'Thread Body', category: 'react' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
