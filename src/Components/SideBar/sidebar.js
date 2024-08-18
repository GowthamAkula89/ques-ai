import React from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";
import EditIcon from "../../Utils/edit.png"
import SettingIcon from "../../Utils/settingIcon.png";
import CopyIcon from "../../Utils/copy.png"
import Upgrad from "../../Utils/diamond.png"
const SideBar = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div className="side-bar-container">
            <div className="side-bar">
            <div className="menu-list">
                <Link to="/project" className="project-container">
                    <div className={`menu-item ${isProjectsPage?"projects":""}`}>
                        <div className="icon">+</div>
                        <div className="menu-item-name">Add your Podcast(s)</div>
                    </div>
                </Link>
                <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                    <div  className="icon"><img src={EditIcon} alt="edit"/></div>
                    <div  className="menu-item-name">Create & Repurpose</div>
                </div>
                <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                    <div  className="icon"><img src={CopyIcon} alt="copy"/></div>
                    <div  className="menu-item-name">Podcast Widget</div>
                </div>
                <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                    <div  className="icon"><img src={Upgrad} alt="upgrad"/></div>
                    <div  className="menu-item-name">Upgrade</div>
                </div>
            </div>
            <Link to="/settings" className="project-container">
                <div className={`menu-item ${isSettingsPage?"settings":""}`}>
                    <img src={SettingIcon} alt="setting-img"/>
                    <div className="menu-item-name">Help</div>
                </div>
            </Link>
        </div>
        </div>
    )
}
export default SideBar;