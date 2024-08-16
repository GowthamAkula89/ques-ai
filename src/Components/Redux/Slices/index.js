import projectsSlice from "./projects.slice"
import userReducer from "./user.slice"
const rootReducer = {
    user : userReducer,
    projects : projectsSlice
}
export default rootReducer