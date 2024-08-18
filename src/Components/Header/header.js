import React from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../Redux/Slices/user.slice";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (action) => {
        dispatch(setAction(action))
        navigate(`/${action.toLowerCase()}`)
    }
    return(
        <div className={`header ${isLoggedIn ? "active" : ""}`}>
            <div className="logo">
                <img src={isLoggedIn ? "header-logo.png": "Logo.png"} alt="company-logo" className="logo-img"/>
                <div className={`logo-title ${isLoggedIn ? "loggedIn" : ""}`}><span className={`sub-title`}>Ques</span>.AI</div>
            </div>
            {!isLoggedIn && 
                <div className="actions">
                    <div className="login-btn" onClick={() => handleClick("Login") }>Login</div>
                    <div className="btn" onClick={() => handleClick("Register") }>Register</div>
                </div>
            }
            {isLoggedIn && 
                <div className="actions">
                    <div className="user-name">{user.user.name}</div>
                    <div className="btn" onClick={()=>{
                        localStorage.clear();
                        navigate("/")
                        window.location.reload();
                        }}
                    >LOG OUT</div>
                </div>
            }
        </div>
    )
}
export default Header;