import React from "react";
import "./heroSection.css";
import { useSelector } from "react-redux";

const HeroSection = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    return(
        <div className="hero-section-container">
            <div className="hero-section">
                <div className="logo">
                    <img src="header-logo.png" alt="company-logo" className="logo-img"/>
                    <div className={`logo-title ${!isLoggedIn ? "loggedIn" : ""}`}><span className={`sub-title`}>Ques</span>.AI</div>
                </div>
                <div className="hero-text1">
                Your podcast will no longer be just a hobby.
                </div>
                <div className="hero-text2">
                Supercharge Your Distribution using our AI assistant!
                </div>
            </div>
        </div>
    )
}
export default HeroSection;