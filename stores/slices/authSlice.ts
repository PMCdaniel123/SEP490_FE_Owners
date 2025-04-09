import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface Owner {
  id: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  owner: Owner | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  owner: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Owner>) {
      state.isAuthenticated = true;
      state.owner = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.owner = null;
      Cookies.remove("owner_token");
    },
    updateAvatar(state, action) {
      if (state.owner) {
        state.owner.avatar = action.payload;
      }
    },
  },
});

export const { login, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
