import { describe, it, expect } from 'vitest';
import usersReducer, { setUsers } from './usersSlice';

/**
 * test scenario for usersSlice
 *
 * - usersReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the users when given by setUsers action
 *
 */

describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given by setUsers action', () => {
    const initialState = [];
    const action = {
      type: setUsers.type,
      payload: [
        {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image.url.jpg',
        },
      ],
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });
});
