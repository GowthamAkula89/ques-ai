import React, { useState } from "react";
import "./fileEditCard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { setProject } from "../Redux/Slices/projects.slice";
import { useSnackbar } from "notistack";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoHome } from "react-icons/go";

const FileEditCard = () => {
    const project = useSelector(state => state.projects.project);
    const file = useSelector(state => state.projects.file);
    const [updatedDescription, setUpdatedDescription] = useState(file.fileDescription);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const handleEdit = (e) => {
        setIsEditing(true)
        setUpdatedDescription(e.target.value);
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    const handleDiscard = () => {
        setUpdatedDescription(file.fileDescription);
        setIsEditing(false);
    }

    // Directly accept fileId as a parameter
    const handleSaveAndExit = async (fileId) => {
        const updatedFile = {
            fileDescription: updatedDescription
        };
        const api = process.env.REACT_APP_QUES_AI_API;
        const url = `${api}/project/${project._id}/files/${fileId}`;
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                enqueueSnackbar("Login Expired, Login Again", { variant: "error" });
                return;
            }
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedFile)
            });

            const responseData = await response.json();
            console.log('Response from backend:', responseData);
            dispatch(setProject(responseData));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsEditing(false);
        }
    }

    console.log("Selected file", file._id);
    
    return (
        <div className="edit-card-container">
            <div className="navgation">
                <GoHome className="home-img"/>
                <div className="nav-text"> / HomePage / {project.projectName} / <span style={{color:"#7E22CE", fontWeight:"600"}}>{file.fileName}</span></div>
            </div>
            <div className="edit-card-header">
                <div className="edit-card-nav-title">
                    <IoMdArrowRoundBack className="nav-back" onClick={() => navigate("/project")}/>
                    <div className="heading-text">Edit Description</div>
                </div>
                {!isEditing &&(
                     <div className={`edit-icon`} onClick={toggleEditMode}>
                        Edit Mode
                    </div>
                )}
                {isEditing && (
                    <div className="card-btns">
                        <Link to="/project" className="project-container">
                            <div className="discard-btn" onClick={handleDiscard}>Discard</div>
                        </Link>
                        <Link to="/project" className="project-container">
                            {/* Pass file._id directly to handleSaveAndExit */}
                            <div className="btn" onClick={() => handleSaveAndExit(file._id)}>Save & Exit</div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="edit-card-details">
                <textarea
                    className="edit-input"
                    value={updatedDescription}
                    onChange={handleEdit}
                    disabled={!isEditing}
                />
            </div>
        </div>
    );
}

export default FileEditCard;
