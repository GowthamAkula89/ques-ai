import React from "react";
import "./header.css";
import { useSelector } from "react-redux";

const Header = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    return(
        <div className={`header ${isLoggedIn ? "active" : ""}`}>
            <div className="logo">
                <img src={isLoggedIn ? "header-logo.png": "Logo.png"} alt="company-logo" className="logo-img"/>
                <div className={`logo-title ${isLoggedIn ? "loggedIn" : ""}`}><span className={`sub-title`}>Ques</span>.AI</div>
            </div>
            {!isLoggedIn && 
                <div className="actions">
                    <div className="login-btn">Login</div>
                    <div className="btn">Register</div>
                </div>
            }
            {isLoggedIn && 
                <div className="actions">
                    <div className="user-name">Gowthamk</div>
                    <div className="btn">LOG OUT</div>
                </div>
            }
        </div>
    )
}
export default Header;