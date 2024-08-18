import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name :"account",
    initialState : {
        account : [],
        project : {},
        file : {}
    },
    reducers:{
        setProjects : (state, action) => {
            state.account = action.payload
        },
        addProject : (state, action) => {
            state.account.push(action.payload);
        },
        setProject : (state, action) => {
            state.project = action.payload
        },
        setFile : (state, action) => {
            state.file = action.payload
        }
    }
})

export const {setProjects, setProject, addProject, setFile} = projectsSlice.actions
export default projectsSlice.reducer