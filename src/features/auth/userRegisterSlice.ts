import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiSuccessResponse } from 'models';
import { UserRegister } from 'models/user';

export interface RegisterState {
    isSuccess: boolean;
    message: string;
}

const initialState: RegisterState = {
    isSuccess: true,
    message: "",
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    register(state, action: PayloadAction<UserRegister>) {
    },
    registerSuccess(state, action: PayloadAction<ApiSuccessResponse<boolean>>) {
        state.isSuccess = true;
        state.message = action.payload.message;
    },
    registerFailed(state, action: PayloadAction<any>) {
      state.isSuccess = false;
      state.message = action.payload.message;
    },
  },
});

// Actions
export const registerActions = registerSlice.actions;

// Selectors
export const selectIsSuccess = (state: any) => state.register.isSuccess;
export const selectMessage = (state: any) => state.register.message;

// Reducer
const registerReducer = registerSlice.reducer;
export default registerReducer;