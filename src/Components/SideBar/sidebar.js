import React from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import SettingIcon from "../../Utils/settingIcon.png";
import { GoCopy } from "react-icons/go";
import { RiVipDiamondLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
const SideBar = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div className="side-bar-container">
            <div className="side-bar">
            <div className="menu-list">
                <Link to="/project" className="project-container">
                    <div className={`menu-item ${isProjectsPage?"projects":""}`}>
                        <div><FiPlus className="icon"/></div>
                        <div className="menu-item-name">Add your Podcast(s)</div>
                    </div>
                </Link>
                <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                    <div><MdOutlineModeEdit className="icon"/></div>
                    <div  className="menu-item-name">Create & Repurpose</div>
                </div>
                <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                    <div><GoCopy className="icon"/></div>
                    <div  className="menu-item-name">Podcast Widget</div>
                </div>
                <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                    <div><RiVipDiamondLine className="icon"/></div>
                    <div  className="menu-item-name">Upgrade</div>
                </div>
            </div>
            <Link to="/settings" className="project-container">
                <div className={`menu-item ${isSettingsPage?"settings":""}`}>
                    <IoSettingsOutline className="icon"/>
                    <div className="menu-item-name">Help</div>
                </div>
            </Link>
        </div>
        </div>
    )
}
export default SideBar;