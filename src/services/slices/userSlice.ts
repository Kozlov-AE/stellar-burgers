import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUser } from '../../utils/types';
import {
  TRegisterData,
  TLoginData,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  getUserApi
} from '@api';

import { setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TLoginData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name }: Partial<TRegisterData>) =>
    await updateUserApi({ email, name })
);

type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setAuthCheck: (state) => {
    //   state.isAuthChecked = true;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка авторизации';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = null;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.data = action.payload.user;
      })

      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthenticated = false;
        state.data = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.data = null;
        state.loginUserError =
          action.error.message || 'Ошибка регистрации пользователя';
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserError = null;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка авторизации';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserError = null;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка авторизации';
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserError = null;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    getUser: (state) => state.data,
    getError: (state) => state.loginUserError,
    isLoginRequesting: (state) => state.loginUserRequest,
    isAuthChecked: (state) => state.isAuthChecked,
    isAuthenticated: (state) => state.isAuthenticated
  }
});

export const userSelectors = userSlice.selectors;

export default userSlice;
