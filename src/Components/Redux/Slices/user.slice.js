import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : {},
        isLoggedIn : false,
        action : ""
    },
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload
        },
        setIsLoggedIn : (state, action) => {
            state.isLoggedIn = action.payload
        },
        setAction : (state, action) => {
            state.action = action.payload
        }
    }
});
export const {setUser, setIsLoggedIn, setAction} = userSlice.actions;
export default userSlice.reducer;