import React, { useState } from "react";
import "./loginOrRegister.css";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setIsLoggedIn, setAction } from "../Redux/Slices/user.slice";
import { useNavigate } from "react-router-dom";

const LoginOrRegister = () => {
    const action = useSelector((state) => state.user.action);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const api = process.env.REACT_APP_QUES_AI_API;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        if (action === "Register" && (username === "" || email === "" || password === "" || confirmPassword === "")) {
            enqueueSnackbar("Please fill all required fields", { variant: "warning" });
            return false;
        }
        if (action === "Register" && password !== confirmPassword) {
            enqueueSnackbar("Password mismatch", { variant: "warning" });
            return false;
        }
        if (action === "Login" && (email === "" || password === "")) {
            enqueueSnackbar("Please enter Email and Password", { variant: "warning" });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            setLoading(false);
            return;
        }

        setLoading(true);
        let user ={}
        if(action === "Register"){
            user = {name : username, email : email, password: password};
        }else{
            user = { email :email, password : password };
        }
        
        if (action === "Register") {
            user.name = username;
        }

        const url = `${api}/user/${action.toLowerCase()}`;
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });
            if (!res.ok) {
                throw new Error(`Failed to ${action.toLowerCase()}`);
            }
            const data = await res.json();
            enqueueSnackbar(`Successfully ${action}ed ${action === "Login" ? "In":""}`, { variant: "success" });

            if (action === "Login") {
                localStorage.setItem('token', data.token.token);
                dispatch(setUser(data));
                dispatch(setIsLoggedIn(true));
                navigate('/homepage');
            } else {
                dispatch(setAction("Login"))
                navigate('/login');
            }
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            enqueueSnackbar(`Something went wrong `, { variant: "error" });
        } finally {
            setLoading(false);
        }
    };
    const handleNav = (navto) => {
        dispatch(setAction(navto))
        navigate(`/${navto.toLowerCase()}`);
    }
    return (
        <div className="login-register">
            <div className="container-header">
                <img src="Logo.png" alt="logo-img" className="container-img" />
                <div className="welcome-text">Welcome to <span className="company-name">Ques.AI</span></div>
            </div>

            {action === "Register" && (
                <input
                    type="text"
                    placeholder="Enter User Name*"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            )}
            <input
                type="email"
                placeholder="Enter Email*"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter Password*"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {action === "Register" && (
                <input
                    type="password"
                    placeholder="Confirm Password*"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}

            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? <div className="spinner"></div> : action}
            </button>

            <div className="alternate-action">
                {action === "Login" ? (
                    <>
                        Don’t have an account? <span className="create-account" onClick={() => handleNav("Register")}>Create Account</span>
                    </>
                ) : (
                    <>
                        Existing User? <span className="create-account" onClick={() => handleNav("Login")}>Login</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginOrRegister;
