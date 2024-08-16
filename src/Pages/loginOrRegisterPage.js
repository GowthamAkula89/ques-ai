import React from "react";
import Header from "../Components/Header/header";
import LoginOrRegister from "../Components/LoginOrRegister/loginOrRegister";
import "./pages.css";
import HeroSection from "../Components/HeroSection/heroSection";
const LoginOrRegisterPage = () => {
    return(
        <div>
            <Header/>
            <div className="main-container">
                <HeroSection/>
                <LoginOrRegister/>
            </div>
            
        </div>
    )
}
export default LoginOrRegisterPage;