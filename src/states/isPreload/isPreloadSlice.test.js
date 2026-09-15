import { describe, it, expect } from 'vitest';
import isPreloadReducer, { setIsPreload } from './isPreloadSlice';

/**
 * test scenario for isPreloadSlice
 *
 * - isPreloadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the payload when given by setIsPreload action
 *
 */

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the payload when given by setIsPreload action', () => {
    const initialState = true;
    const action = {
      type: setIsPreload.type,
      payload: false,
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });
});
