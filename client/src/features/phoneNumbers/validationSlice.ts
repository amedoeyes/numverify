import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPhoneNumber } from "../../store";

type validationState = {
	phoneNumber: IPhoneNumber | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
};

export const validatePhoneNumber = createAsyncThunk(
	"phoneNumbers/validate",
	async (number: string) => {
		const response = await axios.post("/api/phone-numbers/validate", {
			number,
		});

		return response.data;
	}
);

const validationSlice = createSlice({
	name: "validation",
	initialState: {
		phoneNumber: null,
		status: "idle",
		error: null,
	} as validationState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(validatePhoneNumber.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(validatePhoneNumber.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.phoneNumber = action.payload;
			})
			.addCase(validatePhoneNumber.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "An error occurred";
			});
	},
});

export default validationSlice.reducer;
