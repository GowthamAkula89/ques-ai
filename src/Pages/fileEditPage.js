import React from "react";
import Header from "../Components/Header/header";
import SideBar from "../Components/SideBar/sidebar";
import "./pages.css"
import FileEditCard from "../Components/FileEditCard/fileEditCard";
const FileEditPage = ({isProjectsPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-container">
                <SideBar isProjectsPage={isProjectsPage} isSettingsPage={isSettingsPage}/>
                <FileEditCard/>
            </div>
            
        </div>
    )
}
export default FileEditPage;