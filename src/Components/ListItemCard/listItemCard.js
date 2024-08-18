import React, { useState } from "react";
import "./listItemCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useSnackbar } from "notistack";
import { setProject,setFile } from "../Redux/Slices/projects.slice";

export function ListItemCard({ item, projectId, isRequired, index }) {

    const [isLoading, setIsLoading] = useState(false);
    const {enqueueSnakbar} = useSnackbar()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleDeleteFile = async (fileId) => {
        const api = process.env.REACT_APP_QUES_AI_API;
        setIsLoading(true);
        const url = `${api}/project/${projectId}/files/${fileId}`;
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                enqueueSnakbar("Login Expired, Login Again", {varient:"error"})
                setIsLoading(false);
                return;
            }
            const response = await fetch(url, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
            });
            const data = await response.json();
            dispatch(setProject(data));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} | ${hours}:${minutes}`;
    };

    const handleEditDescription = (file) => {
        console.log("Edit button", file)
        dispatch(setFile(file));
        navigate(`/${projectId}/files/${file._id}/edit`)
    }
    return (
        <>
            <div className="item-card">
                <div className={`content-slno name-container cell-size`}>{index+1}</div>
                <div className={`item-content2 name-container cell-size`}>{item.fileName}</div>
                <div className="item-content2 cell-size">{formatDate(item.updatedAt)}</div>
                <div className={`item-content cell-size`}><span className="status">Done</span></div>
                <div className="item-content cell-size">
                    <div className="edit-btn" onClick={() => handleEditDescription(item)}>View</div>
                    <div className="delete-btn" onClick={() => handleDeleteFile(item._id)}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </div>
                </div>
            </div>
            {isRequired && <hr style={{ maxWidth: "1120px" }}></hr>}
        </>
    );
}
