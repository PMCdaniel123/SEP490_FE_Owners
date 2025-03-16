import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Owner {
  id: string | null;
  email: string | null;
  phone: string | null;
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
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
