import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("airspace__user")) || null

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser(state, action) {
            state = action.payload
            localStorage.setItem("airspace__user", JSON.stringify(state))
        }
    }
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer
