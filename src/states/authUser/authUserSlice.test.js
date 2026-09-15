import { describe, it, expect } from "vitest";
import authUserReducer, { setAuthUser, clearAuthUser } from "./authUserSlice";

/**
 * test scenario for authUserSlice
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the authUser when given by setAuthUser action
 *  - should return null when given by clearAuthUser action
 *
 */

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
    // expect(nextState).toEqual('wrong value');
  });

  it("should return the authUser when given by setAuthUser action", () => {
    const initialState = null;
    const action = {
      type: setAuthUser.type,
      payload: {
        id: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image.url.jpg",
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });

  it("should return null when given by clearAuthUser action", () => {
    const initialState = {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image.url.jpg",
    };
    const action = { type: clearAuthUser.type };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
