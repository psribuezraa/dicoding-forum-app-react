import { describe, it, expect } from 'vitest';
import threadsReducer, { setThreads, addThread } from './threadsSlice';

/**
 * test scenario for threadsSlice
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by setThreads action
 *  - should return the threads with the new thread when given by addThread action
 *
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by setThreads action', () => {
    const initialState = [];
    const action = {
      type: setThreads.type,
      payload: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          body: 'Thread 1 body',
          category: 'react',
          createdAt: '2023-01-01T00:00:00.000Z',
          ownerId: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });

  it('should return the threads with the new thread when given by addThread action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        category: 'react',
        createdAt: '2023-01-01T00:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: addThread.type,
      payload: {
        id: 'thread-2',
        title: 'Thread 2',
        body: 'Thread 2 body',
        category: 'redux',
        createdAt: '2023-01-02T00:00:00.000Z',
        ownerId: 'user-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload, ...initialState]);
  });
});
