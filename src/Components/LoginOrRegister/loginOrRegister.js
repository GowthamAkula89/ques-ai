import React, { useState } from "react";
import "./loginOrRegister.css";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setIsLoggedIn } from "../Redux/Slices/user.slice";
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

    const handleSubmit = async () => {
        setLoading(true); 
        if (action === "Register") {
            if (username === "" || email === "" || password === "" || confirmPassword === "") {
                enqueueSnackbar("Please fill all required fields", { variant: "warning" });
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                enqueueSnackbar("Password mismatch", { variant: "warning" });
                setLoading(false);
                return;
            }
            const user = {
                name: username,
                email: email,
                password: password
            };
            try {
                const res = await fetch(`${api}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                if (!res.ok) {
                    enqueueSnackbar("Failed to register", { variant: "error" });
                    setLoading(false);
                    throw new Error("Failed to register");
                }
                const data = await res.json();
                console.log(data)
                enqueueSnackbar("Successfully Registered", { variant: "success" });
                navigate("/login");
            } catch (err) {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            } finally {
                setLoading(false); 
            }
        }

        if (action === "Login") {
            console.log("Login btn")
            if (email === "" || password === "") {
                enqueueSnackbar("Please enter Email and Password", { variant: "error" });
                setLoading(false);
                return;
            }
            const user = {
                email: email,
                password: password
            };
            try {
                const res = await fetch(`${api}/user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                if (!res.ok) {
                    enqueueSnackbar("Failed to login", { variant: "error" });
                    setLoading(false);
                    throw new Error("Failed to login");
                }
                const data = await res.json();
                enqueueSnackbar("Successfully Logged In", { variant: "success" });
                dispatch(setUser(data));
                dispatch(setIsLoggedIn(true));
                navigate('/homepage');
            } catch (err) {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            } finally {
                setLoading(false); 
            }
        }
    };

    return (
        <div className="login-register">
            <div className="container-header">
                <img src="Logo.png" alt="logo-img" className="container-img" />
                <div className="welcome-text">Welcome to <span className="company-name">Ques.AI</span></div>
            </div>
            {action === "Register" && 
            <input type="text" placeholder="Enter User Name" className="input-field" onChange={(e) => setUsername(e.target.value)}/>}
            <input type="email" placeholder="Enter Email" className="input-field" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password" className="input-field" onChange={(e) => setPassword(e.target.value)}/>
            {action === "Register" && 
            <input type="password" placeholder="Confirm Password" className="input-field" onChange={(e) => setConfirmPassword(e.target.value)}/>}
            <button className="submit-btn" onClick={() => handleSubmit()} disabled={loading}>
                {loading ? <div className="spinner"></div> : action === "Register" ? "Register" : "Login"}
            </button>
        </div>
    );
};

export default LoginOrRegister;
