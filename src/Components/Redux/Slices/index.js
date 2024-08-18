import projectsSlice from "./projects.slice"
import userReducer from "./user.slice"
const rootReducer = {
    user : userReducer,
    account : projectsSlice
}
export default rootReducer