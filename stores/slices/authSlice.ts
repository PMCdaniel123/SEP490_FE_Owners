import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  roleId: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  customer: Customer | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  customer: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Customer>) {
      state.isAuthenticated = true;
      state.customer = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.customer = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
