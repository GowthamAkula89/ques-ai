import React from "react";
import "./accountSetting.css";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {setIsLoggedIn} from "../Redux/Slices/user.slice"
import { useDispatch } from "react-redux";
const AccountSetting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setIsLoggedIn(false));
        navigate("/");
        window.location.reload()
    }
    return(
        <div className="account-setting">
            <IoSettingsOutline className="icon" onClick={() => navigate("/settings")}/>
            <MdLogout className={`icon logout-icon`} onClick={() => handleLogout()}/>
        </div>
    )
}
export default AccountSetting;