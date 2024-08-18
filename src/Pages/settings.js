import React from "react";
import Header from "../Components/Header/header";
import SideBar from "../Components/SideBar/sidebar";
import "./pages.css"
import About from "../Components/About/about";
const SettingsPage = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-container">
                <SideBar isProjectsPage={isProjectsPage} isSettingsPage={isSettingsPage}/>
                <About/>
            </div>
            
        </div>
    )
}
export default SettingsPage;