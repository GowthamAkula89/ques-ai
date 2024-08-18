import React from "react";
import Header from "../Components/Header/header";
import ProjectUploads from "../Components/ProjectUploads/projectUploads";
import SideBar from "../Components/SideBar/sidebar";
import "./pages.css"
const ProjectPage = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-container">
                <SideBar isProjectsPage={isProjectsPage} isSettingsPage={isSettingsPage}/>
                <ProjectUploads/>
            </div>
            
        </div>
    )
}
export default ProjectPage;