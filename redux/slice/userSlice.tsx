import { createSlice } from "@reduxjs/toolkit";

// khởi tạo interface cho user
export interface userState {
    user: object | null
}

const initialState: userState = {
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }, // tạo action creator với mỗi case là key tương ứng của reducer

        removeUser: (state, action) => {
            state.user = null
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;