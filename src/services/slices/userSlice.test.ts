import userSlice, {
  checkUserAuth,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';

const mockUser = {
  email: 'test@test.ru',
  name: 'TestName'
};
const initialState = userSlice.getInitialState();
const stateWithUser = {
  data: mockUser,
  isAuthChecked: true,
  isAuthenticated: true,
  loginUserError: null,
  loginUserRequest: false
};
const error: Error = new Error('Ошибка!');

describe('userSlice - checkUserAuth', () => {
  it('checkUserAuth.pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.loginUserRequest).toBe(true);
  });

  it('checkUserAuth.fulfilled', () => {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.data).toEqual(mockUser);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBeNull();
  });

  it('checkUserAuth.rejected', () => {
    const action = {
      type: checkUserAuth.rejected.type,
      error: error
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.data).toBeNull();
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toEqual(error.message);
  });
});

describe('userSlice - registerUser', () => {
  it('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.loginUserRequest).toBe(true);
  });

  it('registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.data).toEqual(mockUser);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBeNull();
  });

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: error
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.data).toBeNull();
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toEqual(error.message);
  });
});

describe('userSlice - loginUser', () => {
  it('loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.loginUserRequest).toBe(true);
  });

  it('loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.data).toEqual(mockUser);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBeNull();
  });

  it('loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: error
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.data).toBeNull();
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toEqual(error.message);
  });
});

describe('userSlice - updateUser', () => {
  it('updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.loginUserRequest).toBe(true);
  });

  it('updateUser.fulfilled', () => {
    const user = {
      email: 'sdsd@jd.ru',
      name: 'string'
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: user }
    };
    const newState = userSlice.reducer(stateWithUser, action);

    expect(newState.data).toEqual(user);
    expect(newState.loginUserRequest).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBeNull();
  });

  it('updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: error
    };
    const newState = userSlice.reducer(stateWithUser, action);

    expect(newState.data).toEqual(mockUser);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toEqual(error.message);
  });
});

describe('userSlice - logoutUser', () => {
  it('logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const newState = userSlice.reducer(stateWithUser, action);

    expect(newState.loginUserRequest).toBe(true);
  });

  it('logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const newState = userSlice.reducer(stateWithUser, action);

    expect(newState.data).toBeNull();
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBeNull();
  });

  it('logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: error
    };
    const newState = userSlice.reducer(stateWithUser, action);

    expect(newState.data).toEqual(mockUser);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toEqual(error.message);
  });
});
