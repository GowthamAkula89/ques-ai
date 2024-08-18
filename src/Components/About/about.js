import React, { useState } from "react";
import "./about.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser } from "../Redux/Slices/user.slice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ProfileImg from "../../Utils/profile.png"

const About = () => {
    const user = useSelector(state => state.user.user);
    const [username, setUsername] = useState(user.user.name);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const saveChanges = async() => {
        const updatedUserDetails = {
            "name":username,
            "email":user.user.email
        } 
        const api = process.env.REACT_APP_QUES_AI_API;
        try{
            const response = await fetch(`${api}/user`,{
                method:'PATCH',
                headers : {
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(updatedUserDetails)
            })
            if(!response.ok){
                console.log("Failed to update");
            }
            const data = await response.json();
            dispatch(setUser(data));
            enqueueSnackbar("Username updated successfully", {variant:"success"})
        }catch(err){
            console.log("Update username is failed", err);
            enqueueSnackbar("Username update failed", {variant:"error"})
        }
    };

    const handleLogout = () => {
        dispatch(setIsLoggedIn(false));
        enqueueSnackbar("Logged out successfully", {varient:"success"});
        navigate("/login");
        localStorage.clear();
        window.location.reload();
        setIsLoggedIn(false);
    };

    return (
        <div className="about-container">
            <div className="card-heading">Account Settings</div>
            {isLoggedIn ? (
                <>
                <img src={ProfileImg} alt="profile_img" className="profile-img"/>
                <div className="accout-details">
                    
                    <div className="form-group">
                        <label htmlFor="username" className="field-name">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="input-field-data"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"  className="field-name">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input-field-data"
                            value={user.user.email}
                            disabled
                        />
                    </div>
                    
                </div>
                <div className="btns-container">
                <button onClick={saveChanges} className="save-btn">Save Changes</button>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                </>
            ) : (
                <div className="login-form">
                    <div style={{textAlign:"center"}}>Login to view accout details</div>
                </div>
            )}
        </div>
    );
};

export default About;
