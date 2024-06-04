import { createSlice } from "@reduxjs/toolkit";
import { IPersonnel } from "../../interface/general";

interface InitialState {
    user: IPersonnel | null;
}

const initialState: InitialState = {
    user: null
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

// Exports all actions
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
