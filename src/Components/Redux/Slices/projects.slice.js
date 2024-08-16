import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name :"projects",
    initialState : {
        projects : [],
        project : {}
    },
    reducers:{
        addProject : (state, action) => {
            state.projects = action.payload
        },
        setProject : (state, action) => {
            state.project = action.payload
        }
    }
})

export const {setProjects, setProject} = projectsSlice.actions
export default projectsSlice.reducer