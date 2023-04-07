import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPhoneNumber } from "../../store";

type historyState = {
	phoneNumbers: IPhoneNumber[];
	filteredPhoneNumbers: IPhoneNumber[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
};

export const fetchPhoneNumbers = createAsyncThunk(
	"phoneNumbers/fetch",
	async () => await (await axios.get("/api/phone-numbers")).data
);

const historySlice = createSlice({
	name: "history",
	initialState: {
		phoneNumbers: [],
		filteredPhoneNumbers: [],
		status: "idle",
		error: null,
	} as historyState,
	reducers: {
		setFilteredPhoneNumbers: (state, action) => {
			state.filteredPhoneNumbers = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPhoneNumbers.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchPhoneNumbers.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.phoneNumbers = action.payload;
				state.filteredPhoneNumbers = action.payload;
			})
			.addCase(fetchPhoneNumbers.rejected, (state, action) => {
				state.status = "failed";
			});
	},
});

export default historySlice.reducer;
export const { setFilteredPhoneNumbers } = historySlice.actions;
