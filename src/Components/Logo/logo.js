import React from "react";
const Logo = () => {
    return(
        <div className="logo">
            <img src={`Logo.png`} alt="company-logo" className="logo-img"/>
            <div className={`logo-title `}><span className={`sub-title`}>Ques</span>.AI</div>
        </div>
    )
}
export default Logo;