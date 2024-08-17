import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name :"projects",
    initialState : {
        projects : [],
        project : {}
    },
    reducers:{
        setProjects : (state, action) => {
            state.projects = action.payload
        },
        addProject : (state, action) => {
            state.projects.push(action.payload);
        },
        setProject : (state, action) => {
            state.project = action.payload
        }
    }
})

export const {setProjects, setProject, addProject} = projectsSlice.actions
export default projectsSlice.reducer