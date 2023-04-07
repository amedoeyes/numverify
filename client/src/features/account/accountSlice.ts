import { createSlice } from "@reduxjs/toolkit";

type accountSlice = {
	isLoggedIn: boolean;
};

const accountSlice = createSlice({
	name: "account",
	initialState: {
		isLoggedIn: window.localStorage.getItem("isLoggedIn") || false,
	} as accountSlice,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
			window.localStorage.setItem("isLoggedIn", "true");
		},
		logout: (state) => {
			state.isLoggedIn = false;
			window.localStorage.removeItem("isLoggedIn");
		},
	},
});

export default accountSlice.reducer;
export const { login, logout } = accountSlice.actions;
